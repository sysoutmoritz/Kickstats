"use client";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import { getHistoryFetcherSWR } from "@/misc/KickbaseAPIRequester";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getRequest } from "@/misc/KickbaseAPIRequester";
import TransferHistoryElement from "./components/TransferHistoryElement";

export default function TradeHistory({
  params,
}: {
  params: { leagueId: string; managerId: string };
}) {
  const [token, setToken] = useLocalStorage("token", ""); //token for api requests
  const { theme } = useTheme(); //get the current theme
  const [listFetched, setListFetched] = useState(false); //boolean to check if the list was fetched, triggers the useEffect to refetch all the zero values with MV entries
  const [list, setList] = useState([]); //the list of transfers
  const {
    data: history,
    error,
    isLoading,
  } = useSWR(
    [
      `/v4/leagues/${params.leagueId}/managers/${params.managerId}/transfer`,
      token,
      25,
    ],
    getHistoryFetcherSWR
  );

  useEffect(() => {
    if (history) {
      //if the history is fetched from useSWR, make the list properly formatted
      let lst = getCompleteTradeHistoryList(history); //function to get only the trades and properly flatten them out into one big list
      setList(lst); //set the list
      setListFetched(true); //to trigger the useEffect below
    }
  }, [history]);

  useEffect(() => {
    const fillZeroes = async () => {
      let newList = await Promise.all(
        list.map(async (trade: any) => {
          if (trade.tty === 0) {
            //if player was drawn at start
            let values = await getRequest(
              `/leagues/${params.leagueId}/players/${trade.pi}/stats`,
              token
            ); //get the market values of the player for the past year via API request
            let drawtime: string | number = new Date(trade.dt).setHours(
              2,
              0,
              0,
              0
            ); //the day where the player was drawn
            drawtime =
              new Date(drawtime).toJSON().split(".")[0] + "Z".toString(); //format the date to make it comparable to what the Kickbase API returns
            let mv = values.marketValues.find(
              (value: any) => value.d == drawtime
            )?.m; //get the market value of the player at the drawtime
            return { ...trade, trp: mv }; //return the trade with the market value
          } else {
            return trade; //return the trade as it is if tty is not 0
          }
        })
      );
      setList(newList);
    };

    fillZeroes(); //call the async function from above
  }, [listFetched]);

  //compute all pairs of trades and the current squad

  let finalPairs: { [key: string]: [string, string] } = {}; //map to store the final pairs of trades and their corresponding squad, usage: player_id -> [buy_value, sell_value]
  let currentSquad: { [key: string]: string } = {}; //map to store the current squad, usage: player_id -> buy_value
  list.forEach((trade: any) => {
    if (trade.tty === 2) {
      //if trade is a sell, it has to be owned some time before
      finalPairs[trade.pi] = [undefined, trade.trp];
    }
    if (trade.tty === 1 || trade.tty === 0) {
      //if trade is a buy, we look if it has been sold already (so if the key already exists in the dict), if not, it has to be in the squad
      if (finalPairs[trade.pi]) {
        finalPairs[trade.pi][0] = trade.trp;
      } else {
        currentSquad[trade.pi] = trade.trp;
      }
    }
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        {/*history[0] because the first entry of the chained requests list will always exist and contains the name in unm param */}
        Trade History for {history ? history[0].unm : ""}
      </h2>
      {Object.keys(finalPairs).map((key) => {
        return (
          <div key={key}>
            <TransferHistoryElement
              leagueId={params.leagueId}
              playerId={key}
              buyValue={finalPairs[key][0]}
              sellValue={finalPairs[key][1]}
            />
          </div>
        );
      })}
    </div>
  );
}

function getCompleteTradeHistoryList(history: any) {
  let historyList = history
    .map((trade: any) => {
      //map the full response only to the "it" (items) lists
      return trade.it;
    })
    .flat(); //flatten all the lists into one big list
  return historyList;
}

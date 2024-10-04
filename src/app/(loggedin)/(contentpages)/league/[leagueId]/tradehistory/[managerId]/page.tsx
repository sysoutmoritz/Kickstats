"use client";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import { getHistoryFetcherSWR } from "@/misc/KickbaseAPIRequester";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getRequest } from "@/misc/KickbaseAPIRequester";

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
            console.log(`MV for ${trade.pn}`, mv);
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

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        {/*history[0] because the first entry of the chained requests list will always exist and contains the name in unm param */}
        Trade History for {history ? history[0].unm : ""}
      </h2>
      {list.map((trade: any) => {
        //BUG: SWR IN getCompleteTradeHistoryList seems to be off (return of hook is undefined sometimes, prob because of getHistoryFetcherSWR function)
        return (
          <div key={trade.id} className="flex gap-2">
            <p>{trade.pn}</p>
            <p>{trade.tty}</p>
            <p>{trade.trp}</p>
          </div>
        );
      })}
    </div>
  );
}

function getCompleteTradeHistoryList(history: any) {
  console.log("AT getCompleteTradeHistoryList BEGINNING", history);
  let historyList = history
    .map((trade: any) => {
      return trade.it;
    })
    .flat();
  return historyList;
}

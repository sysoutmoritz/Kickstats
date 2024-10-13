"use client";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import { getHistoryFetcherSWR } from "@/misc/KickbaseAPIRequester";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getRequest } from "@/misc/KickbaseAPIRequester";
import TransferHistoryElement from "./components/TransferHistoryElement";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";

export default function TradeHistory({
  params,
}: {
  params: { leagueId: string; managerId: string };
}) {
  const [token, setToken] = useLocalStorage("token", ""); //token for api requests
  const { theme } = useTheme(); //get the current theme
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
  const {
    data: managerData,
    error: managerError,
    isLoading: managerIsLoading,
  } = useSWR(
    [
      `/v4/leagues/${params.leagueId}/managers/${params.managerId}/dashboard`,
      token,
    ],
    getFetcherSWR
  );
  const [trades, setTrades] = useState<Map<string, [string, string]>>(
    new Map()
  );
  const [squad, setSquad] = useState<Map<string, string>>(new Map());

  let historyList: Promise<string>[] | string[] = [];

  useEffect(() => {
    console.log("HISTORY", history);
    if (!history) {
      return;
    }
    const fillZeroes = async () => {
      historyList = await Promise.all(
        history.map(async (trade: any) => {
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

      //compute all pairs of trades and the current squad

      let tempPairs: Map<string, [string, string]> = new Map(); //map to temporarily store the pairs of trades and their corresponding squad, usage: player_id -> [buy_value, sell_value]
      let finalPairs: Map<string, [string, string]> = new Map(); //map to store the final pairs of trades and their corresponding squad, usage: player_id -> [buy_value, sell_value]
      let currentSquad: Map<string, string> = new Map(); //map to store the current squad, usage: player_id -> buy_value
      historyList.forEach((trade: any) => {
        if (trade.tty === 2) {
          //if trade is a sell, it has to be owned some time before
          tempPairs.set(trade.pi, [undefined, trade.trp]);
        }
        if (trade.tty === 1 || trade.tty === 0) {
          //if trade is a buy, we look if it has been sold already (so if the key already exists in the dict), if not, it has to be in the squad
          if (tempPairs.get(trade.pi) != undefined) {
            finalPairs.set(trade.pi, [trade.trp, tempPairs.get(trade.pi)[1]]);
            tempPairs.delete(trade.pi);
          } else {
            currentSquad.set(trade.pi, trade.trp);
          }
        }
      });

      setTrades(finalPairs);
      setSquad(currentSquad);
    };

    fillZeroes(); //call the async function from above
  }, [history]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        {/*history[0] because the first entry of the chained requests list will always exist and contains the name in unm param */}
        Trade History for {managerData ? managerData.unm : ""}
      </h2>
      <div className="flex flex-col gap-0.5 max-w-100%">
        {Array.from(trades.keys()).map((key) => {
          return (
            <TransferHistoryElement
              leagueId={params.leagueId}
              key={key}
              playerId={key}
              buyValue={trades.get(key)[0]}
              sellValue={trades.get(key)[1]}
            />
          );
        })}
      </div>
    </div>
  );
}

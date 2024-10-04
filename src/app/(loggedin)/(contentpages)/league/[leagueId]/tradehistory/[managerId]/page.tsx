"use client";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import { getHistoryFetcherSWR } from "@/misc/KickbaseAPIRequester";
import { useTheme } from "next-themes";
import { use, useEffect } from "react";

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

  if (isLoading) {
    return <div>Loading...TradeHistory</div>;
  }
  if (error) {
    return <div>There was an error receiving your data</div>;
  }
  let historyList = getCompleteTradeHistoryList(history);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">Trade History for {params.managerId}</h2>
      {historyList.map((trade: any) => {
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

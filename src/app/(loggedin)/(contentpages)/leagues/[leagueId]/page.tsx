"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { getRequest } from "../../../../../misc/KickbaseAPIRequester";
import LiveTable from "./components/LiveTable";
import { useRouter } from "next/navigation";

export default function League({ params }: { params: { leagueId: string } }) {
  const [token, setToken] = useLocalStorage("token", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getRequest("/leagues", token).then((data) => {
      setLeagueData(
        data.leagues.find((obj: any) => obj.id === params.leagueId)
      );
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...League(s)</div>;
  }
  if (!leagueData) {
    return <div>Data is missing</div>;
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl">{leagueData.name}</h1>
      <LiveTable leagueId={params.leagueId} />
      <button className="border border-gray-800 rounded-md" onClick={() => {router.push(`/leagues/${params.leagueId}/topstats`)}}>League Topstats</button>
    </div>
  );
}

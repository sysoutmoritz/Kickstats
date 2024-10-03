"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { getRequest } from "../../../../../../misc/KickbaseAPIRequester";
import LiveTable from "./components/LiveTable";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LivePoints({
  params,
}: {
  params: { leagueId: string };
}) {
  const [token, setToken] = useLocalStorage("token", "");
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [managerId, setManagerId] = useState(searchParams.get("manager")); //Id of Manager to show live points for
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
      <LiveTable
        leagueId={params.leagueId}
        managerId={managerId}
        setManagerId={setManagerId}
      />
      <button
        className="border border-gray-800 rounded-md p-2 bg-gray-200 dark:bg-gray-700 dark:border-gray-50"
        onClick={() => {
          router.push(`/league/${params.leagueId}/tradehistory/${managerId}`);
        }}
      >
        Trade History
      </button>
      <button
        className="border border-gray-800 rounded-md p-2 bg-gray-200 dark:bg-gray-700 dark:border-gray-50"
        onClick={() => {
          router.push(`/league/${params.leagueId}/topstats`);
        }}
      >
        League Top Stats
      </button>
    </div>
  );
}

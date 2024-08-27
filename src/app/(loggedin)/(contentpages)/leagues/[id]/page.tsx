"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { getRequest } from "../../../../../misc/KickbaseAPIRequester";

export default function League({ params }: { params: { id: string } }) {
  const [token, setToken] = useLocalStorage("token", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [leagueData, setLeagueData] = useState("");
  useEffect(() => {
    getRequest("/leagues", token).then((data) => {
      setLeagueData(
        JSON.stringify(data.leagues.find((obj: any) => obj.id === params.id))
      );
    });
  }, []);
  return (
    <div>
      <h1>League {params.id}</h1>
      <h1>Ret: {JSON.parse(leagueData).name}</h1>
    </div>
  );
}

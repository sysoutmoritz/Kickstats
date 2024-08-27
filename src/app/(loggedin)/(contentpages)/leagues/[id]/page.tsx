"use client";

import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { getRequest } from "../../../../../misc/KickbaseAPIRequester";

export default function League({ params }: { params: { id: string } }) {
  const [token, setToken] = useLocalStorage("token", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  let league: any;
  useEffect(() => {
    console.log(token);
    league = getRequest("/leagues/", token);
    console.log(league);
    //.leagues.find(obj: => obj.id === params.id);
  }, []);
  return (
    <div>
      <h1>League {params.id}</h1>
    </div>
  );
}

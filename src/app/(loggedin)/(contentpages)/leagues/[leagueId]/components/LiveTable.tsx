"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

import { getRequest } from "../../../../../../misc/KickbaseAPIRequester";
import ManagerDropdownMenu from "./ManagerDropdownMenu";

export default function LiveTable({ leagueId }: { leagueId: string }) {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [livePlayerId, setLivePlayerId] = useState(userId);

  const [isTableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    console.log(
      "LeagueId In LiveTable Component: ",
      leagueId,
      "with type",
      typeof leagueId
    );
  }, []);

  return (
    <>
      <ManagerDropdownMenu
        setLivePlayerId={setLivePlayerId}
        livePlayerId={livePlayerId}
        leagueId={leagueId}
      />
    </>
  );
}

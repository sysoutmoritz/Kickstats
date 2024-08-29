"use client";

import { useState, useEffect, Suspense } from "react";
import useLocalStorage from "use-local-storage";

import { getFetcherSWR } from "../../../../../../../misc/KickbaseAPIRequester";
import ManagerDropdownMenu from "./ManagerDropdownMenu";
import useSWR from "swr";
import PlayerTableElement from "./PlayerTableElement";

export default function LiveTable({
  leagueId,
  clickedPlayer,
}: {
  leagueId: string;
  clickedPlayer: string;
}) {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [livePlayer, setLivePlayer] = useState(clickedPlayer); //Id of LivePlayer
  const {
    data: livePlayers,
    error,
    isLoading,
  } = useSWR([`/leagues/${leagueId}/live`, token], getFetcherSWR);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (isLoading) {
    return <div>Loading...LiveTable Component</div>;
  }
  return (
    <>
      <ManagerDropdownMenu
        setLivePlayerId={setLivePlayer}
        livePlayerId={livePlayer}
        leagueId={leagueId}
      />
      <h2 className="text-2xl">
        Live Points for{" "}
        {livePlayers.u.find((obj: any) => obj.id === livePlayer).n}
      </h2>
      {/*get name of live player by the id and the liveData*/}
      <div className="flex flex-col gap-0.5 max-w-100%">
        {livePlayers.u // get "u" list, find the object with the id of the current user
          .find((obj: any) => obj.id === livePlayer)
          .pl.sort((a: any, b: any) => {
            //get the "pl" list from the found manager with all his players, sort it by the points
            if (Number(a.t) > Number(b.t)) return -1;
          })
          .map((player: object) => {
            //map each player to a PlayerTableElement
            if (player)
              return (
                <PlayerTableElement liveData={player} leagueId={leagueId} />
              );
          })}
        <div className="flex justify-end items-center text-xl py-1">
          <p className="px-18 mr-auto">Gesamt:</p>
          <p className="pr-[1.875rem] text-center">
            {/*get the total points of the live player*/}
            {livePlayers.u.find((obj: any) => obj.id === livePlayer).t}
          </p>
        </div>
      </div>
    </>
  );
}

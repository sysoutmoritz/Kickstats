"use client";

import useSWR from "swr";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";
import useLocalStorage from "use-local-storage";
import Image from "next/image";
import { useFormatter } from "next-intl";
import { useTheme } from "next-themes";

export default function PlayerCard({
  leagueId,
  playerId,
}: {
  leagueId: string;
  playerId: string;
}) {
  const [token, setToken] = useLocalStorage("token", "");
  const { theme } = useTheme();
  const {
    data: stats,
    error: statsError,
    isLoading: statsIsLoading,
  } = useSWR(
    [`/leagues/${leagueId}/players/${playerId}/stats`, token],
    getFetcherSWR
  );
  const {
    data: player,
    error: playerError,
    isLoading: playerIsLoading,
  } = useSWR(
    [`/leagues/${leagueId}/players/${playerId}`, token],
    getFetcherSWR
  );

  const {
    data: leagueStats,
    error: leagueStatsError,
    isLoading: leagueStatsIsLoading,
  } = useSWR([`/leagues/${leagueId}/stats`, token], getFetcherSWR);

  if (statsError || playerError || leagueStatsError) {
    return <div>Error Getting the data</div>;
  }
  if (statsIsLoading || playerIsLoading || leagueStatsIsLoading) {
    return <div>Loading...Player and PlayerStats</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {/* div for player name */}
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-md">{stats.firstName}</p>
        <p className="text-2xl">
          {stats.lastName}
          {player.knownName != undefined ? " (" + player.knownName + ")" : ""}
        </p>
      </div>
      {/* div for player position, picture, club */}
      <div className="flex justify-evenly items-center">
        {/* div for player position */}
        <div className="flex flex-col items-center gap-4 w-18 h-24">
          <p className="text-xl">Position</p>
          <p>{positionCalculator(stats.position)}</p>
        </div>
        {/* player picture */}
        <Image src={player.profileBig} alt="" width={204} height={204} />
        {/* div for player club */}
        <div className="flex flex-col items-center gap-1 w-18 h-24">
          <p className="text-xl">Club</p>
          <Image
            src={`/team_logos/${stats.teamId}.svg`}
            width={72}
            height={72}
            alt=""
          />
        </div>
      </div>
      {/* div for match stats */}
      <div className="flex justify-center items-start gap-6">
        {/* div for points */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl">Points</p>
          <p>{stats.points}</p>
          {/* average points */}
          <p className="text-xs">&empty; P: {stats.averagePoints}</p>
        </div>
        {/* div for matches */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl">Matches</p>
          <p>
            {
              stats.seasons.find(
                (obj: any) => obj.season === process.env.SEASON
              ).matches
            }
            /{leagueStats.currentDay}
          </p>
          {/* average minutes played */}
          <p className="text-xs">
            &empty; min:{" "}
            {Math.floor(
              stats.seasons.find(
                (obj: any) => obj.season === process.env.SEASON
              ).secondsPlayed /
                60 /
                leagueStats.currentDay
            )}
          </p>
        </div>
        {/* div for starting matches */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl">Starting</p>
          <p>
            {
              stats.seasons.find(
                (obj: any) => obj.season === process.env.SEASON
              ).startMatches
            }
            /{leagueStats.currentDay}
          </p>
        </div>
      </div>
      {/* div for market stats */}
      <div className="flex justify-center items-center gap-6">
        <p className="text-xl">Market Value:</p>
        {/* div for market value, trend and change since yesterday */}
        <div className="flex flex-col justify-center items-center gap-1">
          {/* div for market value + trend */}
          <div className="flex justify-center items-center gap-0.5">
            {/* market value */}
            <p>{new Intl.NumberFormat("de-DE").format(stats.marketValue)}€</p>
            {/* market value trend */}
            <Image
              className={
                stats.mvTrend == 1
                  ? "-rotate-45"
                  : stats.mvTrend == 2
                  ? "rotate-45"
                  : ""
              }
              src={
                theme == "dark"
                  ? "/arrow_right_white.svg"
                  : "/arrow_right_dark.svg"
              }
              width={24}
              height={24}
              alt=""
            />
          </div>
          <p className="text-sm">
            {/* market value change since yesterday */}
            <span
              className={
                stats.marketValue -
                  stats.marketValues[stats.marketValues.length - 2].m <
                0
                  ? "text-red-600 text-base"
                  : "text-green-600 text-base"
              }
            >
              {new Intl.NumberFormat("de-DE").format(
                stats.marketValue -
                  stats.marketValues[stats.marketValues.length - 2].m
              )}
              €
            </span>
            {" since yesterday"}
          </p>
        </div>
      </div>
      {/* div for ownership */}
      <div className="flex justify-center items-center gap-3">
        <p className="text-xl pr-4">Owned by:</p>
        {stats.leaguePlayer != undefined ? (
          <div className="flex flex-col justify-center items-start">
            {/* div for player owner + picture */}
            <div className="flex justify-center items-center gap-2">
              <Image
                className="rounded-[50%] w-6 h-6"
                src={stats.leaguePlayer.userProfileUrl}
                width={24}
                height={24}
                alt=""
              />
              <p>{stats.leaguePlayer.userName}</p>
            </div>
            {/* buy time (only rendered if it was actually bought and not drawn at the beginning) */}
            {stats.leaguePlayer.buyDate != undefined ? (
              <div className="flex flex-col justify-center items-start">
                <div className="flex justify-center items-center gap-2">
                  <p>Bought:</p>
                  <p>{new Date(stats.leaguePlayer.buyDate).toLocaleString()}</p>
                </div>
                {/* buy price (only rendered if it was actually bought and not drawn at the beginning) */}
                <div className="flex justify-center items-center gap-2">
                  <p>For:</p>
                  <p>
                    {new Intl.NumberFormat("de-DE").format(
                      stats.leaguePlayer.buyPrice
                    )}
                    €
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm">drawn at start</p>
            )}
          </div>
        ) : (
          "Nobody"
        )}
      </div>
      <div className="flex justify-center items-center gap-3">
        <p>TODO: add next 3 games (too late rn)</p>
      </div>
    </div>
  );
}

function positionCalculator(position: number) {
  switch (position) {
    case 1:
      return "GK";
    case 2:
      return "DEF";
    case 3:
      return "MID";
    case 4:
      return "ST";
    default:
      return "UKN";
  }
}

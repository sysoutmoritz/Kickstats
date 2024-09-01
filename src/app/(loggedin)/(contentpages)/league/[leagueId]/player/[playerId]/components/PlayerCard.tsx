"use client";

import useSWR from "swr";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";
import useLocalStorage from "use-local-storage";
import Image from "next/image";
import { useFormatter } from "next-intl";
import { useTheme } from "next-themes";
import NextThreeMatches from "./NextThreeMatches";

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
      {/* div for player position, status, cards, picture, club */}
      <div className="flex justify-evenly items-center">
        {/* div for player position and status*/}
        <div className="flex flex-col items-center w-18">
          {/* position */}
          <p className="text-xl">Position</p>
          <p>{positionCalculator(stats.position)}</p>
          {/* status */}
          <p className="text-xl mt-3">Status</p>
          <p className="text-sm text-center">
            {statusCalculator(stats.status)[0]}
          </p>
          <Image
            src={statusCalculator(stats.status)[1]}
            width={15}
            height={15}
            alt=""
          />
          {/* cards */}
          <div className="flex gap-1 justify-center items-center mt-1">
            <Image src="/live_icons/yellow.svg" width={8} height={8} alt="" />
            <p className="mr-1 text-sm">
              {
                stats.seasons.find(
                  (obj: any) => obj.season === process.env.SEASON
                ).yellowCards
              }
            </p>
            <Image src="/live_icons/red.svg" width={8} height={8} alt="" />
            <p className="text-sm">
              {
                stats.seasons.find(
                  (obj: any) => obj.season === process.env.SEASON
                ).redCards
              }
            </p>
          </div>
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
        {/*div for G/A */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl">G/A</p>
          {/* div for goals */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src={
                theme == "dark"
                  ? "/live_icons/goal_white.svg"
                  : "/live_icons/goal_dark.svg"
              }
              width={12}
              height={12}
              alt=""
            />
            <p>
              {
                stats.seasons.find(
                  (obj: any) => obj.season === process.env.SEASON
                ).goals
              }
            </p>
          </div>
          {/* div for assists */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src={
                theme == "dark"
                  ? "/live_icons/assist_white.svg"
                  : "/live_icons/assist_dark.svg"
              }
              width={12}
              height={12}
              alt=""
            />
            <p>
              {
                stats.seasons.find(
                  (obj: any) => obj.season === process.env.SEASON
                ).assists
              }
            </p>
          </div>
        </div>
      </div>
      {/* div for market stats */}
      <div className="flex justify-evenly items-center mr-auto ml-5 gap-6">
        <p className="text-xl">Market Value</p>
        {/* div for market value, trend and change since yesterday */}
        <div className="flex flex-col justify-center items-start gap-1">
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
              {stats.marketValue -
                stats.marketValues[stats.marketValues.length - 2].m <
              0
                ? ""
                : "+"}
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
      <div className="flex justify-evenly items-center gap-8 mr-auto ml-5">
        <p className="text-xl pr-4">Owned by</p>
        {stats.leaguePlayer != undefined ? (
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-center items-center gap-2">
              {/* div for player owner + picture */}
              <Image
                className="rounded-[50%] w-6 h-6"
                src={
                  stats.leaguePlayer.userProfileUrl != undefined
                    ? stats.leaguePlayer.userProfileUrl
                    : "/nopicture.webp"
                }
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
          <p>Nobody</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-2">
        <p className="text-xl">Next 3 Matches</p>
        <div className="flex justify-center items-center gap-2">
          <NextThreeMatches
            homeTeamId={stats.nm[0].t1i}
            awayTeamId={stats.nm[0].t2i}
            homeTeamAbb={stats.nm[0].t1y}
            awayTeamAbb={stats.nm[0].t2y}
            date={stats.nm[0].d}
          />
          <NextThreeMatches
            homeTeamId={stats.nm[1].t1i}
            awayTeamId={stats.nm[1].t2i}
            homeTeamAbb={stats.nm[1].t1y}
            awayTeamAbb={stats.nm[1].t2y}
            date={stats.nm[1].d}
          />
          <NextThreeMatches
            homeTeamId={stats.nm[2].t1i}
            awayTeamId={stats.nm[2].t2i}
            homeTeamAbb={stats.nm[2].t1y}
            awayTeamAbb={stats.nm[2].t2y}
            date={stats.nm[2].d}
          />
        </div>
      </div>
    </div>
  );
}

//returns the position based of the number in the API
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

//returns the health status based of the number in the API
function statusCalculator(status: number) {
  switch (status) {
    case 0:
      return ["Fit", "/status_icons/fit.svg"];
    case 1:
      return ["Injured", "/status_icons/injured.svg"];
    case 2:
      return ["Weakened", "/status_icons/weakened.svg"];
    case 4:
      return ["Rehab", "/status_icons/rehab.svg"];
    case 8:
      return ["Red Card", "/status_icons/red.svg"];
    case 16:
      return ["2nd Yellow", "/status_icons/yellowred.svg"];
    case 32:
      return ["5th Yellow", "/status_icons/yellow.svg"];
    case 128:
      return ["Left League", "/status_icons/left_league.svg"];
    case 256:
      return ["Absent", "/status_icons/absent.svg"];
    default:
      return ["Unknown", "/status_icons/unknown.svg"];
  }
}

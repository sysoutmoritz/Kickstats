import useSWR from "swr";
import useLocalStorage from "use-local-storage";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function PlayerListElement({
  livePlayerData,
  leagueId,
}: {
  livePlayerData: any;
  leagueId: string;
}) {
  const { theme } = useTheme(); //get the current theme
  const [token, setToken] = useLocalStorage("token", ""); //get the token from local storage
  const router = useRouter();
  const {
    data: playerData,
    error,
    isLoading,
  } = useSWR(
    [`/leagues/${leagueId}/players/${livePlayerData.id}`, token],
    getFetcherSWR
  ); //fetch the player data (for profile picture, name, etc.)
  const {
    data: liveData,
    error: liveError,
    isLoading: liveLoading,
  } = useSWR([`/leagues/${leagueId}/live`, token], getFetcherSWR); //fetch the live data
  let matchInfo = getMatchInfo(liveData, livePlayerData.tid, livePlayerData.n); //check if the player is in the lineup

  if (error || liveError) {
    return <div>Error: {error}</div>;
  }
  if (isLoading || liveLoading) {
    return <></>;
  }

  return (
    <button
      onClick={() => {
        router.push(`/league/${leagueId}/player/${playerData.id}`);
      }}
    >
      <div className="flex justify-between items-center gap-0.5 border border-gray-300 py-0.5 rounded-md max-w-100%">
        {/* player picture */}
        <Image
          className={playerData.profileBig ? "self-end" : "mx-3"}
          src={
            playerData.profileBig ? playerData.profileBig : "/nopicture.webp"
          }
          width={playerData.profileBig ? 72 : 48}
          height={playerData.profileBig ? 72 : 48}
          alt=""
        />
        {/* player name and status */}
        <div className="flex flex-col items-start overflow-auto text-left">
          <p className="text-xs">
            {playerData.firstName ? playerData.firstName : ""}
          </p>
          <p className="text-md">
            {playerData.lastName ? playerData.lastName : ""}
            {playerData.knownName ? " (" + playerData.knownName + ")" : ""}
          </p>
          <p className="text-xs">
            s: {matchInfo != undefined ? matchInfo.s : "und"}
          </p>
        </div>
        {/* player position and club*/}
        <div className="flex justify-center items-center shrink-0 ml-auto">
          <p className="text-lg p-1">
            {playerData.position ? positionCalculator(playerData.position) : ""}
          </p>
          <Image
            src={
              playerData.teamId
                ? `/team_logos/${playerData.teamId}.svg`
                : "default.png"
            }
            width={48}
            height={48}
            alt=""
          />
        </div>
        {/* player points and match stats*/}
        <div className="flex flex-col justify-center pr-1">
          <span className="text-xs">Points</span>
          <span className="text-md">
            {livePlayerData.t ? livePlayerData.t : "0"}
          </span>
          <div className="flex justify-center flex-wrap w-16 gap-[1px]">
            {[...Array(livePlayerData.g)].map((e, i) => {
              return (
                <Image
                  key={i}
                  src={
                    theme == "dark"
                      ? "/live_icons/goal_white.svg"
                      : "/live_icons/goal_dark.svg"
                  }
                  width={12}
                  height={12}
                  alt=""
                />
              );
            })}
            {[...Array(livePlayerData.a)].map((e, i) => {
              return (
                <Image
                  key={i}
                  src={
                    theme == "dark"
                      ? "/live_icons/assist_white.svg"
                      : "/live_icons/assist_dark.svg"
                  }
                  width={12}
                  height={12}
                  alt=""
                />
              );
            })}
            {livePlayerData.y > 0 ? (
              <Image src="/live_icons/yellow.svg" width={8} height={8} alt="" />
            ) : (
              <></>
            )}
            {livePlayerData.r > 0 ? (
              <Image src="/live_icons/red.svg" width={8} height={8} alt="" />
            ) : (
              <></>
            )}
            {livePlayerData.yr > 0 ? (
              <Image
                src="/live_icons/yellowred.svg"
                width={8}
                height={8}
                alt=""
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </button>
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

function isPlayerInLineup(matchdayData: any, playerId: string) {
  for (let match of matchdayData.md) {
    if (match.m && match.m.length > 0) {
      let matchDetails = match.m[0]; // Access the first (and only) element, i dont know why this is list a list in the first place
      if (matchDetails.t1l != undefined && matchDetails.t2l != undefined) {
        if (
          matchDetails.t1l.includes(playerId) || // Check in team 1 lineup
          matchDetails.t2l.includes(playerId) // Check in team 2 lineup
        ) {
          return true; // Player found in one of the lineups
        }
      }
    }
  }
  return false; // Player not found in any match
}

function getMatchInfo(matchdayData: any, teamId: string, pn: string) {
  console.log("CALL FOR ", pn);
  for (let match of matchdayData.md) {
    let matchDetails = match.m; // Access the first (and only) element, i dont know why this is list a list in the first place
    console.log(`IN FOR, NAME ${pn}, TEAMID ${teamId}, DETAILS`, matchDetails);
    if (matchDetails.t1i === teamId || matchDetails.t2i === teamId) {
      console.log(`details for ${teamId}: ${matchDetails}`);
      return matchDetails;
    }
    return undefined;
  }
}

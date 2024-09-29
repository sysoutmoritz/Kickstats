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
          {playerData.knownName ? (
            <p className="text-md mt-3">
              {playerData.knownName ? playerData.knownName : ""}
            </p>
          ) : (
            <div>
              <p className="text-xs">
                {playerData.firstName ? playerData.firstName : ""}
              </p>
              <p className="text-md">
                {playerData.lastName ? playerData.lastName : ""}
              </p>
            </div>
          )}
          <div className="text-xs">
            {playerStatusLogic(liveData, livePlayerData.tid, livePlayerData.id)}
          </div>
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

function playerStatusLogic(
  matchdayData: any,
  teamId: string,
  playerId: string
) {
  let matchInfo = undefined;
  for (const match of matchdayData.md) {
    for (const matchDetails of match.m) {
      //let matchDetails = match.m[0]; // Access the first (and only) element, i dont know why this is list a list in the first place
      if (matchDetails.t1i === teamId || matchDetails.t2i === teamId) {
        matchInfo = matchDetails;
      }
    }
  }
  if (matchInfo.s == 2) {
    return <p className="text-yellow-100">MATCH OVER</p>;
  }
  if (
    matchInfo.t1l != undefined &&
    matchInfo.t2l != undefined &&
    !(matchInfo.t1l.includes(playerId) || matchInfo.t2l.includes(playerId))
  ) {
    //lineup present and player not in lineup
    return <p className="text-yellow-100">NOT IN SQUAD</p>;
  }
  if (matchInfo.s == 1 || matchInfo.s == 8) {
    return <p className="text-red-600 font-bold">LIVE</p>;
  }
  if (matchInfo.s == 4) {
    return <p className="text-blue-100">HALFTIME</p>;
  }
  if (matchInfo.s == 0) {
    return <p className="text-yellow-100">MATCH IN FUTURE</p>;
  }
}

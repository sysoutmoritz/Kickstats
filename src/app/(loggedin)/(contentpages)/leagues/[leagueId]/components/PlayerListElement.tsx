import useSWR from "swr";
import useLocalStorage from "use-local-storage";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function PlayerListElement({
  liveData,
  leagueId,
}: {
  liveData: any;
  leagueId: string;
}) {
  const { theme } = useTheme();
  const [token, setToken] = useLocalStorage("token", "");
  const {
    data: playerData,
    error,
    isLoading,
  } = useSWR(
    [`/leagues/${leagueId}/players/${liveData.id}`, token],
    getFetcherSWR
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (isLoading) {
    return <></>;
  }

  return (
    <button>
      <div className="flex justify-between items-center gap-0.5 border border-gray-300 py-0.5 rounded-md max-w-100%">
        <Image
          className="self-end"
          src={
            playerData.profileBig ? playerData.profileBig : "/nopicture.webp"
          }
          width={72}
          height={72}
          alt=""
        />
        <div className="flex flex-col items-start overflow-auto text-left">
          <span className="text-xs">
            {playerData.firstName ? playerData.firstName : ""}
          </span>
          <p className="text-md">
            {playerData.lastName ? playerData.lastName : ""}
            {playerData.knownName
              ? " (" + playerData.knownName + "Papaladopolus)"
              : ""}
          </p>
        </div>
        <div className="flex justify-center items-center shrink-0 ml-auto">
          <span className="text-lg p-1">
            {playerData.position ? positionCalculator(playerData.position) : ""}
          </span>
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
        <div className="flex flex-col justify-center pr-1">
          <span className="text-xs">Points</span>
          <span className="text-md">{liveData.t ? liveData.t : "0"}</span>
          <div className="flex justify-center flex-wrap w-16 gap-[1px]">
            {[...Array(liveData.g)].map((e, i) => {
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
            {[...Array(liveData.a)].map((e, i) => {
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
            {liveData.y > 0 ? (
              <Image src="/live_icons/yellow.svg" width={8} height={8} alt="" />
            ) : (
              <></>
            )}
            {liveData.r > 0 ? (
              <Image src="/live_icons/red.svg" width={8} height={8} alt="" />
            ) : (
              <></>
            )}
            {liveData.yr > 0 ? (
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

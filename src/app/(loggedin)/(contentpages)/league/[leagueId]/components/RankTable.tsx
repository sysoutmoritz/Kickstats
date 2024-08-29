import useSWR from "swr";
import useLocalStorage from "use-local-storage";
import { getFetcherSWR } from "../../../../../../misc/KickbaseAPIRequester";
import UserTableElement from "./UserTableElement";

export default function RankTable({
  leagueId,
  matchdayOrSeason,
}: {
  leagueId: string;
  matchdayOrSeason: string;
}) {
  const [token, setToken] = useLocalStorage("token", ""); //get token from local storage
  const {
    data: liveData,
    error,
    isLoading,
  } = useSWR([`/leagues/${leagueId}/live`, token], getFetcherSWR); //fetch live data from api
  if (error) {
    //if there is an error, display it
    return <div>Error fetching Live Data {error.message}</div>;
  }
  if (isLoading) {
    //display loading if data is still loading
    return <div>Loading...RankTable</div>;
  }
  return (
    <div className="flex flex-col gap-0.5 max-w-100%">
      {liveData.u
        .sort((a: any, b: any) => {
          if (
            //if we are on the matchday tab, sort by matchday points, otherwise by season points
            Number(matchdayOrSeason == "left" ? a.t : a.st) >
            Number(matchdayOrSeason == "left" ? b.t : b.st)
          )
            return -1;
        })
        .map((user: any) => {
          //map all the users to one UserTableElement each
          return (
            <UserTableElement
              key={user.id}
              matchdayOrSeason={matchdayOrSeason}
              user={user}
              leagueId={leagueId}
            />
          );
        })}
    </div>
  );
}

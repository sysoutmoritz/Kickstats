import Image from "next/image";
import { useRouter } from "next/navigation";

//Component to render one manager in the manager rank table
export default function UserTableElement({
  matchdayOrSeason,
  user,
  leagueId,
}: {
  matchdayOrSeason: string;
  user: any;
  leagueId: string;
}) {
  const router = useRouter();
  if (matchdayOrSeason == "left") {
    //if we are on the matchday tab, we return the Element wrapped in a button and also show the matchday points with user.t, if we are in a season we leave the button out and use season points with user.st
    return (
      <button
        onClick={() => {
          router.push(
            `/league/${leagueId}/livepoints?clickedPlayerId=${user.id}`
          );
        }}
      >
        <div className="flex justify-between items-center gap-4 border border-gray-300 py-0.5 rounded-md max-w-100%">
          <Image
            className="rounded-[50%] w-12 h-12"
            src={typeof user.i !== "undefined" ? user.i : "/nopicture.webp"} //if the user has no picture, use a default one
            width={48}
            height={48}
            alt=""
          />
          <p className="">{user.n}</p>
          <p className="ml-auto pr-4">{user.t}</p>
        </div>
      </button>
    );
  }
  return (
    //if we are on the season tab (or not in the matchday tab rather, regarding the logic), we return the Element without a button and use the season points with user.st like explained above
    <div className="flex justify-between items-center gap-4 border border-gray-300 py-0.5 rounded-md max-w-100%">
      <Image
        className="rounded-[50%] w-12 h-12"
        src={typeof user.i !== "undefined" ? user.i : "/nopicture.webp"}
        width={48}
        height={48}
        alt=""
      />
      <p className="">{user.n}</p>
      <p className="ml-auto pr-4">{user.st}</p>
    </div>
  );
}

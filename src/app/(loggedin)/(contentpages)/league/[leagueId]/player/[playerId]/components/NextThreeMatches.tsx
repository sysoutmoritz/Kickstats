import Image from "next/image";

export default function NextThreeMatches({
  homeTeamId,
  awayTeamId,
  homeTeamAbb,
  awayTeamAbb,
  date,
}: {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamAbb: string;
  awayTeamAbb: string;
  date: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-500 rounded-md py-1 px-2">
      <p>
        {new Date(date).toLocaleString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <p className="text-xs">
        {new Date(date).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className="flex justify-center items-center gap-0.5">
        <Image
          src={`/team_logos/${homeTeamId}.svg`}
          width={30}
          height={30}
          alt=""
        />
        <p>-</p>
        <Image
          src={`/team_logos/${awayTeamId}.svg`}
          width={30}
          height={30}
          alt=""
        />
      </div>
    </div>
  );
}

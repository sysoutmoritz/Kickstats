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
    <div className="flex flex-col justify-center items-center border border-gray-500 rounded-md p-2">
      {new Date(date).toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
      <div className="flex justify-center items-center gap-0.5">
        {homeTeamAbb}
        <Image
          src={`/team_logos/${homeTeamId}.svg`}
          width={24}
          height={24}
          alt=""
        />
        <p>-</p>
        <Image
          src={`/team_logos/${awayTeamId}.svg`}
          width={24}
          height={24}
          alt=""
        />
        {awayTeamAbb}
      </div>
    </div>
  );
}

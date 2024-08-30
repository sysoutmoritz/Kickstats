import PlayerCard from "./components/PlayerCard";

export default function Player({
  params,
}: {
  params: { leagueId: string; playerId: string };
}) {
  return <PlayerCard leagueId={params.leagueId} playerId={params.playerId} />;
}

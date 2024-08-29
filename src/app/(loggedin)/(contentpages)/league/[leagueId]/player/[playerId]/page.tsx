export default function Player({params}: {params:{leagueId: string, playerId: string}}) {
    return (
        <div>
        <h1>Subpage for league {params.leagueId} and player {params.playerId}</h1>
        </div>
    );
}
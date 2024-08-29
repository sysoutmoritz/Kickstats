"use client";

import RankTable from "./components/RankTable";
import Switcher from "./components/Switcher";
import { useState } from "react";

export default function League({params}: {params: {leagueId: string}}) {
    const [ matchdayOrSeason, setMatchdayOrSeason] = useState("left");
    return (
        <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl">Point Ranking</h1>
        <Switcher leftSide="Matchday" rightSide="Season" switchState={matchdayOrSeason} setSwitchState={setMatchdayOrSeason}/>
        {matchdayOrSeason == "left" && (
            <p>Click on any manager to see their points in detail</p>
        )}
        <RankTable leagueId={params.leagueId} />
        </div>
    )
}
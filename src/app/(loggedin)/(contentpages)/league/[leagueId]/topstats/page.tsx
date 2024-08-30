"use client";

import { useState, useEffect } from "react";
import Switcher from "../components/Switcher";

export default function TopStats() {
  const [playerTeam, setPlayerTeam] = useState<string>("left");
  const [matchdaySeason, setMatchdaySeason] = useState<string>("left");
  let numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    console.log("Bundesliga page loaded");
  }, [playerTeam, matchdaySeason]);

  return (
    <>
      <div className="flex flex-col items-center pt-12 gap-4">
        <h1 className="text-3xl text-center pb-4">Bundesliga Stats</h1>
        <Switcher
          leftSide="Player"
          rightSide="Team"
          switchState={playerTeam}
          setSwitchState={setPlayerTeam}
        />
        <Switcher
          leftSide="Matchday"
          rightSide="Season"
          switchState={matchdaySeason}
          setSwitchState={setMatchdaySeason}
        />
        <div>
        <h1>to be implemented</h1>
          {numbersList.map((nmb) => {
            return (
              <div
                key={nmb}
                className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md w-56"
              >
                {nmb}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
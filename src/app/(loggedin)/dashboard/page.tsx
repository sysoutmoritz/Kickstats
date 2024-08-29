"use client";

import useLocalStorage from "use-local-storage";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userName, setUserName] = useLocalStorage<string>("userName", "");
  const [leagues, setLeagues] = useLocalStorage<any[]>("leagues", []);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center pt-12 gap-4">
        <h1 className="text-3xl text-center">Welcome, {userName}</h1>
        <h2 className="text-xl text-center py-8">Choose a league</h2>
        {leagues.map((league) => {
          return (
            <button
              key={league.id}
              className="rounded-xl bg-blue-500 py-3 px-6 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
              onClick={() => {
                router.push(`leagues/${league.id}`);
              }}
            >
              {league.name}
            </button>
          );
        })}
      </div>
    </>
  );
}

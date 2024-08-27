"use client";

import useLocalStorage from "use-local-storage";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userName, setUserName] = useLocalStorage<string>("userName", "");
  const [leagues, setLeagues] = useLocalStorage<string>("leagues", "");
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center pt-12 gap-4">
        <h1 className="text-3xl text-center">Welcome, {userName}</h1>
        <button
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-700 py-3 px-6 font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          onClick={() => {
            router.push("bundesliga");
          }}
        >
          General Bundesliga Stats
        </button>
      </div>
    </>
  );
}

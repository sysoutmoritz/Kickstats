"use server";
import { redirect } from "next/navigation";
import Testy from "../components/Testy/Testy";

async function handleClick() {
  console.log("bla");
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Login</p>
      <button
        onClick={() => {
          handleClick();
        }}
        className="border-2 border-red-300"
      >
        To Login
      </button>
      <p>hi</p>
    </main>
  );
}

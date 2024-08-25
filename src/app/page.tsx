"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const tokenExp = localStorage.getItem("tokenExp");
  useEffect(() => {
    if (!tokenExp || Date.now() > Date.parse(tokenExp)) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}

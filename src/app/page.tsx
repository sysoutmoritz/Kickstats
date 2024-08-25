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
  return <></>;
}

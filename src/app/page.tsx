"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  let tokenExp: string | null;
  useEffect(() => {
    tokenExp = localStorage.getItem("tokenExp");
    if (!tokenExp || Date.now() > Date.parse(JSON.parse(tokenExp))) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);
  return <></>;
}

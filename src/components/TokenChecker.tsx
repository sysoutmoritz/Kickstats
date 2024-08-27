"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function isTokenValid() {
  const tokenExp = localStorage.getItem("tokenExp");
  if (!tokenExp || Date.now() > Date.parse(tokenExp)) {
    return false;
  } else {
    return true;
  }
}

export default function TokenChecker() {
  const router = useRouter();
  useEffect(() => {
    if (!isTokenValid()) {
      router.push("/login");
    }
  }, []);
  return <></>;
}

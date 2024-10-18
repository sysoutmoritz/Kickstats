"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";

export function isTokenValid(tokenExp: string) {
  if (!tokenExp || tokenExp == "" || Date.now() > Date.parse(tokenExp)) {
    return false;
  } else {
    return true;
  }
}

export default function TokenChecker() {
  const router = useRouter();
  const [tokenExp, setTokenExp] = useLocalStorage("tokenExp", ""); //get token from local storage
  useEffect(() => {
    if (!isTokenValid(tokenExp)) {
      router.push("/login");
    }
  }, []);
  return <></>;
}

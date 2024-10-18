"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const router = useRouter();
  const [tokenExp, setTokenExp] = useLocalStorage("tokenExp", ""); //get token from local storage
  useEffect(() => {
    if (!tokenExp || tokenExp == "" || Date.now() > Date.parse(tokenExp)) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);
  return <></>;
}

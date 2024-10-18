"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderLogo() {
  const router = useRouter();
  return (
    <button
      className="mr-auto ml-auto flex items-center justify-center gap-1"
      onClick={() => {
        router.push("/dashboard");
      }}
    >
      <Image
        className="rounded-md"
        src="/kickbase.jpg"
        alt="Logo"
        width={36}
        height={36}
      />
      <h1 className="text-white text-2xl">Kickstats</h1>
    </button>
  );
}

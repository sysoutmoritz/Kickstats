"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <>
      <div className="flex justify-left">
        <button
          className="bg-white border border-black rounded-lg m-2 dark:bg-slate-400 dark:text-gray-50 hover:scale-[1.02]"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <Image
            className="rotate-90"
            src={theme == "dark" ? "/dropdown_white.png" : "/dropdown_dark.png"}
            alt=""
            width={48}
            height={48}
          />
        </button>
      </div>
      <div>{children}</div>
    </>
  );
}

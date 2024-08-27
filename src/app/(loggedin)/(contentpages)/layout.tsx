"use client";

import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-left">
        <button
          className="bg-white border border-black rounded-lg p-2 m-2 hover:scale-105 hover:bg-green-100"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Return to Dashboard
        </button>
      </div>
      <div>{children}</div>
    </>
  );
}

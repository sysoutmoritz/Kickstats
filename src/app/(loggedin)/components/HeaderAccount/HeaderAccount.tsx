"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderAccount() {
  const router = useRouter();
  const picture = localStorage.getItem("userProfile")!;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center"
      >
        <Image
          className="rounded-full"
          alt=""
          src={picture}
          width={48}
          height={48}
        />
        <Image
          className={
            isOpen ? "header-arrow-animation-up" : "header-arrow-animation-down"
          }
          src="/dropdown.png"
          alt=""
          width={48}
          height={48}
        />
      </button>
      {isOpen && (
        <div className="absolute top-23 right-17 w-6 h-6 rotate-45 bg-white transition-opacity"></div>
      )}
      {isOpen && (
        <div className="absolute top-24 right-4 w-32 h-7 rounded-sm bg-white text-black transition-opacity">
          <button
            className="w-full h-full"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

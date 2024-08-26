"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import LogoutPrompt from "../LogoutPrompt/LogoutPrompt";

export default function HeaderAccount() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const picture = localStorage.getItem("userProfile")!;
  const { theme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  /*
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!ref.current!.contains(event.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  */

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center overflow-hidden"
      >
        <Image
          className="rounded-full border border-black"
          alt=""
          src={picture}
          width={48}
          height={48}
        />
        <Image
          className={
            isOpen ? "header-arrow-animation-up" : "header-arrow-animation-down"
          }
          src={theme == "dark" ? "/dropdown_white.png" : "/dropdown_dark.png"}
          alt=""
          width={48}
          height={48}
        />
      </button>
      <LogoutPrompt
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonRef={buttonRef}
      />
      {/* 
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
        */}
    </>
  );
}

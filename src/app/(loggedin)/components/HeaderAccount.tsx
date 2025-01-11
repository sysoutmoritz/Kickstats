"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import LogoutPrompt from "./LogoutPrompt";
import useLocalStorage from "use-local-storage";

export default function HeaderAccount() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [picture, setPicture] = useLocalStorage<string>("userProfile", "");
  const { theme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center overflow-hidden"
      >
        {isClient && picture && (
          <Image
            className="rounded-full border border-black"
            alt="User Profile"
            src={picture}
            width={48}
            height={48}
          />
        )}
        <Image
          className={
            isOpen ? "header-arrow-animation-up" : "header-arrow-animation-down"
          }
          src={theme === "dark" ? "/dropdown_white.png" : "/dropdown_dark.png"}
          alt="Dropdown Arrow"
          width={48}
          height={48}
        />
      </button>
      <LogoutPrompt
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonRef={buttonRef}
      />
    </>
  );
}

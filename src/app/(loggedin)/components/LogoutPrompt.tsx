"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPrompt({
  isOpen,
  setIsOpen,
  buttonRef,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  buttonRef: any;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        buttonRef.current &&
        !ref.current!.contains(event.target) &&
        !buttonRef.current!.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, buttonRef]);
  return (
    <>
      {isOpen && (
        <div className="absolute top-23 right-17 w-6 h-6 rotate-45 bg-white transition-opacity"></div>
      )}
      {isOpen && (
        <div
          ref={ref}
          className="absolute top-24 right-4 w-32 h-7 rounded-sm bg-white text-black transition-opacity"
        >
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

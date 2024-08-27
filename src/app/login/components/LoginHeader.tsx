import ThemeSwitch from "@/components/ThemeSwitch";
import Image from "next/image";

export default function LoginHeader() {
  return (
    <>
      <header className="flex items-center justify-center w-100% h-32 bg-gray-600 dark:bg-gray-700 p-2">
        <div className="mr-auto">
          <ThemeSwitch />
        </div>
        <div className="mr-auto ml-auto flex items-center justify-center gap-1">
          <Image
            className="rounded-md"
            src="/kickbase.jpg"
            alt="Logo"
            width={36}
            height={36}
          />
          <h1 className="text-white text-2xl">Kickstats</h1>
        </div>
        <div className="ml-auto invisible">
          <ThemeSwitch />
        </div>
      </header>
    </>
  );
}

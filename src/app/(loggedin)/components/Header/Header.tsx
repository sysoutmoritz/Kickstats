import Image from "next/image";
import dynamic from "next/dynamic";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

const HeaderAccount = dynamic(() => import("../HeaderAccount/HeaderAccount"), {
  ssr: false,
});

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center w-100% h-32 bg-gray-600 dark:bg-gray-700 p-2">
        <div className="mr-auto w-24">
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
        <div className="ml-auto w-24">
          <HeaderAccount />
        </div>
      </header>
      {/*<hr className="h-0.5 bg-black border-0"></hr>*/}
    </>
  );
}

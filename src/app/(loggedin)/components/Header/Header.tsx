import Image from "next/image";
import HeaderAccount from "../HeaderAccount/HeaderAccount";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center w-100% h-32 bg-gray-600 p-2">
        <div className="mr-auto border-2 invisible border-yellow-800">
          <HeaderAccount />
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
        <div className="ml-auto">
          <HeaderAccount />
        </div>
      </header>
      {/*<hr className="h-0.5 bg-black border-0"></hr>*/}
    </>
  );
}

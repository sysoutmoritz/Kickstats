import ThemeSwitch from "@/components/ThemeSwitch";
import HeaderAccount from "./HeaderAccount";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center w-100% h-32 bg-gray-400 dark:bg-gray-700 p-2">
        <div className="mr-auto w-24">
          <ThemeSwitch />
        </div>
        <HeaderLogo />
        <div className="ml-auto w-24">
          <HeaderAccount />
        </div>
      </header>
      {/*<hr className="h-0.5 bg-black border-0"></hr>*/}
    </>
  );
}

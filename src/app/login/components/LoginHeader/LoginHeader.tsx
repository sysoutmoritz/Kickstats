import Image from "next/image";

export default function LoginHeader() {
  return (
    <>
      <header className="flex items-center justify-center gap-1 w-100% h-32 bg-gray-600">
        <Image
          className="rounded-md"
          src="/kickbase.jpg"
          alt="Logo"
          width={36}
          height={36}
        />
        <h1 className="text-white text-2xl">Kickstats</h1>
      </header>
    </>
  );
}

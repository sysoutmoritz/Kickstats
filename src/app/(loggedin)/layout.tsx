import TokenChecker from "@/components/TokenChecker/TokenChecker";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TokenChecker />
      <div className="w-100% h-16 border-2 border-green-400">
        my cool logged in header
      </div>
      <div>{children}</div>
    </>
  );
}

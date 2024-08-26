import TokenChecker from "@/components/TokenChecker/TokenChecker";
import Header from "./components/Header/Header";

export const dynamic = "force-dynamic";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TokenChecker />
      <Header />
      <div>{children}</div>
    </>
  );
}

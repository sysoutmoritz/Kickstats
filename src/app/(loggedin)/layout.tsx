import TokenChecker from "@/components/TokenChecker";
import Header from "./components/Header";

export const dynamic = "force-dynamic";

export default function LoggedInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TokenChecker />
      <Header />
      <main>{children}</main>
    </>
  );
}

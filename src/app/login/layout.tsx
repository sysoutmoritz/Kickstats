import LoginHeader from "./components/LoginHeader";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LoginHeader />
      <main>{children}</main>
    </>
  );
}

import LoginHeader from "./components/LoginHeader/LoginHeader";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LoginHeader />
      <div>{children}</div>
    </>
  );
}

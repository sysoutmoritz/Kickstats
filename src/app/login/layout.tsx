export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="w-100% h-16 border-2 border-green-400">
        my cool header
      </div>
      <div>{children}</div>
    </>
  );
}

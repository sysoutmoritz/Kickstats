import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kickstats - Kickbase Stats Viewer",
  description: "View your Kickbase stats fast even as non-premium user.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="bg-gray-50 min-h-screen dark:bg-slate-800 text-black dark:text-gray-50 box-border">
            {children}
          </div>
        </Providers>
        <footer className="bg-gray-50 dark:bg-slate-800 text-black dark:text-gray-50 box-border pt-4 px-2 text-center">
          <hr className="border border-slate-800 dark:border-gray-50"></hr>
          <u>
            <a
              className="text-sm"
              href="https://github.com/sysoutmoritz/Kickstats"
              target="_blank"
            >
              Github
            </a>
          </u>
        </footer>
      </body>
    </html>
  );
}

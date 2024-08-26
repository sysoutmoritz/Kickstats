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
          <div className="bg-gray-50 dark:bg-slate-800 h-screen text-black dark:text-gray-50 box-border">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

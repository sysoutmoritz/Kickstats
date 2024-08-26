import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-50 h-screen text-black box-border">
          {children}
        </div>
      </body>
    </html>
  );
}

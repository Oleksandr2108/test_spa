import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A project for the interview",
  description: "Hello Roman, this is my project for the interview  ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="grid grid-cols-12 grid-rows-[auto,1fr] h-screen gap-4 ">
            <header className="col-span-2 h-screen border-r border-grey-700">
              <Header />
            </header>
            <main className="col-span-10 p-5 ">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

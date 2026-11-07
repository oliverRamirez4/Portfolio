import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/nav";
import { Footer } from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Oliver Ramirez Dev",
  description: "OR portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-paper font-sans text-[16px] font-normal text-ink antialiased">
        <main className="mx-auto mt-[25px] flex w-[min(40rem,calc(100%-2rem))] min-w-0 flex-col gap-[25px]">
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}

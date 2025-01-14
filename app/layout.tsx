import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/nav";
import { Footer } from "./components/footer";



export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={`${geistMono.className} text-black antialiased`}>
      <body className={` antialiased max-w-xl mx-4 mt-8 lg:mx-auto`}>
        <main className={`flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0`}>

          <NavBar />
          {children}
          <Footer />
          
        </main>

      </body>
    </html>
  );
}

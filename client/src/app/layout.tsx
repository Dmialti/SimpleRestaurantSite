import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

import backgroundImage from "@/assets/AppMaterials/background.jpg";
import NavBar from "./components/NavBar/NavBar";
import SmoothScrolling from "./components/SmoothScrolling/SmoothScrolling";
import CustomScrollbar from "@/features/CustomScrollbar/CustomScrollbar";
import { TransitionProvider } from "@/features/TransitionProvider/TransitionProvider";

const forum = localFont({
  src: [
    {
      path: "../assets/fonts/forum-regular-v1.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-forum",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/satoshi-light-v1.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simple Restaurant Site",
  description: "Next.js 15 Migration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${forum.variable} ${satoshi.variable} antialiased`}>
        <div className="bg-background-default relative min-h-screen">
          <div className="fixed inset-0 z-0">
            <Image
              className="w-full h-full object-cover opacity-6"
              alt="background"
              src={backgroundImage}
              sizes="100vw"
            />
          </div>
          <div className="h-auto relative z-10">
            <SmoothScrolling>
              <TransitionProvider>
                <CustomScrollbar />
                <NavBar />
                {children}
              </TransitionProvider>
            </SmoothScrolling>
          </div>
        </div>
      </body>
    </html>
  );
}

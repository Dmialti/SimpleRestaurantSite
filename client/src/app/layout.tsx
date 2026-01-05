import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        {children}
        <h1 className="font-forum text-4xl text-primary-default">
          Test Font Forum
        </h1>
        <p className="font-satoshi text-text-muted">Test Font Satoshi</p>
      </body>
    </html>
  );
}

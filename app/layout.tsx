import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Homemade_Apple } from "next/font/google";
import { Silkscreen } from "next/font/google";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-homemade-apple",
});

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spacemono",
});

export const metadata: Metadata = {
  title: "MLC - Carla Morales",
  description: "Website",
  icons: {
    icon: "/matcha-latte.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
  className={`${geistSans.variable} ${geistMono.variable} ${homemadeApple.variable} ${silkscreen.variable} ${spaceMono.variable} antialiased`}
>
        {children}
      </body>
    </html>
  );
}

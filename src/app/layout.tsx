import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA | The Anatomy of Comfort",
  description: "Immersive 3D product showcase for Aura Footwear. Experience sustainable engineering and premium craftsmanship.",
  openGraph: {
    title: "AURA | The Anatomy of Comfort",
    description: "Immersive 3D product showcase for Aura Footwear.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

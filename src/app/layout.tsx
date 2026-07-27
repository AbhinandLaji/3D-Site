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
  title: "AURA | Premium Red Footwear & Sustainable Elegance",
  description: "Experience the future of luxury footwear. Discover AURA's premium red leather craftsmanship, zero-footprint sustainable engineering, and adaptive cushioning through our interactive 3D showcase.",
  keywords: [
    "Aura Footwear", 
    "luxury red heels", 
    "sustainable stiletto", 
    "adaptive cushioning", 
    "3D shoe design", 
    "zero footprint footwear", 
    "premium women shoes"
  ],
  authors: [{ name: "AURA Design Lab" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AURA | Premium Red Footwear & Sustainable Elegance",
    description: "Discover AURA's premium red leather craftsmanship and zero-footprint sustainable engineering through our interactive 3D showcase.",
    type: "website",
    locale: "en_US",
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

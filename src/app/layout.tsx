import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda, Roboto_Slab, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// FIX #10: Load Cormorant Garamond via next/font instead of a render-blocking CSS @import.
// next/font automatically self-hosts the font, adds font-display:swap, and preloads it.
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-slab",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "AURA | Precision Smartwatch",
  description:
    "Experience the future of luxury horology. Discover AURA's premium smartwatch craftsmanship, precision engineering, and timeless elegance through our interactive showcase.",
  keywords: [
    "Aura Smartwatch",
    "luxury timepiece",
    "precision watch",
    "titanium smartwatch",
    "horology",
    "premium wearables",
  ],
  authors: [{ name: "AURA Design Lab" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AURA | Precision Smartwatch",
    description:
      "Discover AURA's premium smartwatch craftsmanship and precision engineering through our interactive showcase.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${robotoSlab.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

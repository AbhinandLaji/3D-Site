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
  // Rich Schema.org JSON-LD data for AEO (AI engines like Perplexity/Gemini)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AURA Precision Smartwatch",
    "image": [
      "/images/watch-active.jpg",
      "/images/variant-midnight.png",
      "/images/variant-gold.png",
      "/images/variant-sapphire.png"
    ],
    "description": "A premium circular luxury smartwatch featuring a Grade 5 titanium case, sapphire crystal lens, and a 72-hour power reserve.",
    "brand": {
      "@type": "Brand",
      "name": "AURA Timepieces"
    },
    "material": "Grade 5 Titanium, Sapphire Crystal, Ceramic",
    "model": "AURA Caliber I",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Case Diameter",
        "value": "42mm"
      },
      {
        "@type": "PropertyValue",
        "name": "Power Reserve",
        "value": "72 hours"
      },
      {
        "@type": "PropertyValue",
        "name": "Water Resistance",
        "value": "100 meters (10 ATM)"
      },
      {
        "@type": "PropertyValue",
        "name": "Strap Materials",
        "value": "Tuscan Italian Leather, Grade 5 Titanium Link, Active Sport Fluoroelastomer"
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "offerCount": "3",
      "price": "1499.00",
      "lowPrice": "1499.00",
      "highPrice": "2499.00",
      "offers": [
        {
          "@type": "Offer",
          "name": "AURA Midnight Titanium",
          "price": "1499.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder"
        },
        {
          "@type": "Offer",
          "name": "AURA Champagne Gold PVD",
          "price": "1999.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder"
        },
        {
          "@type": "Offer",
          "name": "AURA Deep Sapphire Ceramic",
          "price": "2499.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder"
        }
      ]
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} ${robotoSlab.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <head>
        {/* Injecting JSON-LD schema for Search & AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
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

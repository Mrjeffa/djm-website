import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import { getInstellingen } from "@/lib/getInstellingen";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dejongemotoren.nl"),
  alternates: { canonical: "./" },
  title: {
    default: "De Jonge Motoren — Occasion motors kopen in Zeeland",
    template: "%s | De Jonge Motoren",
  },
  description: "Occasion motors kopen, verkopen en proefrijden in Tholen, Zeeland. De Jonge Motoren — al 25 jaar eerlijk, persoonlijk advies. BMW, Honda, Kawasaki, Yamaha en meer.",
  keywords: "occasion motor kopen, tweedehands motorfiets, motordealer Zeeland, motordealer Tholen, motor verkopen, proefrit motor",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "De Jonge Motoren",
  },
};

const DAG_EN: Record<string, string> = {
  ma: 'Monday', di: 'Tuesday', wo: 'Wednesday',
  do: 'Thursday', vr: 'Friday', za: 'Saturday', zo: 'Sunday',
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "MotorcycleDealer",
  "name": "De Jonge Motoren",
  "url": "https://www.dejongemotoren.nl",
  "telephone": "+31166606090",
  "email": "info@dejongemotoren.nl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Stevinweg 14",
    "addressLocality": "Tholen",
    "postalCode": "4691 SM",
    "addressCountry": "NL",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5358,
    "longitude": 4.2158,
  },
  "priceRange": "€€",
  "description": "Occasion motors kopen, verkopen en proefrijden in Tholen, Zeeland. Al 25 jaar eerlijk en persoonlijk advies.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const instellingen = await getInstellingen();

  const schemaMetOpeningstijden = {
    ...schemaOrg,
    openingHoursSpecification: Object.entries(instellingen.openingstijden)
      .filter(([, t]) => !t.gesloten && t.open && t.sluit)
      .map(([dag, t]) => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": DAG_EN[dag],
        "opens": t.open,
        "closes": t.sluit,
      })),
  };

  return (
    <html lang="nl" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMetOpeningstijden) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer instellingen={instellingen} />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}

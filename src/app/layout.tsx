import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "De Jonge Motoren — Occasion motors kopen in Zeeland",
  description: "Jouw vrijheid. Vind hem hier. Occasion motors kopen, verkopen en proefrijden bij De Jonge Motoren in Tholen, Zeeland.",
  keywords: "occasion motor kopen, gebruikte motor kopen, motordealer Zeeland, motordealer Tholen, motor verkopen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

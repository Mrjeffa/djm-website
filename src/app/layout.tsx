import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileContactBar from '@/components/MobileContactBar';
import JsonLd from '@/components/JsonLd';
import { getInstellingen } from '@/lib/getInstellingen';
import { vandaagStatus } from '@/lib/instellingen';
import { businessNodes, graph } from '@/lib/schema';
import { BEDRIJF, SITE_URL } from '@/lib/site';

// Cloudflare Pages (next-on-pages) requires every dynamic route, including /_not-found, to run on the edge.
export const runtime = 'edge';
// Stock, prices and opening hours come from Supabase; next-on-pages has no ISR, so render per request.
export const dynamic = 'force-dynamic';

const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-barlow', display: 'swap' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-barlow-condensed', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'De Jonge Motoren | Motor occasions en werkplaats in Tholen',
    template: '%s | De Jonge Motoren',
  },
  description: 'Motorzaak in Tholen, Zeeland. Motor occasions kopen, je motor verkopen, onderhoud, winterstalling en onderdelen. Al 25 jaar aan de Stevinweg 14.',
  applicationName: BEDRIJF.naam,
  formatDetection: { telephone: false },
  openGraph: { type: 'website', locale: 'nl_NL', siteName: BEDRIJF.naam },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0B0B0C' };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const instellingen = await getInstellingen();

  return (
    <html lang="nl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Naar de inhoud
        </a>
        <JsonLd data={graph(businessNodes(instellingen))} />
        <Header status={vandaagStatus(instellingen)} melding={instellingen.opmerking || undefined} />
        <main id="inhoud" className="flex-1">{children}</main>
        <Footer instellingen={instellingen} />
        <MobileContactBar />
      </body>
    </html>
  );
}

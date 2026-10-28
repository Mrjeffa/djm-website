export const SITE_URL = 'https://www.dejongemotoren.nl';

export const BEDRIJF = {
  naam: 'De Jonge Motoren',
  kort: 'DJM',
  straat: 'Stevinweg 14',
  postcode: '4691 SM',
  plaats: 'Tholen',
  provincie: 'Zeeland',
  land: 'NL',
  geo: { lat: 51.5423, lng: 4.2233 },
  telefoon: { label: '0166-606090', e164: '+31166606090' },
  mobiel: { label: '06-21908697', e164: '+31621908697' },
  email: 'info@dejongemotoren.nl',
  jarenErvaring: 25,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=De+Jonge+Motoren+Stevinweg+14+4691+SM+Tholen',
  reviewsUrl: 'https://www.google.com/search?q=De+Jonge+Motoren+Tholen',
  werkgebied: ['Tholen', 'Sint-Philipsland', 'Bergen op Zoom', 'Roosendaal', 'Zeeland', 'West-Brabant'],
} as const;

export function whatsappUrl(tekst?: string) {
  const base = `https://wa.me/${BEDRIJF.mobiel.e164.replace('+', '')}`;
  return tekst ? `${base}?text=${encodeURIComponent(tekst)}` : base;
}

export const HOOFDMENU = [
  { href: '/occasions', label: 'Occasions' },
  { href: '/onderdelen', label: 'Onderdelen' },
  { href: '/werkplaats', label: 'Werkplaats' },
  { href: '/motor-verkopen', label: 'Motor verkopen' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
] as const;

export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'De Jonge Motoren, motorzaak in Tholen' };

import { BEDRIJF, SITE_URL } from './site';
import { DAG_SCHEMA, type DagCode, type Instellingen } from './instellingen';
import { motorPad, type Motor } from './motors';
import type { Product } from './producten';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WERKPLAATS_ID = `${SITE_URL}/werkplaats#werkplaats`;

type Node = Record<string, unknown>;

export function abs(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function address() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BEDRIJF.straat,
    postalCode: BEDRIJF.postcode,
    addressLocality: BEDRIJF.plaats,
    addressRegion: BEDRIJF.provincie,
    addressCountry: BEDRIJF.land,
  };
}

function openingHours(inst: Instellingen) {
  return (Object.entries(inst.openingstijden) as [DagCode, Instellingen['openingstijden'][DagCode]][])
    .filter(([, t]) => !t.gesloten && t.open && t.sluit)
    .map(([dag, t]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAG_SCHEMA[dag], opens: t.open, closes: t.sluit }));
}

export function businessNodes(inst: Instellingen): Node[] {
  const area = BEDRIJF.werkgebied.map(name => ({ '@type': 'Place', name }));
  return [
    {
      '@type': 'MotorcycleDealer',
      '@id': ORG_ID,
      name: BEDRIJF.naam,
      alternateName: BEDRIJF.kort,
      url: SITE_URL,
      logo: abs('/logo-djm.png'),
      image: abs('/logo-djm.png'),
      telephone: BEDRIJF.telefoon.e164,
      email: BEDRIJF.email,
      address: address(),
      geo: { '@type': 'GeoCoordinates', latitude: BEDRIJF.geo.lat, longitude: BEDRIJF.geo.lng },
      hasMap: BEDRIJF.mapsUrl,
      openingHoursSpecification: openingHours(inst),
      areaServed: area,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      knowsAbout: ['Occasion motoren', 'Motoronderhoud', 'Motor inkoop', 'Winterstalling', 'Motoronderdelen en accessoires'],
      contactPoint: [
        { '@type': 'ContactPoint', telephone: BEDRIJF.telefoon.e164, contactType: 'customer service', availableLanguage: 'nl' },
        { '@type': 'ContactPoint', telephone: BEDRIJF.mobiel.e164, contactType: 'sales', availableLanguage: 'nl' },
      ],
      department: { '@id': WERKPLAATS_ID },
    },
    {
      '@type': 'MotorcycleRepair',
      '@id': WERKPLAATS_ID,
      name: `${BEDRIJF.naam} werkplaats`,
      url: abs('/werkplaats'),
      telephone: BEDRIJF.telefoon.e164,
      address: address(),
      geo: { '@type': 'GeoCoordinates', latitude: BEDRIJF.geo.lat, longitude: BEDRIJF.geo.lng },
      openingHoursSpecification: openingHours(inst),
      areaServed: area,
      parentOrganization: { '@id': ORG_ID },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: BEDRIJF.naam,
      inLanguage: 'nl-NL',
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function webPage(path: string, name: string, description: string, type = 'WebPage', extra: Node = {}): Node {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: 'nl-NL',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...extra,
  };
}

export function breadcrumb(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function motorNode(m: Motor): Node {
  return {
    '@type': ['Product', 'Motorcycle'],
    '@id': `${abs(motorPad(m))}#motor`,
    name: `${m.naam} (${m.bouwjaar})`,
    brand: { '@type': 'Brand', name: m.merk },
    model: m.model,
    vehicleModelDate: String(m.bouwjaar),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: m.km, unitCode: m.kmEenheid === 'mijl' ? 'SMI' : 'KMT' },
    itemCondition: 'https://schema.org/UsedCondition',
    ...(m.kleur && { color: m.kleur }),
    ...(m.categorie && { category: m.categorie }),
    ...(m.fotos.length > 0 && { image: m.fotos.slice(0, 5) }),
    ...(m.beschrijving && { description: m.beschrijving }),
    url: abs(motorPad(m)),
    offers: {
      '@type': 'Offer',
      price: m.prijs,
      priceCurrency: 'EUR',
      availability: m.status === 'gereserveerd' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: abs(motorPad(m)),
      seller: { '@id': ORG_ID },
    },
  };
}

export function productNode(p: Product): Node {
  return {
    '@type': 'Product',
    name: p.naam,
    ...(p.omschrijving && { description: p.omschrijving }),
    ...(p.fotos.length > 0 && { image: p.fotos.slice(0, 3) }),
    category: p.categorie === 'accessoires' ? 'Motoraccessoires' : 'Motoronderdelen',
    offers: p.prijs
      ? { '@type': 'Offer', price: p.prijs, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', seller: { '@id': ORG_ID } }
      : undefined,
  };
}

export function itemList(urls: string[]): Node {
  return {
    '@type': 'ItemList',
    numberOfItems: urls.length,
    itemListElement: urls.map((url, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(url) })),
  };
}

export function faqNode(path: string, faqs: { vraag: string; antwoord: string }[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.vraag, acceptedAnswer: { '@type': 'Answer', text: f.antwoord } })),
  };
}

export function graph(...nodes: (Node | Node[])[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.flat() };
}

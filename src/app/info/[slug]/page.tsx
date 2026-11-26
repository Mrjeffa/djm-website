import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getPagina } from '@/lib/paginas';
import EigenPagina, { eigenPaginaMetadata } from '@/components/EigenPagina';

// Eigen infopagina uit de DJM-app ("Website aanpassen" → Dienst- en infopagina's).
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pagina } = await getPagina('info', (await params).slug);
  return pagina ? eigenPaginaMetadata(pagina) : { title: 'Pagina niet gevonden', robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { pagina, nieuwPad } = await getPagina('info', (await params).slug);
  if (nieuwPad) permanentRedirect(nieuwPad);
  if (!pagina) notFound();
  return <EigenPagina pagina={pagina} />;
}

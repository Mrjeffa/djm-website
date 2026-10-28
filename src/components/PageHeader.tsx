import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Kruimelpad" className={`text-sm ${dark ? 'text-muted-on-dark' : 'text-muted'}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden />}
            {i === all.length - 1
              ? <span aria-current="page" className={dark ? 'text-white' : 'text-ink'}>{c.name}</span>
              : <Link href={c.path} className="underline-offset-4 hover:underline">{c.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHeader({
  eyebrow, title, intro, crumbs, children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface-2">
      <div className="container-site py-10 lg:py-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className={`${eyebrow ? 'mt-3' : 'mt-8'} max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)]`}>{title}</h1>
        {intro && <div className="mt-5 max-w-2xl text-lg text-muted">{intro}</div>}
        {children}
      </div>
    </div>
  );
}

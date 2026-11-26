import Link from 'next/link';
import { Fragment } from 'react';
import { isInternPad, isWebadres } from '@/lib/tekst';

// Markdown-subset uit de DJM-app (blog, lange teksten, dienstpagina's): ## tussenkop,
// lege regel = nieuwe alinea, "- " = opsomming, **vet**, [tekst](/pad) en [tekst](https://…).
// Nooit HTML doorlaten: alles wordt als tekst gerenderd (React escapet). Links alleen naar een
// eigen pad of https; al het andere (javascript:, //ander-domein, data:) wordt gewone tekst.

export function inline(text: string, key: string | number = 0): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+?)\]\(([^)\s]+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${m.index}`;
    if (m[1]) out.push(<strong key={k}>{m[1]}</strong>);
    else if (isInternPad(m[3])) out.push(<Link key={k} href={m[3]}>{m[2]}</Link>);
    else if (isWebadres(m[3])) out.push(<a key={k} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>);
    else out.push(m[2]);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const blokken = (source: string) => source.replace(/\r/g, '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

export default function Markdown({ source }: { source: string }) {
  return (
    <div className="prose-djm">
      {blokken(source).map((block, i) => {
        if (block.startsWith('## ')) return <h2 key={i}>{inline(block.slice(3), i)}</h2>;
        const lines = block.split('\n');
        if (lines.every(l => /^\s*-\s+/.test(l))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*-\s+/, ''), `${i}-${j}`)}</li>)}</ul>;
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>{j > 0 && <br />}{inline(l, `${i}-${j}`)}</Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** Lange tekst zonder tussenkoppen: alinea's met **vet** en links, in de opmaak van de omgeving. */
export function Tekst({ waarde, className }: { waarde: string; className?: string }) {
  const delen = blokken(waarde);
  const regels = (b: string, i: number) => b.split('\n').map((l, j) => <Fragment key={j}>{j > 0 && <br />}{inline(l, `${i}-${j}`)}</Fragment>);
  if (delen.length <= 1) return <p className={className}>{regels(delen[0] ?? '', 0)}</p>;
  return (
    <div className={className}>
      {delen.map((b, i) => <p key={i} className={i > 0 ? 'mt-4' : undefined}>{regels(b, i)}</p>)}
    </div>
  );
}

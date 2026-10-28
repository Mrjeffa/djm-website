import Link from 'next/link';
import { Fragment } from 'react';

function inline(text: string, key = 0): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${key}-${m.index}`}>{m[1]}</strong>);
    else if (m[3].startsWith('/')) out.push(<Link key={`${key}-${m.index}`} href={m[3]}>{m[2]}</Link>);
    else out.push(<a key={`${key}-${m.index}`} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  return (
    <div className="prose-djm">
      {source.split(/\n{2,}/).map((block, i) => {
        if (block.startsWith('## ')) return <h2 key={i}>{block.slice(3)}</h2>;
        const lines = block.split('\n');
        if (lines.every(l => l.startsWith('- '))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2), j)}</li>)}</ul>;
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>{j > 0 && <br />}{inline(l, j)}</Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

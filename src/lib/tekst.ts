// Gedeelde regels voor tekst uit de DJM-app (markdown-subset).
export const isInternPad = (u: string) => /^\/([^/\\].*)?$/.test(u);
export const isWebadres = (u: string) => /^https:\/\/[^\s"<>]+$/.test(u);

/** Platte tekst (voor structured data en meta): zonder ** en met alleen de linktekst. */
export function platteTekst(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+?)\]\([^)]*\)/g, '$1')
    .replace(/^##\s+/gm, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
}

/** Woorden tellen (voor leestijd). */
export const telWoorden = (md: string) => platteTekst(md).split(/\s+/).filter(Boolean).length;

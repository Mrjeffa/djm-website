// Inserts Cloudinary delivery transformations; other hosts are returned untouched.
export function cld(url: string, transform: string): string {
  const marker = '/image/upload/';
  const i = url.indexOf(marker);
  if (!url.includes('res.cloudinary.com') || i === -1) return url;
  return url.slice(0, i + marker.length) + transform + '/' + url.slice(i + marker.length);
}

export function cldSrcSet(url: string, widths: number[], extra = ''): string {
  return widths.map(w => `${cld(url, `f_auto,q_auto,w_${w}${extra}`)} ${w}w`).join(', ');
}

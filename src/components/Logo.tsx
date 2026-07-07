import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ className = '', linkToHome = true }: { className?: string; linkToHome?: boolean }) {
  const img = (
    <Image
      src="/logo.png"
      alt="De Jonge Motoren"
      width={180}
      height={90}
      className={`h-10 w-auto ${className}`}
      priority
    />
  );
  if (!linkToHome) return img;
  return <Link href="/" aria-label="De Jonge Motoren — Home">{img}</Link>;
}

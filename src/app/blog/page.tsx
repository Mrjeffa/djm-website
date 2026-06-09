import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Motortips & Advies | De Jonge Motoren',
  description: 'Motortips, koopadvies en nieuws van De Jonge Motoren. Welke motor voor beginners, motorverzekering, onderhoudstips en meer.',
};

const posts = [
  {
    slug: 'welke-motor-voor-beginners',
    titel: 'Welke motor is geschikt voor beginners in 2026?',
    intro: 'Je hebt net je rijbewijs gehaald en je wilt weten welke motor bij je past. Hier zijn de beste opties voor A2 rijbewijs en waarom.',
    datum: '3 juni 2026',
    leestijd: '5 min',
    categorie: 'Koopadvies',
  },
  {
    slug: 'honda-vs-kawasaki-occasion',
    titel: 'Honda CB500 vs Kawasaki Z650: welke occasion kies jij?',
    intro: 'Twee populaire naked bikes in het occasion-segment. Beide betaalbaar, betrouwbaar en leuk om te rijden. Maar welke past bij jou?',
    datum: '18 mei 2026',
    leestijd: '7 min',
    categorie: 'Vergelijking',
  },
  {
    slug: 'motorverzekering-kosten-2026',
    titel: 'Wat kost een motorverzekering in 2026?',
    intro: 'Van WA tot allrisk: wat betaal je voor een motorverzekering? En wanneer is de extra dekking de moeite waard?',
    datum: '2 mei 2026',
    leestijd: '4 min',
    categorie: 'Verzekering',
  },
  {
    slug: 'motor-onderhoud-zelf-doen',
    titel: '5 onderhoudstaken die je zelf kunt doen aan je motor',
    intro: 'Je hoeft niet altijd naar de dealer. Met een beetje basiskennis kun je zelf een hoop besparen en je motor beter leren kennen.',
    datum: '14 april 2026',
    leestijd: '6 min',
    categorie: 'Onderhoud',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">Tips & advies</div>
        <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase">Blog</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group border border-[#E5E5E5] hover:border-[#E31E24] transition-colors p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[2px] text-[#E31E24]">{post.categorie}</span>
              <span className="text-[#E5E5E5]">·</span>
              <span className="text-[#888] text-xs">{post.leestijd} lezen</span>
            </div>
            <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase leading-tight mb-3 group-hover:text-[#E31E24] transition-colors">
              {post.titel}
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-4">{post.intro}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#AAA] text-xs">{post.datum}</span>
              <span className="font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24] flex items-center gap-1">
                Lees meer <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

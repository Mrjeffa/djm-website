import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hoi, ik heb interesse in een motor bij De Jonge Motoren.');
  const href = `https://wa.me/31612345678?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20ba59] transition-all hover:scale-110"
      aria-label="WhatsApp De Jonge Motoren"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}

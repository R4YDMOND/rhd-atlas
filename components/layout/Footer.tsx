// components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';

const socials = [
  { label: 'VK', href: '#' },
  { label: 'MAX', href: '#' },
  { label: 'Lolka', href: 'https://lolka.gg/JkbbNyX5l' },
  { label: 'GitHub', href: 'https://github.com/R4YDMOND/rhd-atlas' },
];

const navLinks = [
  { label: 'О проекте', href: '/about' },
  { label: 'Контакты', href: '#' },
  { label: 'Политика конфиденциальности', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080B0D]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Логотип и слоган */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Image
              src="/branding/atlas-logo.png"
              alt="RHD Atlas"
              width={100}
              height={30}
              className="h-auto w-auto"
            />
            <p className="max-w-xs text-center text-xs text-[#626866] md:text-left">
              RHD Atlas — ваш навигатор в мире игр. Ancient worlds. Modern knowledge.
            </p>
          </div>

          {/* Социальные сети */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-4 py-2 text-xs text-[#9B9D9A] transition-colors hover:border-[#C7A56A]/50 hover:text-[#F1EEE7]"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Навигация футера */}
          <nav className="flex flex-col items-center gap-3 md:items-end">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-[#9B9D9A] transition-colors hover:text-[#F1EEE7]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Копирайт */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-[#4A4F50]">
            © {new Date().getFullYear()} RHD Atlas. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
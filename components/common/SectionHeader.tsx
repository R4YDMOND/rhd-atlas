import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  href?: string;
}

export function SectionHeader({ eyebrow, title, href }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div className="flex items-center gap-4">
        <span className="h-8 w-1 rounded-full bg-gradient-to-b from-[#C7A56A] to-[#2F9D91]" />
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs uppercase tracking-[0.3em] text-[#C7A56A]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold text-[#F1EEE7] sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>

      {href && (
        <Link
          href={href}
          className="group hidden items-center gap-2 text-sm text-[#9B9D9A] transition-colors hover:text-[#F1EEE7] sm:flex"
        >
          Смотреть все
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
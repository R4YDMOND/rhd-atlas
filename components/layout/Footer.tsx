import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080B0D] px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold">
            RHD <span className="text-[#C7A56A]">Hub</span>
          </Link>

          <p className="mt-2 text-sm text-[#777D7C]">
            Ваш компас в мире игр.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-[#9B9D9A]">
          <a href="#" className="transition hover:text-[#F1EEE7]">
            Lolka
          </a>

          <a href="#" className="transition hover:text-[#F1EEE7]">
            VK
          </a>

          <a href="#" className="transition hover:text-[#F1EEE7]">
            MAX
          </a>

          <a href="#" className="transition hover:text-[#F1EEE7]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
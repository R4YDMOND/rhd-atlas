type CalcSectionProps = {
  title: string;
  children: React.ReactNode;
};

/** Карточка-секция формы калькулятора. */
export default function CalcSection({ title, children }: CalcSectionProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101518] p-6">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#C7A56A]">
        {title}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

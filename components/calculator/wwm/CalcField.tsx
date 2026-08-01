"use client";

type CalcFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  hint?: string;
  step?: number;
};

/** Числовое поле ввода в едином стиле калькулятора. */
export default function CalcField({
  label,
  value,
  onChange,
  suffix,
  hint,
  step = 1,
}: CalcFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs text-[#9B9D9A]">
        {label}
        {hint && (
          <span className="cursor-help text-[#777D7C]" title={hint}>
            (?)
          </span>
        )}
      </span>

      <span className="relative flex items-center">
        <input
          type="number"
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className="w-full rounded-lg border border-white/10 bg-[#0B1012] px-3 py-2 text-sm text-[#F1EEE7] outline-none transition focus:border-[#C7A56A]/50"
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3 text-xs text-[#777D7C]">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

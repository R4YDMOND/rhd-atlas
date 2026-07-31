"use client";

import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
}

export function Select({ label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm text-muted-gray">{label}</label>}
      <SelectPrimitive value={value} onValueChange={(v) => onChange(v as string)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>
    </div>
  );
}

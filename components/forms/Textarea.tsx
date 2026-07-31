"use client";

import { Textarea as TextareaPrimitive } from "@/components/ui/textarea";

interface FormTextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export function Textarea({ label, value, onChange, rows = 4, placeholder }: FormTextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm text-muted-gray">{label}</label>}
      <TextareaPrimitive
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}

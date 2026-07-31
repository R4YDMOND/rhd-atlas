"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface DataTableToolbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DataTableToolbar({ value, onChange, placeholder = "Поиск..." }: DataTableToolbarProps) {
  return (
    <div className="relative max-w-sm">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8"
      />
    </div>
  );
}

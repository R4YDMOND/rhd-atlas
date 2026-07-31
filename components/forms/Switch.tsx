"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

interface FormSwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ label, checked, onChange }: FormSwitchProps) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-muted-gray">
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          "relative h-5 w-9 rounded-full bg-input transition-colors",
          "data-[checked]:bg-primary"
        )}
      >
        <SwitchPrimitive.Thumb className="block size-4 translate-x-0.5 rounded-full bg-background transition-transform data-[checked]:translate-x-[18px]" />
      </SwitchPrimitive.Root>
      {label}
    </label>
  );
}

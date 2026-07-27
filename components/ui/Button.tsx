import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-medium transition-all duration-200",
        {
          "bg-amber-500 hover:bg-amber-400 text-black":
            variant === "primary",

          "bg-zinc-800 hover:bg-zinc-700 text-white":
            variant === "secondary",

          "bg-red-600 hover:bg-red-500 text-white":
            variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
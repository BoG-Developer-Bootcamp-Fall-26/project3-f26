import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const baseClasses =
  "rounded px-8 py-2 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses = {
  primary: "bg-brand-red text-white hover:bg-red-700",
  secondary: "border border-brand-red bg-white text-brand-red hover:bg-red-50",
};

export default function Button({ variant = "primary", className = "", ...buttonProps }: ButtonProps) {
  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...buttonProps} />;
}

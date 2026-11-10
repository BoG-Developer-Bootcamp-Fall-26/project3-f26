import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const inputClasses =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 " +
  "focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

export default function TextInput(props: TextInputProps) {
  return <input className={inputClasses} {...props} />;
}

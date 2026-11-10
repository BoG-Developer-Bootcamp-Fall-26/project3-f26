import type { TextareaHTMLAttributes } from "react";
import { inputClasses } from "@/components/ui/TextInput";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps) {
  return <textarea className={`${inputClasses} min-h-32 resize-y`} {...props} />;
}

import { ComponentProps } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {}

export function Textarea({ ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      className="min-h-8 rounded-md border border-neutral-700 bg-neutral-300 p-2 text-sm text-zinc-700"
    />
  );
}

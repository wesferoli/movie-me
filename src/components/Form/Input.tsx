import { ComponentProps } from "react";

interface FormInputProps extends ComponentProps<"input"> {}

export function Input({ ...rest }: FormInputProps) {
  return (
    <input
      {...rest}
      className="h-8 rounded-md border border-neutral-700 bg-neutral-300 px-2 text-sm text-zinc-700"
    />
  );
}

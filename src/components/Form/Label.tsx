import { ComponentProps } from "react";

interface FormLabelProps extends ComponentProps<"label"> {
  children: string;
}

export function Label({ children, ...rest }: FormLabelProps) {
  return (
    <label
      className="text-sm font-bold text-neutral-50 drop-shadow-text md:text-base"
      {...rest}
    >
      {children}
    </label>
  );
}

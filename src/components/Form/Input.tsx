import React, { ComponentProps } from "react";

interface FormInputProps extends ComponentProps<"input"> {}

export const Input = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className="h-8 rounded-md border border-neutral-700 bg-neutral-300 px-2 text-sm text-zinc-700 focus:border-2 focus:border-black focus:outline-none md:text-base"
      />
    );
  }
);

Input.displayName = "Input";

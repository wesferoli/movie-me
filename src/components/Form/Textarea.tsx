import React, { ComponentProps } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...rest }, ref) => {
    return (
      <textarea
        {...rest}
        ref={ref}
        className="min-h-8 rounded-md border border-neutral-700 bg-neutral-300 p-2 text-sm text-zinc-700 md:text-base"
      />
    );
  }
);

Textarea.displayName = "Textarea";

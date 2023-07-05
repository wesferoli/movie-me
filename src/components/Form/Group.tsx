import { ComponentProps, ReactNode } from "react";

interface FormGroupProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export function Group({ children, ...rest }: FormGroupProps) {
  return (
    <div {...rest} className="flex flex-col space-y-1">
      {children}
    </div>
  );
}

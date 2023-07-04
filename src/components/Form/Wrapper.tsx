import { ComponentProps, ReactNode } from "react";

interface FormContainerProps extends ComponentProps<"form"> {
  children: ReactNode;
}

export function Wrapper({ children, ...rest }: FormContainerProps) {
  return <form {...rest}>{children}</form>;
}

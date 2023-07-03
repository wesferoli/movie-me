import { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
}

export function Group({ children }: FormGroupProps) {
  return <div className="flex flex-col">{children}</div>;
}

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends ComponentProps<"button"> {
  children: string;
  icon?: JSX.Element;
  variant?: "primary";
}

export const variants = {
  primary:
    "rounded-full border border-black bg-yellow-600 text-sm font-medium text-black lg:text-base",
};
const baseStyle = "flex items-center py-1.5 px-3 justify-center text-center";

export default function Button({
  children,
  icon,
  variant = "primary",
  ...rest
}: IButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge([baseStyle, variants[variant], rest.className])}
    >
      {icon}
      {children}
    </button>
  );
}

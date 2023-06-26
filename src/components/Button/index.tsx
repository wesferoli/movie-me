interface IButtonProps {
  onClick: () => void;
  children: string;
  icon?: JSX.Element;
  className?: string;
  variant?: "primary";
}

export const variants = {
  primary:
    "rounded-full border border-black bg-yellow-600 p-1.5 text-sm font-medium text-black lg:text-base",
};
const baseStyle = "flex items-center justify-center text-center";

export default function Button({
  onClick,
  className,
  children,
  icon,
  variant = "primary",
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[baseStyle, variants[variant], className]
        .map((style) => style)
        .join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}

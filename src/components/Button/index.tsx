interface IButtonProps {
  onClick: () => void;
  children: string;
  icon?: JSX.Element;
  className?: string;
}

export default function Button({
  onClick,
  className,
  children,
  icon,
}: IButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {icon}
      {children}
    </button>
  );
}

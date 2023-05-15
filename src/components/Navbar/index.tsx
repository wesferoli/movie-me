import { ReactElement } from "react";

interface INavbarProps {
    children: ReactElement;
}

export default function Navbar({ children }: INavbarProps) {
    return <nav>{children}</nav>;
}

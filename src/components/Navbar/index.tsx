import Profile from "../User/Profile";
import SignIn from "../User/SignIn";
import SearchBar from "./SearchBar";
import { Session } from "next-auth";
import Link from "next/link";

interface INavbarProps {
  session: Session | null;
}

export default async function Navbar({ session }: INavbarProps) {
  return (
    <nav className="relative grid h-10 grid-cols-8 items-center bg-yellow-500 px-4 sm:px-10 md:h-14 lg:px-24">
      <Link
        href="/"
        className="order-2 col-start-3 col-end-7 justify-self-center text-xl font-bold text-black sm:order-1 sm:col-start-1 sm:col-end-3 sm:inline sm:justify-self-start md:text-2xl lg:text-3xl"
      >
        MovieMe
      </Link>
      <SearchBar />
      <div className="order-3 col-start-8 col-end-8 flex justify-end">
        {session?.user ? (
          <Profile avatarUrl={session?.user?.image || ""} />
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
}

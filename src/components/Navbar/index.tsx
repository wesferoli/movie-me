import { use } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "../User/Profile";
import SignIn from "../User/SignIn";
import SearchBar from "./SearchBar";

async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export default function Navbar() {
  const session = use(getSession());

  return (
    <nav className="relative grid h-10 grid-cols-8 items-center bg-yellow-500 px-4 sm:px-10 md:h-14 lg:px-24">
      <p className="col-start-1 col-end-3 hidden text-xl font-bold text-black sm:inline md:text-2xl lg:text-3xl">
        MovieMe
      </p>
      <SearchBar />
      <div className="col-start-7 col-end-9 flex justify-end">
        {session?.user ? (
          <Profile avatarUrl={session?.user?.image || ""} />
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
}

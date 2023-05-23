import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "../User/Profile";
import SignIn from "../User/SignIn";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex h-14 items-center justify-between bg-yellow-500 px-24">
      <p className="text-3xl font-bold text-black">MovieMe</p>
      <input
        type="text"
        placeholder="Find by title or category"
        className="h-10 rounded-full px-4 text-black placeholder:text-gray-200"
      />
      {session?.user ? (
        <Profile avatarUrl={session?.user?.image || ""} />
      ) : (
        <SignIn />
      )}
    </nav>
  );
}

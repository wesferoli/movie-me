"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface IProfileProps {
  avatarUrl: string;
}

export default function Profile({ avatarUrl }: IProfileProps) {
  const [toogleProfileOptions, setToogleProfileOptions] = useState(false);

  return (
    <div className="relative flex items-center">
      <button onClick={() => setToogleProfileOptions(!toogleProfileOptions)}>
        <Image
          src={avatarUrl}
          alt="User avatar"
          height={50}
          width={50}
          className="h-8 w-8 rounded-full md:h-10 md:w-10"
        />
      </button>

      {toogleProfileOptions && (
        <div className="absolute right-0 top-[110%] my-0 min-w-max rounded-md bg-neutral-50 p-2 text-sm text-neutral-900 sm:left-1/2 sm:right-1/2 sm:-translate-x-1/2 md:top-[120%] md:p-2.5 md:text-base">
          <ul className="flex-col space-y-1 sm:space-y-2">
            <li>
              <a href="/my-reviews">My reviews</a>
            </li>
            <li className="font-semibold text-red-500">
              <button className="text-left" onClick={() => signOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

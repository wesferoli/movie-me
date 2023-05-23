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
          className="h-10 w-10 rounded-full"
        />
      </button>

      {toogleProfileOptions && (
        <div className="absolute left-1/2 right-1/2 top-[120%] mx-auto my-0 min-w-max -translate-x-1/2 rounded-md bg-neutral-50 p-2.5 text-neutral-900">
          <ul className="flex-col space-y-2">
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

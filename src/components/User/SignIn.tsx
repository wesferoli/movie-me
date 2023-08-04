"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div>
      <button
        onClick={() => signIn("github")}
        className="flex items-center space-x-2"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-50 bg-gray-400 md:h-10 md:w-10">
          <Github className="h-4 w-4 text-neutral-50 md:h-6 md:w-6" />
        </div>
        <span className="hidden text-xs font-semibold text-neutral-900 md:inline md:text-sm">
          Conectar
        </span>
      </button>
    </div>
  );
}

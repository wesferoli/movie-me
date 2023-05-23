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
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-50 bg-gray-400">
          <Github className="h-5 w-5 text-neutral-50" />
        </div>
        <span className="text-sm font-semibold text-neutral-900">Sign in</span>
      </button>
    </div>
  );
}

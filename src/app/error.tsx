"use client";

import { handleErrorMessage } from "@/lib/handleErrorMessage";
import { signIn } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);
  const errorToObject = JSON.parse(error.message) || {
    type: "GenericError",
    message: error.message,
  };
  console.log(errorToObject);

  return (
    <div className="mx-4 flex h-[80vh] flex-1 flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold md:text-4xl">
        Oops, something went wrong :(
      </h2>
      <span className="mt-2 text-sm text-gray-100 md:text-base">
        {handleErrorMessage(errorToObject.type)}
      </span>
      <div className="flex space-x-4">
        {errorToObject.type === "UnauthorizedError" ? (
          <button
            onClick={() => signIn("github")}
            className="mt-5 rounded-md bg-neutral-200 px-2 py-1 text-sm text-zinc-900 hover:bg-neutral-400 md:text-base"
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={reset}
            className="mt-5 rounded-md border-2 border-neutral-200 bg-transparent px-2 py-1 text-sm hover:border-neutral-400 hover:text-neutral-400 md:text-base"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

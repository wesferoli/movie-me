"use client";

import { movieDBToken } from "@/utils/constant";
import { ReactElement, useState } from "react";

interface INavbarProps {
  children: ReactElement;
}

const getMovie = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/551", {
    headers: {
      Authorization: `Bearer ${movieDBToken}`,
    },
    method: "GET",
  });

  return response.json();
};

export default function Navbar({ children }: INavbarProps) {
  const [movie, setMovie] = useState();

  const showMovie = async () => {
    const data = await getMovie();
    setMovie(data);
  };

  return (
    <nav>
      {children}
      <button
        className="ml-1 rounded px-3 py-1 outline outline-gray-50"
        onClick={showMovie}
      >
        List Movie
      </button>
      <pre>
        <p>{movie && JSON.stringify(movie, null, 2)}</p>
      </pre>
    </nav>
  );
}

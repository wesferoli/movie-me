import { MovieList } from "@/app/api/movie/types";
import { api } from "@/lib/api";

export const revalidate = 259200; // revalidate every 3 days

async function staticParams() {
  const { data: movieList } = await api
    .get<{ data: MovieList }>("/movie")
    .then((resp) => resp.data);

  return movieList.map((movie) => {
    return { id: String(movie.id) };
  });
}

export const generateStaticParams =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? staticParams : undefined;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex justify-center">{children}</main>;
}

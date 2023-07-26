import Poster from "@/components/Poster";
import { MovieController } from "@/services/controllers/movie";

export default async function Home() {
  const movieList = await MovieController.listPopular().then((resp) => {
    return resp.data;
  });

  return (
    <main className="mx-10 my-8 flex flex-wrap justify-center gap-x-8 gap-y-6 sm:my-14 sm:gap-x-14 md:mx-24 md:gap-y-10 lg:mx-40 lg:my-20">
      {movieList.map((movie) => (
        <Poster
          poster={movie.poster}
          releaseYear={movie.releaseYear}
          title={movie.title}
          movieId={movie.id}
          key={movie.id}
        />
      ))}
    </main>
  );
}

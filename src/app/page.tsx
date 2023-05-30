import Poster from "@/components/Poster";

export default function Home() {
  const movie = {
    title: "John Wick: Chapter 4",
    releaseYear: "2023",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
  };

  return (
    <main className="my-6 flex items-center justify-center md:my-20">
      <Poster
        posterUrl={movie.poster}
        releaseYear={movie.releaseYear}
        title={movie.title}
      />
    </main>
  );
}

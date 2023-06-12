import { IMovieDetails } from "@/app/api/movie/[id]/types";
import { IRouteParams } from "@/app/api/types";
import { api } from "@/lib/api";

export default async function MovieDetails({ params }: IRouteParams) {
  const { id } = params;
  const { data: movie } = await api
    .get<{ data: IMovieDetails }>(`/movie/${id}`)
    .then((resp) => resp.data);

  return (
    <div>
      <h1>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
      </h1>
    </div>
  );
}

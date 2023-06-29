import { IMovieDetails } from "@/app/api/movie/[id]/types";
import { api } from "@/lib/api";
import { cache } from "react";

export const MovieService = {
  find: (id: string) => api.get<{ data: IMovieDetails }>(`/movie/${id}`),
};

export const getMovieDetails = cache(async (id: string) => {
  const resp = await MovieService.find(id);
  return resp.data;
});

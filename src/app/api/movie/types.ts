import { z } from "zod";
import { movieDBListSchema } from "./schema";

interface IMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMDBMovieList {
  page: number;
  results: IMDBMovie[];
  total_pages: number;
  total_results: number;
}

export type MovieList = z.infer<typeof movieDBListSchema>;

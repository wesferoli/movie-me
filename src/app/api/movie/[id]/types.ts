import { z } from "zod";
import { movieDetailsSchema } from "./schema";

interface MDBMovieDetailsCreditsCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
interface MDBMovieDetailsCreditsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface MDBMovieDetailsCredits {
  cast: MDBMovieDetailsCreditsCast[];
  crew: MDBMovieDetailsCreditsCrew[];
}

interface MDBMovieDetailsSpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface MDBMovieDetailsProdCountries {
  iso_3166_1: string;
  name: string;
}
interface MDBMovieDetailsProdCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface MDBMovieDetailsGenres {
  id: number;
  name: string;
}

export interface MDBMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: MDBMovieDetailsGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MDBMovieDetailsProdCompanies[];
  production_countries: MDBMovieDetailsProdCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MDBMovieDetailsSpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: MDBMovieDetailsCredits;
}

export interface IMovieDetails extends z.infer<typeof movieDetailsSchema> {
  rating: number | null;
}
export type IMovieDetailsGenres = IMovieDetails["genres"];
export type IMovieDetailsCast = IMovieDetails["cast"];
export type IMovieDetailsCrew = IMovieDetails["crew"];

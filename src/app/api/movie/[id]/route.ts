import { IMovieDetailsProps } from "@/app/movie/[id]/page";
import { movieDBApi } from "@/lib/api";
import { NextResponse } from "next/server";
import { movieDetailsSchema } from "./schema";

export async function GET(request: Request, { params }: IMovieDetailsProps) {
  const { id } = params;
  const movie = await movieDBApi
    .get<MDBMovieDetails>(`/movie/${id}`, {
      params: { append_to_response: "credits" },
    })
    .then((resp) => resp.data);

  const filteredMovieDetails = movieDetailsSchema.parse(movie);

  return NextResponse.json({ movie: filteredMovieDetails });
}

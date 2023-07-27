import { IRouteParams } from "@/app/api/types";
import { MovieController } from "@/services/controllers/movie";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: IRouteParams) {
  const { id } = params;
  const movieReviews = await MovieController.listReviews(id);

  return NextResponse.json(movieReviews);
}

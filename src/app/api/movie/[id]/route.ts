import { NextResponse } from "next/server";
import { IRouteParams } from "../../types";
import { MovieController } from "@/services/controllers/movie";

export async function GET(request: Request, { params }: IRouteParams) {
  const { id } = params;
  const movieDetails = await MovieController.find(id);

  return NextResponse.json(movieDetails);
}

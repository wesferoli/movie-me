import { NextResponse } from "next/server";
import { MovieController } from "@/services/controllers/movie";

export async function GET() {
  const popularMovies = await MovieController.listPopular();

  return NextResponse.json(popularMovies);
}

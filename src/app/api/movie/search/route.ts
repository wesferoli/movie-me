import { errorHandler } from "@/middleware/api/errorHandler";
import { NextResponse } from "next/server";
import { MovieController } from "@/services/controllers/movie";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      throw new Error("Search not provided.");
    }

    const searchedMovies = await MovieController.search(query);

    return NextResponse.json(searchedMovies);
  } catch (err) {
    return errorHandler(err);
  }
}

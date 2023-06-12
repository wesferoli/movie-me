import { reviewListSchema } from "@/app/api/review/schema";
import { ReviewList } from "@/app/api/review/types";
import { IRouteParams } from "@/app/api/types";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: IRouteParams) {
  try {
    const movieReview = await prisma.review.findMany({
      where: { movieId: Number(params.id) },
      include: { user: true },
    });

    const filteredMovieReviews: ReviewList =
      reviewListSchema.parse(movieReview);

    return NextResponse.json({ data: filteredMovieReviews });
  } catch (error) {
    return errorHandler(error);
  }
}

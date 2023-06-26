import { errorHandler } from "@/middleware/api/errorHandler";
import { CreateReviewData } from "./types";
import { createReviewData } from "./schema";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function ApiCreateReview(data: CreateReviewData) {
  try {
    const validatedData = createReviewData.parse(data);

    const newReview = await prisma.review.create({
      data: {
        ...validatedData,
        movieId: Number(validatedData.movieId),
        rating: parseFloat(validatedData.rating),
      },
    });

    return NextResponse.json({
      data: newReview,
      message: "New review created!",
    });
  } catch (err) {
    return errorHandler(err);
  }
}

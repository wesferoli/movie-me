"use server";

import { errorHandler } from "@/middleware/api/errorHandler";
import prisma from "@/lib/prisma";

import { createReviewData } from "@/services/controllers/review/schema";
import { CreateReviewData } from "@/services/controllers/review/types";
import { revalidatePath } from "next/cache";

import "server-only";

async function ApiCreateReview(data: CreateReviewData) {
  try {
    const validatedData = createReviewData.parse(data);

    const newReview = await prisma.review.create({
      data: {
        ...validatedData,
        movieId: Number(validatedData.movieId),
        rating: Number(validatedData.rating),
      },
    });

    return {
      data: newReview,
      message: "New review created!",
      success: true,
    };
  } catch (err) {
    throw errorHandler(err);
  }
}

export async function createReview(data: CreateReviewData) {
  "use server";

  try {
    const newReview = await ApiCreateReview(data);

    if (newReview?.success) {
      const redirectPath = `/movie/${data.movieId}`;

      revalidatePath(redirectPath);
    }

    return newReview;
  } catch (err) {
    console.error(err);
  }
}

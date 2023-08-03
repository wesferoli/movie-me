"use server";

import { errorHandler } from "@/middleware/api/errorHandler";
import prisma from "@/lib/prisma";

import { createReviewData } from "@/services/controllers/review/schema";
import { CreateReviewData } from "@/services/controllers/review/types";
import { revalidatePath } from "next/cache";

import "server-only";
import { redirect } from "next/navigation";

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

async function ApiDeleteReview(id: string) {
  try {
    const deletedReview = await prisma.review.delete({ where: { id } });

    return {
      data: deletedReview,
      message: "Review deleted!",
      success: true,
    };
  } catch (err) {
    throw errorHandler(err);
  }
}

export async function createReview(data: CreateReviewData) {
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

export async function deleteReview(id: string) {
  try {
    await ApiDeleteReview(id);
  } catch (err) {
    console.error(err);
    throw err;
  }

  const redirectPath = "/user/reviews";
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

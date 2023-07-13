"use server";

import { errorHandler } from "@/middleware/api/errorHandler";
import { CreateReviewData } from "./types";
import { createReviewData } from "./schema";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ApiCreateReview(data: CreateReviewData) {
  try {
    const validatedData = createReviewData.parse(data);

    const newReview = await prisma.review.create({
      data: {
        ...validatedData,
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

export async function createReview(
  data: CreateReviewData,
  userId: string,
  movieId: string
) {
  Object.assign(data, {
    userId,
    movieId,
  });

  await ApiCreateReview(data);

  const redirectPath = `/movie/${movieId}`;
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

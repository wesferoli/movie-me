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
        movieId: Number(validatedData.movieId),
        rating: Number(validatedData.rating),
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

export async function createReview(data: CreateReviewData) {
  try {
    await ApiCreateReview(data);

    const redirectPath = `/movie/${data.movieId}`;
    revalidatePath(redirectPath);
    redirect(redirectPath);
  } catch (err) {
    console.error(err);
  }
}

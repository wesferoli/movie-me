import prisma from "@/lib/prisma";
import { errorHandler } from "@/middleware/api/errorHandler";
import { NextResponse } from "next/server";
import { reviewListSchema } from "./schema";
import { ReviewList } from "./types";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({ include: { user: true } });

    const filteredReviews: ReviewList = reviewListSchema.parse(reviews);

    return NextResponse.json({ data: filteredReviews });
  } catch (error) {
    return errorHandler(error);
  }
}

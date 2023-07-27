import { NextResponse } from "next/server";
import { ReviewController } from "@/services/controllers/review";

export async function GET() {
  const reviews = await ReviewController.listAll();

  return NextResponse.json(reviews);
}

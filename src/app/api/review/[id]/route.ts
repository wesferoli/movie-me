import { IRouteParams } from "../../types";
import { NextResponse } from "next/server";
import { ReviewController } from "@/services/controllers/review";

export async function GET(request: Request, { params }: IRouteParams) {
  const { id } = params;
  const review = await ReviewController.find(id);

  return NextResponse.json(review);
}

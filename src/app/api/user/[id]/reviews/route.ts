import { IRouteParams } from "@/app/api/types";
import { NextResponse } from "next/server";
import { UserController } from "@/services/controllers/user";

export async function GET(request: Request, { params }: IRouteParams) {
  const userReviews = await UserController.listReviews(params.id);

  return NextResponse.json(userReviews);
}

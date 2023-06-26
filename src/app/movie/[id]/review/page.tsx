import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ApiCreateReview } from "@/app/api/review/actions";
import { CreateReviewData } from "@/app/api/review/types";
import { IRouteParams } from "@/app/api/types";
import { getServerSession } from "next-auth";

export default async function CreateReview({ params }: IRouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  const movieId = params.id;

  // Server Action
  async function createReview(data: FormData) {
    "use server";
    data.append("userId", userId);
    data.append("movieId", movieId);
    const formData = Object.fromEntries(data.entries()) as CreateReviewData;

    await ApiCreateReview(formData);
  }

  return (
    <div>
      <h1>Create Review</h1>

      <form action={createReview}>
        <input name="title" type="text" value="any title" />
        <input name="description" type="text" value="default" />
        <input name="rating" type="text" value="4.5" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

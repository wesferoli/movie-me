import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MyReviewList from "@/components/MyReviewList";
import { UserController } from "@/services/controllers/user";
import { getServerSession } from "next-auth";

export default async function MyReviews() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  const reviewsList = await UserController.listReviews(userId).then(
    (resp) => resp.data
  );

  return (
    <div className="w-full max-w-[1136px] rounded-lg border border-yellow-500 bg-neutral-700 font-semibold">
      <div className="flex items-center justify-between rounded-t-lg bg-yellow-500 p-2 text-black md:px-4">
        <span>Movie</span>
        <span>Rating</span>
      </div>
      <div className="divide-y divide-yellow-500 p-2 font-medium md:px-4">
        {reviewsList.map((review) => (
          <MyReviewList review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
}

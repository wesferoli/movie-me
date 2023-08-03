"use client";

import Button from "@/components/Button";
import { deleteReview } from "@/services/actions";
import { Edit, Trash } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";

export default async function UserReviewActions({
  reviewId,
  movieId,
}: {
  reviewId: string;
  movieId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(async () => {
      const redirectPath = "/user/reviews";
      const deletedReview = await deleteReview(reviewId);

      if (deletedReview?.success) {
        redirect(redirectPath);
      }
    });
  }

  return (
    <>
      {/* <Button
        onClick={() => onEdit()}
        icon={
          <Edit className="mr-2 h-4 w-4 text-center text-sm lg:text-base" />
        }
        className="mt-2 min-w-[160px]"
        variant="primary"
      >
        Edit
      </Button> */}
      <Button
        onClick={onDelete}
        icon={
          <Trash className="mr-2 h-4 w-4 text-center text-sm lg:text-base" />
        }
        className="mt-2 min-w-[160px]"
        variant="danger"
        disabled={isPending}
      >
        Delete
      </Button>
    </>
  );
}

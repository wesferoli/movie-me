"use client";

import Button from "@/components/Button";
import { Form } from "@/components/Form";
import { Rating } from "@/components/Rating";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReviewData, Review } from "@/services/controllers/review/types";
import { createReviewData } from "@/services/controllers/review/schema";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { editReview, createReview } from "@/services/actions";
import { toast } from "react-toastify";

interface FormCreateReviewProps {
  userId: string;
  movieId: string;
}

async function findReview(reviewId: string) {
  const resp: { data: Review } = await api.get(`/review/${reviewId}`);
  return resp.data;
}

export default function FormCreateReview({
  userId,
  movieId,
}: FormCreateReviewProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId") || "";

  const { data: reviewToEdit } = useQuery({
    queryKey: ["editReview"],
    queryFn: () => findReview(editId),
    enabled: searchParams.has("editId"),
    suspense: true,
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateReviewData>({
    resolver: zodResolver(createReviewData),
    defaultValues: {
      movieId: Number(movieId),
      userId,
      description: reviewToEdit?.description || undefined,
      rating: String(reviewToEdit?.rating) || "0",
      title: reviewToEdit?.title || undefined,
    },
  });

  function onSubmit(data: CreateReviewData) {
    startTransition(async () => {
      const newReview = editId
        ? await editReview({ id: editId, ...data })
        : await createReview(data);

      const message = editId
        ? "Review editada com sucesso!"
        : "Review criada com sucesso!";

      if (newReview?.success) {
        toast(message, {
          progressStyle: { background: "#22c55e" },
        });
        const redirectPath = `/movie/${data.movieId}/review/${newReview.data.id}`;

        redirect(redirectPath);
      }
    });
  }

  return (
    <Form.Wrapper
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 space-y-2 md:mt-4"
    >
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Rating
          {...register("rating", { required: true })}
          value={getValues("rating")}
        />
        <span className="text-sm text-red-500">
          {errors.rating && errors.rating.message}
        </span>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="title-input">Title</Form.Label>
        <Form.Input
          {...register("title", { required: true })}
          type="text"
          id="title-input"
        />
        <span className="text-sm text-red-500">
          {errors.title && errors.title.message}
        </span>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description-input">Description</Form.Label>
        <Form.Editor
          name="description"
          control={control}
          id="description-input"
        />
        <span className="text-sm text-red-500">
          {errors.description && errors.description.message}
        </span>
      </Form.Group>
      <div className="flex justify-center pt-2">
        <Button
          className="w-1/3 max-w-[170px]"
          disabled={isPending}
          variant="primary"
        >
          {editId ? "Edit" : "Create"}
        </Button>
      </div>
    </Form.Wrapper>
  );
}

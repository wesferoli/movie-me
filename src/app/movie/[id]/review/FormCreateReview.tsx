"use client";

import { createReview } from "@/app/api/review/actions";
import Button from "@/components/Button";
import { Form } from "@/components/Form";
import { Rating } from "@/components/Rating";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewData } from "@/app/api/review/schema";
import { CreateReviewData } from "@/app/api/review/types";

interface FormCreateReviewProps {
  userId: string;
  movieId: string;
}

export default function FormCreateReview({
  userId,
  movieId,
}: FormCreateReviewProps) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReviewData>({
    resolver: zodResolver(createReviewData),
    defaultValues: {
      movieId: Number(movieId),
      userId,
    },
  });

  function onSubmit(data: CreateReviewData) {
    startTransition(async () => {
      await createReview(data);
    });
  }

  return (
    <Form.Wrapper
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 space-y-2 md:mt-4"
    >
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Rating {...register("rating", { required: true })} />
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
        <Form.Textarea
          {...register("description", { required: true })}
          rows={4}
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
          Create
        </Button>
      </div>
    </Form.Wrapper>
  );
}

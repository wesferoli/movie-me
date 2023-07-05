import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ApiCreateReview } from "@/app/api/review/actions";
import { CreateReviewData } from "@/app/api/review/types";
import { IRouteParams } from "@/app/api/types";
import Button from "@/components/Button";
import { Form } from "@/components/Form";
import Rating from "@/components/Rating";
import { getMovieDetails } from "@/services/api/movie";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function CreateReview({ params }: IRouteParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  const movieId = params.id;

  const { data: movie } = await getMovieDetails(params.id);

  // Server Action
  async function createReview(data: FormData) {
    "use server";
    data.append("userId", userId);
    data.append("movieId", movieId);
    const formData = Object.fromEntries(data.entries()) as CreateReviewData;

    await ApiCreateReview(formData);

    const redirectPath = `/movie/${movieId}`;
    revalidatePath(redirectPath);
    redirect(redirectPath);
  }

  return (
    <div className="mx-4 my-8 max-w-[1136px] flex-grow rounded-lg border border-yellow-500 bg-neutral-700 p-2 sm:mx-10 sm:p-4 md:mx-10 md:p-10 lg:mx-24 lg:my-10 lg:p-10 xl:p-16">
      <div className="flex flex-col items-center justify-center border-b-2 border-yellow-500 pb-2 sm:flex-row sm:items-start sm:justify-start md:pb-4">
        <Image
          src={movie.poster}
          alt="Movie poster"
          width={225}
          height={340}
          className="max-w-[160px] shadow-poster md:w-full md:max-w-[200px] xl:max-w-[225px] 2xl:max-w-[250px]"
        />
        <div className="sm:ml-4">
          <h1 className="mt-2 text-center text-2xl font-bold text-yellow-500 drop-shadow-text sm:text-left md:text-left lg:text-3xl xl:text-4xl">
            {movie.title}
          </h1>
          <div className="mt-1 flex items-center justify-center divide-x divide-yellow-400 text-xs font-semibold drop-shadow-text sm:justify-start md:mt-1 md:justify-start md:text-sm">
            <span className="pr-2">{movie.releaseYear}</span>
            <span className="pl-2">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          </div>
        </div>
      </div>
      <Form.Wrapper action={createReview} className="mt-2 space-y-2 md:mt-4">
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Rating />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="title-input">Title</Form.Label>
          <Form.Input name="title" type="text" id="title-input" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description-input">Description</Form.Label>
          <Form.Textarea name="description" rows={4} id="description-input" />
        </Form.Group>
        <div className="flex justify-center pt-2">
          <Button className="w-1/3 max-w-[170px]" variant="primary">
            Create
          </Button>
        </div>
      </Form.Wrapper>
    </div>
  );
}

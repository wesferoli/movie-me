import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { IRouteParams } from "@/app/api/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import FormCreateReview from "./FormCreateReview";
import { MovieController } from "@/services/controllers/movie";

export default async function CreateReview({ params }: IRouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error(
      JSON.stringify({
        type: "UnauthorizedError",
        message: "You must be connected to see this content",
      })
    );
  }

  const userId = session?.user?.id as string;
  const movieId = params.id;

  const movie = await MovieController.find(params.id).then((resp) => resp.data);

  return (
    <div className="mx-4 my-8 max-w-[1136px] flex-grow rounded-lg border border-yellow-500 bg-neutral-700 p-2 sm:mx-10 sm:p-4 md:mx-10 md:p-10 lg:mx-24 lg:my-10 lg:p-10 xl:p-16">
      <div className="flex flex-col items-center justify-center border-b-2 border-yellow-500 pb-2 sm:flex-row sm:items-start sm:justify-start md:pb-4">
        <Image
          src={movie.poster.src || "/default-image.png"}
          alt="Movie poster"
          width={225}
          height={340}
          placeholder="blur"
          blurDataURL={movie.poster.base64}
          className="max-w-[160px] shadow-poster md:w-full md:max-w-[200px] xl:max-w-[225px] 2xl:max-w-[250px]"
        />
        <div className="sm:ml-4">
          <h1 className="mt-2 text-center text-2xl font-bold text-yellow-500 drop-shadow-text sm:text-left lg:text-3xl xl:text-4xl">
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

      <FormCreateReview movieId={movieId} userId={userId} />
    </div>
  );
}

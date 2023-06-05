export interface IMovieDetailsProps {
  params: { id: string };
}

export default function MovieDetails({ params }: IMovieDetailsProps) {
  const { id } = params;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

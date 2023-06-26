import ReviewsList, {
  IReviewsListProps,
} from "@/components/MovieDetails/ReviewsList";
import { render, screen } from "@testing-library/react";

const reviewList: IReviewsListProps = {
  movieId: 1,
  movieReviews: [
    {
      id: "1",
      description: "Test description 1",
      movieId: 1,
      rating: 3,
      title: "Test review 1",
      user: {
        id: "1",
        avatarUrl: "https://www.github.com/wesferoli.png",
        name: "user 1",
      },
    },
    {
      id: "2",
      description: "Test description 2",
      movieId: 1,
      rating: 4.5,
      title: "Test review 2",
      user: {
        id: "2",
        avatarUrl: "https://www.github.com/wesferoli.png",
        name: "user 2",
      },
    },
  ],
};

describe("<ReviewList />", () => {
  it("should render review list", () => {
    render(<ReviewsList {...reviewList} />);

    const reviewCards = screen.getAllByTestId("review-card");
    expect(reviewCards).toHaveLength(reviewList.movieReviews.length);
  });

  it("should show no reviews message", () => {
    render(<ReviewsList movieId={reviewList.movieId} movieReviews={[]} />);

    const noReviewMessage = screen.getByText(/No reviews were made yet./i);
    expect(noReviewMessage).toBeInTheDocument();
  });
});

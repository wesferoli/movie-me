import ReviewCard, { IReviewCardProps } from "@/components/ReviewCard";
import { render, screen } from "@testing-library/react";

const reviewCard: IReviewCardProps = {
  movieId: 1,
  rating: 4.5,
  reviewId: "rv1",
  title: "Simple test review",
  userAvatar: "https://www.github.com/wesferoli.png",
  userName: "Test user",
};

describe("<ReviewCard />", () => {
  it("should render review card", () => {
    render(<ReviewCard {...reviewCard} />);

    const userImage = screen.getByAltText("Reviewer image");
    const userName = screen.getByText(reviewCard.userName);
    const reviewTitle = screen.getByText(reviewCard.title);
    const fullStars = screen.getAllByTestId("full-star");
    const halfStars = screen.getAllByTestId("half-star");

    expect(userImage).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(reviewTitle).toBeInTheDocument();
    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(1);
  });
});

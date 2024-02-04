import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("renders without crashing", function () {
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("should move backward when clicking left button", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // Fire right arrow click first
  const rightArrow = queryByTestId("right-arrow");
  // Click left arrow afterwards
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect first image to show but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

it("it should remove left button when on the first page", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow.id).toBe("hideLeftClick");
});

it("it should remove right button when on the last page", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow.id).toBe("hideRightClick");
});

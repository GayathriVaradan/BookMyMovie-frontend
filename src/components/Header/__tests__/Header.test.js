import React from "react";
import { render } from "@testing-library/react";
import Header from "../index";

describe("Testing Header Component", () => {
  test("render header component", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("headerTest")).toBeInTheDocument();
  });
});

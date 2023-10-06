import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App1, App2 } from "../src/App.jsx";

describe("First app", () => {
  it("renders headline", () => {
    render(<App1 />);

    const heading = screen.getByRole("heading").textContent;
    expect(heading).toMatch(/our first test/i);
  });
});

describe("Second app", () => {
  it("renders magnificent monkeys by default", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App2 />);
    expect(container).toMatchSnapshot();
  });

  it("renders radical rhinos after button click", async () => {
    const user = userEvent.setup();
    render(<App2 />);

    const button = screen.getByRole("button", { name: "Click Me" });
    await user.click(button);

    const heading = screen.getByRole("heading").textContent;
    expect(heading).toMatch(/radical rhinos/i);
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserEvents from "../src/UserEvents.jsx";

describe("`UserEvents` component", () => {
  it('renders "magnificent monkeys"', () => {
    const { container } = render(<UserEvents />);
    expect(container).toMatchSnapshot();
  });

  it('renders "radical rhinos" after button click', async () => {
    render(<UserEvents />);
    const button = screen.getByRole("button", { name: "Click Me" });

    await userEvent.click(button);

    expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i);
  });
});

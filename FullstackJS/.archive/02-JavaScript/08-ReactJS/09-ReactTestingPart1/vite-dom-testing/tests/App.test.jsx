import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../src/App.jsx";

describe("App component", () => {
  it("renders correct heading", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("heading").textContent).toMatch(/our first test/i);
  });
});

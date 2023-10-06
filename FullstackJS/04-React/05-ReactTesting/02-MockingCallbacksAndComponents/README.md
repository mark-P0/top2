# Mocking Callbacks And Components

## Mocking functions

> Primarily by way of `vi.fn()`

```jsx
export function CustomButton({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}
```

```jsx
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomButton } from "./CustomButton.jsx";

describe("CustomButton", () => {
  it("should render a button with the text 'Click me'", () => {
    render(<CustomButton onClick={() => {}} />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", async () => {
    const onClick = vi.fn(); // Mocked callback
    const user = userEvent.setup();
    render(<CustomButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn(); // Mocked callback
    render(<CustomButton onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
```

## Mocking components / children

> Primarily by way of `vi.mock()`

Intercepts imports from a path and provides the "mocked" object

```jsx
vi.mock("../Submission.jsx", () => ({ submission, isDashboardView }) => (
  <>
    <div data-test-id="submission">{submission.id}</div>
    <div data-test-id="dashboard">{isDashboardView.toString()}</div>
  </>
));
```

- Presumably, the component being tested imports a `Submission` component from `Submission.jsx`
- To isolate the testing (unit test), that component should not be used
- As a substitute, a mock component can be provided, as the second argument the mock constructor
  - First argument is the path from which the component is imported
- Whenever `<Submission />` is constructed, the provided component is used instead

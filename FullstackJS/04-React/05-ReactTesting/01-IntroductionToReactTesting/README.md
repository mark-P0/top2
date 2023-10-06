# Introduction To React Testing

> Oh no...
>
> I don't like [formal] testing...

## Command

Assuming a `"test"` script has been specified in `package.json`:

```sh
npm run test
```

> Shortcut
>
> ```sh
> npm test
> ```

## Packages

### `vitest`

- Testing UI apps build via `vite`
- Mirrors syntax of `jest`

### [`testing-library`](https://github.com/testing-library)

Collection of all sorts of testing tools for different packages/frameworks/workflows (?)

#### `@testing-library/react`

Allows rendering of React components

#### `@testing-library/jest-dom`

Provides matchers to the DOM

#### `@testing-library/user-event`

Simulates user interactions via `userEvent` API

- `@testing-library/react` provides similar `fireEvent` API
- `fireEvent` is inferior to `userEvent`, which should be preferred

## API

Sample test file:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("renders the same default content", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("changes content after click", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: "Click Me" });
    await user.click(button);

    const heading = screen.getByRole("heading").textContent;
    expect(heading).toMatch(/changed content/i);
  });
});
```

### `render()`

Draws the actual React components

### `.getByRole()`

- Preferred over other queries
- Ensures that UI is **accessible** regardless of mode of usage

### Snapshots

- Compares current render with a previous render
- Tells whether the "static" element changed unexpectedly
- When there's nothing to compare to, a snapshot is created
- On subsequent renders, that render is compared to the created snapshot
- If they do not match, the test fails

> Snapshot tests are easy to mess up!
>
> - When the first render is wrong, and all the subsequent renders are also wrong, the test will not catch it!
> - Snapshot tests fail on the tiniest discrepancies, e.g. punctuations, spacings, tags

Best for

- Components that do not change
- Initial state of components

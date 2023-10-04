# React Testing Part 1

The recommended React testing tools are [bundled with `create-react-app`](https://create-react-app.dev/docs/running-tests).

> Without CRA, e.g. when using `vite`, these are to be installed separately.

They are all from the [`testing-library` organization](https://github.com/testing-library):

> For some reason, installing them all at the same time does not work properly...
>
> Some `reify` issue and stuff
>
> Also they should be installed from NPM's servers and **NOT** GitHub

```sh
npm i -D testing-library/react
npm i -D testing-library/jest-dom
npm i -D testing-library/user-event
```

**Jest** is recommended as the testing framework, but its Vite alternative [**Vitest**](https://vitest.dev/) could be used.

> [React Testing Library tutorial](https://testing-library.com/docs/react-testing-library/intro#tutorials) linked by the docs
>
> - Article uses Jest
> - Author also has a separate guide for [Vitest](https://www.robinwieruch.de/vitest-react-testing-library/)

```sh
npm i -D vitest jsdom
```

Add `'jsdom'` to the `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
```

Write tests, e.g. `App.test.jsx`

```jsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";

describe("Component testing setup", () => {
  it("works fine", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
```

Run tests!

> Vitest automatically defaults to _watch_ mode

```sh
npm run <test-script>  # Needs to be setup via `package.json`
npm test  # Shorthand for `"test"` script

npx vitest  # Run Vitest directly
```

## `create-react-app`

https://github.com/testing-library/user-event/issues/1104#issuecomment-1460005394

- Encountered a strange issue where the testing suite complains about state changes not being wrapped in `act()` calls
- However, not using `act()` calls is actually the preferred way
- The conflict is apparently caused by mismatching `@testing-library/react` and `@testing-library/user-event` dependencies, which both must resolve to the EXACT SAME `@testing-library/dom` package
- Somehow, during local install, the dependencies of these pointed to different versions, hence the wrap-`act()` issue
- Running **`npm dedupe`**, as per the linked issue comment, seems to solve it
- It cannot be reproduced in a clean environment, e.g. StackBlitz
  - Presumably because the local installs have not been locally cached yet?
- This issue is also not present in a Vitest approach

## Vitest

- Manually configuring Testing Library packages, e.g. when using Vite + Vitest, will use their most recent versions
- `create-react-app` uses _outdated versions_ of these packages
- There are significant changes between them, e.g.
  - `@testing-library/user-event` APIs are now **asynchronous** in the most recent update, which seems to avoid the wrap-`act()` issues encountered through CRA

## Knowledge Check

- What packages are required for React testing?

  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
    - Not strictly required
    - Only useful for triggerring user events, e.g. button clicks, which should be almost always be present in React apps

- What is the significance of the `user-event` package?

  - Provides a way to mimic user behavior, and trigger listeners for such
  - `@testing-library/react` itself has a method for achieving this, but the `user-event`-approach is preferred over it

- What does the `render` method do?

  - Uses the React component as if it was in a browser DOM

- What is the most preferred method for querying?

  - `.byRole()` methods
  - Implies compliance with accessibility

- How would you test for a click event with `userEvent`?

  - `userEvent.click(<HTMLElement>)`

- What is the advantage of snapshot tests?

  - Fast
  - Easy to write
  - Does not need multiple explicit assertions

- What are the disadvantages of snapshot tests?

  - Does not guarantee anything other than the component render has not changed
  - Snapshot tests are best for static markup, and React components are most often dynamic (they _react_ to user interactions)
  - They have uses, but must be used very sparingly

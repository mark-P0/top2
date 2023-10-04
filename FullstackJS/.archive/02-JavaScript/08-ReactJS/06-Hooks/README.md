# Hooks

Hooks provide **state** and **lifecycle** to functional components.

- These were previously exclusive to class components
- Without hooks, functional components are "dumb", "stateless", only represents markup

> [10 React Hooks Explained // Plus Build your own from Scratch](https://www.youtube.com/watch?v=TNhaISOUy6Q)
> ― Fireship

> Props are passed in as _arguments_ to functional components, e.g.
>
> ```ts
> function MyComponent({ prop1, prop2, ...otherProps }: PropsType) {
>   /* ... */
> }
> ```

## State Hook `.useState()`

- Equivalent to `this.state`
- Encourages per-data state composition
  - instead of a single whole block of state object

```ts
import React, { useState } from "react";

function Component(props: Props) {
  const [data, setData] = useState<Data>(/* Default `data` value */);

  /* ... */
}
```

## Lifecycle Hook `.useEffect()`

- Equivalent of `.componentDidMount()` | `.componentDidUpdate()` | `.componentWillUnmount()`
  - In class components, cleanup only runs on unmounting
  - In effect hooks, cleanup runs on unmounting **AND RE-RENDERS**

```ts
import React, { useEffect } from "react";

function Component(props: Props) {
  /* ... */

  const dependencies: Props[] | State[] | undefined = [];
  useEffect(function cbDidMountAndDidUpdate() {
    /* ... */

    return function cbWillUnmountAndDependencyChange() {
      /* ... */
    };
  }, dependencies);

  /* ... */
}
```

### Dependency Array Behavior

| Array                         | `didMount` |           `didUpdate`           |
| :---------------------------- | :--------: | :-----------------------------: |
| `[prop1, state1, /* etc. */]` |     ✅     | ✅ (_when dependencies change_) |
| `[]`                          |     ✅     |               ❌                |
| ` ` &nbsp; (pass nothing)     |     ✅     |       ✅ (**EVERYTIME**)        |

## Other Hooks

### `.useRef()`

- Mutable state
- Most useful for accessing DOM elements directly

### `.useContext()`

- Consuming [contexts](https://reactjs.org/docs/context.html)

### `.useCallback()`

- Defines functions once
- Not that helpful as functions are redefined **with or without** this
  - Useful when callbacks are consumed deep in a tree

### `.useMemo()`

- Defines values once
- Useful for expensive computation
- Might be helpful for generating ad-hoc components...
  - `React.memo()` for full-fledged components

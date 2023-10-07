# Refs And Memoization

> Refs are primarily used to get a direct reference to the actual DOM element
>
> Memoization is used to skip recalculating things, but must only be used sparingly

## `useRef()`

```jsx
import { useRef, useEffect } from "react";

function Form() {
  const formRef = useRef(null);

  useEffect(() => {
    // Effect runs after render
    // After render, the ref has been assigned to the corresponding element

    const form = formRef.current; // HTMLFormElement

    const data = new FormData(form);
    // etc.
  });

  return <form ref={formRef}></form>;
}
```

- Hook for keeping a reference to a value
- This reference is kept between renders, i.e. not destroyed on re-renders
  - Kind of like state
- Commonly used to access rendered DOM elements

### Equivalents

```js
const ref = useRef(initialValue);

const [ref, _] = useState({ current: initialValue }); // https://twitter.com/dan_abramov/status/1099842565631819776

const [ref, _] = useState(createRef(initialValue));
```

- `useRef()` takes advantage of the fact that state values persist between renders
- Object shape can be basically anything
- Anything can be contained in the ref
- Mutating the ref object will not trigger a re-render
  - Because it is not done through a state setter

> I feel like `useRef()` should use a ref object, not create them...

### `accessNullableRef()`

```ts
export function accessNullableRef<T>(
  labelledRef: Record<string, RefObject<T>>
): T {
  const entries = Object.entries(labelledRef);
  if (entries.length !== 1) {
    throw new Error("Possible improper use of ref wrapper");
  }
  const [label, ref] = entries[0];

  const current = ref.current;
  if (current === null) {
    throw new Error(`${label} reference does not exist`);
  }
  return current;
}
```

- Inspired by [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value) on nullable contexts and my `useNullableContext()`
- Accesses the `current` value of refs, and errors if its not present
  > IMO refs should always default to `null`
- Kind of like a custom hook, but not really

### Why not traditional DOM manipulation? e.g. `document.querySelector()`

- Defeats the purpose of React
- React is supposed to handle the DOM
- If we manipulate the DOM ourselves, we're bypassing React

## ⚠ `useMemo()`

> **Only use when needed!**

> Premature optimization is the root of all evil
>
> ― Donald Knuth, _The Art of Computer Programming_

```jsx
function Component({ someProp }) {
  const result = doSomethingHeavy(someProp); // ⚠ Might take a long time, and block renders

  return <>{result}</>;
}
```

```jsx
import { useMemo } from "react";

function Component({ someProp }) {
  const result = useMemo(() => {
    return doSomethingHeavy(someProp);
  }, [someProp]); // Only recalculate if `someProp` changes

  return <>{result}</>;
}
```

- Similar syntax with `useEffect()`
- Wraps computation in a function
- When a dependency changes, recompute
- If same dependency, reuse the previous computed value
- Kind of like caching
- Should remind of expensive algorithms, e.g. factorials, Fibonacci sequence

### `memo()`

```jsx
import { memo } from "react";

function Button({ children, onClick }) {
  doSomethingSlowAndExpensive();

  return <button onClick={onClick}>{children}</button>;
}

const MemoizedButton = memo(Button);
```

- Kind of like `useMemo()` but for **components**
- If it has the same props, it will not be re-rendered

### ⚠ `useCallback()`

- `useMemo()` but specifically for functions (e.g. callbacks of elements and components)
- skips wrapping in another function

Equivalents

```js
// Regular function
let callback = function () {
  doSomethingPotentiallySlow(dependency);
};

// With `useMemo()`
callback = useMemo(() => {
  // Returned from another function
  return function () {
    doSomethingPotentiallySlow(dependency);
  };
}, [dependency]);

// With `useCallback()`
callback = useCallback(
  // NOT returned from another function
  function () {
    doSomethingPotentiallySlow(dependency);
  },
  [dependency]
);
```

> Potentially worse than not using it, because everytime you use it, **you redefine the function anyway**.
>
> So why not just use that redefined function directly?
>
> The `useCallback()` call is just unnecessary overhead.
>
> With `useMemo()` the expensive calculation is wrapped in a function **that is executed only when needed**. That's what makes it useful.
>
> `useCallback()` is useful when you need **the exact same function**, everytime. (_Referential equality_)
>
> When you're using a state inside a callback, using the same exact function will potentially use old, stale states, which is probably not what you want.
>
> Use `useMemo()` and `useCallback()` **ONLY** when there's a measurable performance cost in your app.
>
> ---
>
> Many thanks to https://kentcdodds.com/blog/usememo-and-usecallback

# Managing State With The Context API

> Empty components that serves to just hold data (heh...)
>
> I prefer avoiding prop drilling (no matter how shallow) as much as possible,
> and let the component get whatever data it needs on its own from a context

- Inverts data access from "being passed to a component" to "the component gets it on demand"

## Basic Parts

```jsx
// SomeValueContext.jsx

import { createContext, useContext } from "react";

const SomeValueContext = createContext(null);

function SomeValueProvider({ children }) {
  const [someValue, setSomeValue] = useState();

  return (
    <SomeValueContext.Provider value={someValue}>
      {children}
    </SomeValueContext.Provider>
  );
}
```

### `createContext()`

- Creates a `Context` object
- Used to create a provider component
- Used by components that need the context value

### `Context.Provider`

- Component that holds the context value
- Should be placed as high as necessary up in the DOM
  - So that the components that access it are all under it

> It might be good to provide the context value wrapped in an object
>
> In the future, allows for more values to be provided, just in case

### `useContext`

- Hook that accesses the context value
- Can be used by components themselves
- Can also build a custom hook around this dedicated for the context
  ```jsx
  export function useSomeValue() {
    return useContext(SomeValueContext);
  }
  ```

#### `useNullableContext()`

```tsx
function useNullableContext<T>(
  labelledContext: Record<string, Context<T | null>>
): T {
  const entries = Object.entries(labelledContext);
  if (entries.length !== 1) {
    throw new Error("Possible improper use of custom context hook");
  }
  const [label, context] = entries[0];

  const value = useContext(context);
  if (value === null) {
    throw new Error(`${label} not provided`);
  }
  return value;
}
```

- Based on [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value)
- Custom hook that unwraps context values that default to `null`
  > I argue that its better for contexts to default to null, and "wire" the actual value with a state directly
- Takes a single parameter that should be an object with a single field
  - This is to take advantage of the [shorthand property definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions)
  - This way, the context can be labelled by its variable name

## Cautions

- Avoid large contexts that update frequently
  - Consider breaking down the context into several smaller contexts

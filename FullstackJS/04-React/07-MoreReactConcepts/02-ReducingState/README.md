# Reducing State

> I find reducers clunky...

More complex, powerful alternative to states

## Benefits

### Separates state logic

- Easily allow replacing states with external files

### Easily testable

- Reducers are pure functions
- Reducers associate to a dispatch action, which can be tracked easily
- The reducer function is kind of a custom state setter
  - The return value of the reducer will be the new state

## Syntax

```jsx
import { useReducer } from "react";

function reducer(currentState, action) {
  const { type } = action;

  if (type === "did something") {
    return updatedState;
  }

  if (type === "another action") {
    return anotherState;
  }

  throw new Error(`Unknown action ${type}`);
}

function Component() {
  const [state, dispatcher] = useReducer(reducer, initialState);

  function callback() {
    dispatcher({ type: "did something" });
  }

  return <></>;
}
```

- `useReducer()` hook takes in a reducer function and an initial state
  - Initial state is similar in usage as `useState(initialState)`
- Conventionally, reducer functions use `switch`-`case` to perform actions
  - Early returns and `if`-`else` statements are also just fine
- `action` object can be of any shape
  - Conventionally, must have a `"type"` property, but it can be called anything
  - `"type"` value can be anything as well, as long as the reducer knows about it
  - `action` object can have other fields that can be used to update state

> Reducers still update state and batch state changes on the next render, like `useState()`!

# Introduction To State

- State is a **component's memory**

## `useState()` hook

```jsx
function Component() {
  const [state, setState] = useState(initialValue);
}
```

- `useState()` returns two values in an array
  - the current state value
  - a setter function for the state
- Read the state with the provided value
- Set the state with the provided setter

### Hook rules

- Functions that start with `use`, e.g. `useState()`
- Hooks should be called only at the very start of each component
  - Values can be computed in between
  - But no loops, early returns, etc.
  - **All hook calls should be done at the start!**
- Hooks should not be called conditionally or in loops
- Custom hooks can be built that follow these rules

## Re-rendering

- On each state change, the whole component is reconstructed
  - Destroyed and rebuilt with the latest state value

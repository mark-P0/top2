# Component Lifecycle Methods

## `render()`

- Required
- Runs on mount (initial render) and updates (e.g. prop/state changes)
- Must be pure method that returns markup to render (JSX)
  - Should only use props and state, not set them!
  - Must return the same thing given the same input

## `componentDidMount()`

- Not required
- Run after mount
- Common use cases
  - Fetching data (and subsequently updating component state)
  - Manipulate rendered element, e.g. drawing on a canvas element

## `componentDidUpdate()`

- Not required
- Run after re-renders / state changes
  - Must be careful with state setting here! Can cause infinite loop
- Try to structure app such that this is not needed
  - e.g. instead of relying on state inputs, why not rely on component creation (and use `componentDidMount()` instead)

## `componentWillUnmount()`

- Not required
- Run before component is unmounted / destroyed
- Common use cases: Clean up functions
  - Database disconnect
  - API disconnect
  - Cancelling fetches
  - Clearing timers, event listeners, observers, etc.

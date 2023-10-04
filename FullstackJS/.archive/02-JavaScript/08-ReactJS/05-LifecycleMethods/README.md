# Lifecycle Methods

|                    Method | Required | `.setState()` | Signature             |
| ------------------------: | :------: | :-----------: | :-------------------- |
|               `.render()` |   Yes    |               | `() => JSX.Element`   |
|    `.componentDidMount()` |          |      Yes      | `() => void`          |
|   `.componentDidUpdate()` |          |      Yes      | `(prevProps) => void` |
| `.componentWillUnmount()` |          |               | `() => void`          |

## `.render()`

- Only required method
- Returns the markup of the component (JSX)

## `.componentDidMount()`

- Called when the component has been initialized
- Add callbacks, event listeners, attach to other frameworks, etc.

## `.componentDidUpdate()`

- Called when the component has been updated, e.g. when
  - Given new props
  - Internal state has been changed

## `.componentWillUnmount()`

- Called when the component is set to be destroyed (removed)
- Remove callbacks, listeners, detach from other frameworks, etc.

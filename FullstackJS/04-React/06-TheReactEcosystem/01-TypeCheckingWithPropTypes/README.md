# Type Checking With PropTypes

> Typescript is probably better...

## `prop-types`

- Made by Facebook (Meta?)
- Same creator as React
- Used to be part of React itself, but was separated
  - So that other apps may also use it?

> With `prop-types`, type checking appears at _runtime_
>
> i.e. you cannot see errors on the editor, only on the browser console (as logs/warnings/errors)
>
> ---
>
> With Typescript, type checking appears at compile time, while coding
>
> Though nothing appears on run time (when set to compile despite errors)

```sh
npm i -D prop-types
```

```jsx
import { bool as PTBool, string as PTString } from "prop-types";

function Header({ text, showLinks = false }) {
  return (
    <header>
      {showLinks && (
        <nav>
          <a href="https://vitejs.dev">Vite</a>
          <a href="https://react.dev">React</a>
        </nav>
      )}
      <h1>{text}</h1>
    </header>
  );
}

Header.propTypes = {
  text: PTString.isRequired,
  showLinks: PTBool,
};
```

- Import types from `'prop-types'`
  - Can import whole object `import PropTypes from 'prop-types'`
  - Or import individual types, and optionally rename them to minimize chance of name conflicts
- Define `.propTypes` property of component as an object
  - Keys are prop names
  - Values are imported prop types
- Prop types are optional by default
  - Use `.isRequired` property of types to mark prop as required

# Passing Data Between Components

> Props! (Properties)

- Kind of like function parameters
- Indicates what data is expected by a component
- Unidirectional; props pass down from top to bottom
  - Components "cannot" give data back to whoever use them

## Syntax

```jsx
function Component(props) {
  props.prop1; // 1
  props.prop2; // "Hello"
  props.prop3; // false

  return <></>;
}

<Component prop1={1} prop2={"Hello"} prop3={false} />;
```

Functional components only receive a **single argument**: an object that holds all the properties passed to it

- Conventionally this is called `props`

### Destructuring

`props` is a regular JS object. A common pattern is to destructure it immediately to get access to the provided properties.

> [Destructuring is a JS feature!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) Not exclusive to React or JSX. It can be used in regular JS, i.e. outside of components

- Destructured inline

  ```jsx
  function Component({ prop1, prop2, prop3 }) {
    prop1; // 1
    prop2; // "Hello"
    prop3; // false

    return <></>;
  }

  <Component prop1={1} prop2={"Hello"} prop3={false} />;
  ```

- Destructured just after. Useful for maintaining access to the props container object

  ```jsx
  function Component(props) {
    const { prop1, prop2, prop3 } = props;
    prop1; // 1
    prop2; // "Hello"
    prop3; // false

    return <></>;
  }

  <Component prop1={1} prop2={"Hello"} prop3={false} />;
  ```

### Default values

- Can make use of nullish coalescing `??`, as missing object properties default to `undefined`

  ```jsx
  function Component(props) {
    props.prop1 ?? 1; // 1
    props.prop2 ?? "Hello"; // "Hello"
    props.prop3 ?? false; // false

    return <></>;
  }

  <Component />;
  ```

- Destructuring allows default values to be written nicely. Missing properties are still `undefined`

  ```jsx
  function Component({ prop0, prop1 = 1, prop2 = "Hello", prop3 = false }) {
    prop0; // undefined // Not provided and has no default value
    prop1; // 1
    prop2; // "Hello"
    prop3; // false

    return <></>;
  }

  <Component />;
  ```

  > Also a JS feature! Not exclusive to React or JSX.

#### ~~`.defaultProps`~~

> This seems to be a legacy feature, closely associated with [classical components](https://react.dev/reference/react/Component#static-defaultprops). Not recommended.

```jsx
function Component(props) {
  props.prop1; // 1
  props.prop2; // "Hello"
  props.prop3; // false

  return <></>;
}

Component.defaultProps = {
  prop1: 1,
  prop2: "Hello",
  prop3: false,
}

<Component />;
```

## Functions as props

Functions can be passed to components as props, much like how functions can be given as argument to functions (callbacks)

This is one way of allowing components to perform something on whereever they were created, by way of _closures_.

```jsx
function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Click me!
    </button>
  );
}

function App() {
  let isClicked = false;
  function click() {
    isClicked = true;
  }

  return (
    <main>
      <Button onClick={() => console.log("Hello, world!")} />
      <Button onClick={() => alert("Alive and enthusiastic!")} />
      <Button onClick={click} />
    </main>
  );
}
```

- Function expressions can be passed by name
- Short snippets are commonly passed as inline arrow functions

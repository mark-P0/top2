# How To Deal With Side Effects

> `useEffect()`!

[Must read when you think you need an effect](https://react.dev/learn/you-might-not-need-an-effect)

General rule: Effects are for synchronizing with external systems (outside React), e.g.

- APIs
- Databases
- Subsystems within the same app (non-React)

## Syntax

```jsx
useEffect(effectFunction, dependencyArray);
```

- The effect is provided as a function
- A list of values can be provided, which signify what values does the effect use
  - The values provided should only be those that are controlled by React, e.g. _state_, _props_
  - The array itself can be omitted

## Forms

### No dependency array

> Effect runs after every render

```jsx
useEffect(() => {
  /* Do something */
});
```

- Lagely the same as not using `useEffect()` at all
- But if the calculations manipulate the element itself, then wrapping it in `useEffect()` might be necessary
  - Element dimensions, some properties are not available **before** render
  - `useEffect()` run effects **after** render

### Empty dependency array

> Effect runs **once**, after the initial render

```jsx
useEffect(() => {
  /* Do something */
}, []);
```

### Filled dependency array

> Effect runs after renders that change a dependency

```jsx
useEffect(() => {
  /* Do something */
}, [...dependencies]);
```

## Mimicking lifecycle methods

`useEffect()` can be used to run side effects during the component's lifecycle

### `componentDidMount()`

```jsx
useEffect(() => {
  // `componentDidMount()` logic
}, []);
```

- `useEffect()` runs after renders
- Empty dependency array means effect will only run once, after the initial render
- Running an effect after a single render is similar to a did-mount logic
  - The "single render" is likely the initial render, after mounting the component

### `componentDidUpdate()`

```jsx
useEffect(() => {
  // `componentDidUpdate()` logic
}, [...dependencies]);
```

- If anything in the dependency array changes, the effect will also run
- Running an effect because something changes is similar to a did-update logic

### `componentWillUnmount()`

```jsx
useEffect(() => {
  // `componentDidUpdate()` logic

  return () => {
    // `componentWillUnmount()` logic
  };
}, [...dependencies]);
```

- React allows `useEffect()` to return a function
- This is used internally by React before the component is destroyed, similar to a will-unmount logic

> Remember that re-renders destroy and rebuild a component, i.e. unmounts and remounts!

## Some unnecessary effects

### Derived values

```jsx
function ImproperComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fullName, setFullName] = useState(""); // ❌ Redundant state
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`); // ❌ Unnecessary effect because state is redundant
  }, [firstName, lastName]);

  return <></>;
}

function ProperComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`; // ✅ Derived

  return <></>;
}
```

### Event handling

```jsx
function ImproperComponent() {
  function handleEvent(event) {
    /* Do something */
  }

  // ❌ Event handling should be done via element properties
  useEffect(() => {
    const element = document.getElementById(id);

    element.addEventListener("change", handleEvent);
    return () => {
      element.removeEventListener("change", handleEvent);
    };
  });

  return <div></div>;
}

function ProperComponent() {
  function handleEvent(event) {
    /* Do something */
  }

  return <div onChange={handleEvent}></div>; // ✅ Pass handlers directly
}
```

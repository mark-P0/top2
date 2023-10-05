# More On State

## State rules

### Do not mutate state values

- Primitives are immutable so this is not really applicable to them
  - Just set them with the setter function e.g. `setState()`
- Objects, i.e. values that are passed by reference, are mutable
  - **Everything in JS is an object!**
  - e.g. Object literals `{}`, arrays `[]`, class instances, etc.

```jsx
function InvalidStateSetting() {
  const [data, setData] = useState({ name: "some name" });

  function doSomething() {
    // ❌ Will not work; re-render triggered only through state setter
    data.name = "another name";
  }

  const { name } = data;
  return <button onClick={doSomething}>{name}</button>;
}

function ValidStateSetting() {
  const [data, setData] = useState({ name: "some name" });

  function doSomething() {
    // ✅ Will work; mutable states, e.g. objects, should be rebuilt altogether
    setData({ name: "another name" });
  }

  const { name } = data;
  return <button onClick={doSomething}>{name}</button>;
}
```

> When using object states, keep them as shallow as possible, to keep rebuilding them simple.
>
> Deeply nested objects can be used, but rebuilding them gets tricky fast.
>
> React endorses [`immer`](https://immerjs.github.io/immer/) for managing nested states

### Do not create state from values that can be derived from other state, props, or values

#### Derived from states

```jsx
function ImproperGreeting() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  function update(newFirstName, newLastName) {
    setFirstName(newFirstName);
    setLastName(newLastName);
    setFullName(newFirstName + newLastName); // ❌ Redundant
  }

  return <></>;
}

function ProperGreeting() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = `${firstName} ${lastName}`; // ✅ Derived from existing states

  function update(newFirstName, newLastName) {
    setFirstName(newFirstName);
    setLastName(newLastName);
  }

  return <></>;
}
```

#### Derived from props

```jsx
function ImproperGreeting({ firstName, lastName }) {
  // ❌ When props change, they won't be reflected!
  const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

  return <></>;
}

function ProperGreeting({ firstName, lastName }) {
  // ✅ Reflects prop changes
  const fullName = `${firstName} ${lastName}`;

  return <></>;
}
```

### State updates are not instantaneous

```jsx
function ImproperCounter() {
  const [ct, setCt] = useState(0);

  function increment() {
    // Will display 1 after the first click
    // These all use the same `ct` value, so their results are the same
    setCt(ct + 1); // → setCt(0 + 1) → setCt(1)
    setCt(ct + 1); // → setCt(0 + 1) → setCt(1)
    setCt(ct + 1); // → setCt(0 + 1) → setCt(1)
  }

  return <button onClick={increment}>{ct}</button>;
}
```

#### State updater functions

```jsx
function ProperCounter() {
  const [ct, setCt] = useState(0);

  function increment() {
    // Will display 3 after the first click
    setCt((ct) => ct + 1);
    setCt((ct) => ct + 1);
    setCt((ct) => ct + 1);
  }

  return <button onClick={increment}>{ct}</button>;
}
```

To ensure that each state setter uses the most recent state values, an **updater function** may be given instead of a bare value.

Each updater function receives a single argument: the most recent state value

### Do not update state immediately

- Results in an infinite loop
- May prevent rendering altogether as a quick fix

```jsx
function CrashingComponent() {
  const [state, setState] = useState(initial);

  setState(another); // ❌ Infinite loop!

  return <></>;
}

function ProperComponent() {
  const [state, setState] = useState(initial);

  // ✅ Call upon other triggers, e.g. user clicks
  function callback() {
    setState(another);
  }

  return <></>;
}
```

- State setter triggers a re-render
- Re-renders re-run the whole component function
- State setter is ran again, triggering another re-render
- Re-render executes component function again, running another state setter
- And so on...

### State setter calls are batched

- Consecutive state setters are ran at the same time, just before a re-render
- Because of this, they only cause 1 re-render, contrary to initial expectations

```jsx
function ClickMe() {
  const [state, setState] = useState();

  // Logs once on initial render
  // Logs once on button click
  console.log("render");

  function update() {
    // Intuition says this will cause 3 re-renders,
    // but only 1 re-render is performed, because they are batched
    setState({});
    setState({});
    setState({});
  }

  return <button onClick={update}></button>;
}
```

### State should be the "single source of truth"

- Native HTML elements maintain their own state, e.g. `HTMLInputElement`
- In React, it is best to control this in a component state instead

```jsx
function Input() {
  const [value, setValue] = useState("");

  // On every update to the element's state,
  // reflect it immediately in the component state
  function onChange(event) {
    setValue(event.target.value);
  }

  return <input type="text" value={value} onChange={onChange} />;
}
```

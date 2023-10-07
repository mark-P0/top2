# Rendering Techniques

## List / Collection / Sequence

```jsx
function TodoList({ items }) {
  return (
    <ol>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  );
}
```

- Assign `key` attribute
  - Preferably use a unique identifier for each item
  - But if nothing is appropriate, index may be enough

## Conditional rendering

### Ternary

- Or a simple `if`/`else` statement
- Selects between components or elements based on a conditional expression

> `switch` cases could also work. It's just like regular JS!

```jsx
function TodoApp({ isAddingNew }) {
  return <main>{isAddingNew ? <NewTodoForm /> : <TodoList />}</main>;
}
```

### `&&` shorthand

Possible because [React _ignores_ (does not render) values like booleans, `null`, and `undefined`.](https://react.dev/learn/conditional-rendering#logical-and-operator-)

```jsx
function TodoItem({ title, description, isEditable }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      {isEditable && <button>Edit todo</button>}
    </article>
  );
}
```

#### Falsy values

> When using the `&&` shorthand, ensure that the lefthand expression is a **boolean** or **nullish** value

- Only booleans (`true`, `false`) and nullish (`null`, `undefined`) values are "ignored" by React
- _Falsy_ values still render, e.g. `0`, `''`, which might be **unexpected**!

### Early returns

Useful when indicating a loading or initializing state

```jsx
function TodoList({ items }) {
  if (items.length === 0) {
    return <p>There is nothing here yet</p>;
  }

  return (
    <ol>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ol>
  );
}
```

### Note on variables

- JSX can be assigned to variables
- But unless they are used by React, **they are not yet rendered**

```jsx
function Parent() {
  const child = <Child />;

  if (someCondition) {
    return <></>;
  }
  return child;
}

function Child() {
  // ❗ Will not log until <Child /> is used by Parent
  // (and <Parent /> is rendered by React)
  // or until <Child /> is used directly
  console.log("Child is rendered");

  return <></>;
}
```

- `const child = <Child />;` does not yet actually render `<Child />`
- If `someCondition` is true, it is not used at all
- If false, only then will it be rendered, as part of the return of `<Parent />`
  - Assuming `<Parent />` is also rendered!

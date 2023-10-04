# Keys In React

- React uses keys to know which item in a sequence has changed
- An item has changed if the key of an item to be rendered on a particular location is different from the key of the item that is currently there
- Unchanged items are skipped in the re-rendering process
- Basically an optimization technique

## Ideal keys

### ✅ Database IDs

If your data comes from an external database, it likely already has an associated unique ID. Use that.

```jsx
/**
 * Assuming todos have the following structure:
 * [
 *   {id: '', title: '', description: ''},
 *   {id: '', title: '', description: ''},
 *   {id: '', title: '', description: ''},
 * ]
 */
const todos = retrieveTodos();

function TodoList() {
  return (
    <ol>
      {todos.map(({ id, title, description }) => (
        <li key={id}>
          {title}: {description}
        </li>
      ))}
    </ol>
  );
}
```

### ✅ Assigned IDs on retrieval / creation

If your data does not have an accessible ID, you can create one upon retrieval or creation.

```jsx
/**
 * Assuming todos have the following structure:
 * [
 *   {title: '', description: ''},
 *   {title: '', description: ''},
 *   {title: '', description: ''},
 * ]
 */
const todos = Object.fromEntries(
  retrieveTodos().map((todo) => [generateId(), todo])
);

const todos = function TodoList() {
  return (
    <ol>
      {Object.entries(todos).map(([id, { title, description }]) => (
        <li key={id}>
          {title}: {description}
        </li>
      ))}
    </ol>
  );
};
```

## Problematic keys

### ⚠ Index keys

If the list of items do not change, index keys can be used.

However, if they do (which is often the case), indices should not be used as keys

- Indices are always on the same place
- Associated elements may not get re-rendered, even when they should, e.g. when the list shifts around, reordered, etc.

### ~~❌ Random keys~~

Do NOT assign random keys dynamically. It makes them useless for optimization, since they are always new.

Assign an ID upon retrieval, as in above.

```jsx
const todos = retrieveTodos();

function TodoList() {
  return (
    <ol>
      {todos.map(({ title, description }) => (
        <li key={generateId()}>
          {title}: {description}
        </li>
      ))}
    </ol>
  );
}
```

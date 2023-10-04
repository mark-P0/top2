# What Is JSX?

Syntactic sugar / Abstraction over `React.createElement()`

## Rules

### Has a single root element

```jsx
function ValidComponent() {
  return (
    // <ul> is root
    <ul>
      <li>item-1</li>
      <li>item-2</li>
      <li>item-3</li>
    </ul>
  );
}

function InvalidComponent() {
  return (
    <li>item-1</li>
    <li>item-2</li>
    <li>item-3</li>
  );
}
```

#### Fragments, for multiple elements

- Can return multiple elements by wrapping them in a _fragment_ `<></>`
- Can be thought of as an "invisible" element

```jsx
function FragmentComponent() {
  return (
    <>
      <li>item-1</li>
      <li>item-2</li>
      <li>item-3</li>
    </>
  );
}

const list = (
  <li>
    <FragmentComponent />
  </li>
);
```

### Tag closing is required

<!-- prettier-ignore -->
```html
<!-- Valid HTML but not JSX -->
<input type="text">
```

```jsx
//               Must be present ↓
const input = <input type="text" />;
```

### `camelCase` attributes

Dashed attributes must be referred to in camel case in JSX, e.g. `stroke-width` to `strokeWidth`

- HTML:
  <!-- prettier-ignore -->
  ```html
  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
    <path stroke-linecap="round" stroke-linejoin="round" d="..." />
  </svg>
  ```

- JSX:
  <!-- prettier-ignore -->
  ```jsx
  const svg = <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="..." />
  </svg>
  ```

#### `class` vs `className`

Some reserved names are referred to using a different name, particularly `class` as `className` instead

> Other libraries allow using `class` as is though, e.g. [Solid](https://docs.solidjs.com/guides/how-to-guides/styling-in-solid)

### _Additional_: JSX is NOT confined to components!

JSX can be assigned to variables, conditionals, etc. like regular JS values

```jsx
function Input() {
  return <input type="text" />;
}

const input = <input type="text" />;

let isLoading = true;
const content = isLoading ? (
  <svg className="animate-spin">...</svg>
) : (
  <p>Content has loaded</p>
);
```

## Sample conversion

- HTML
  <!-- prettier-ignore -->
  ```html
  <h1>Test title</h1>
  <ol class="test-list">
    <li>List item 1
    <li>List item 2
    <li>List item 3
  </ol>
  <svg >
    <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
  </svg>
  <form><input type="text"></form>
  ```

- JSX
  ```jsx
  <>
    <h1>Test title</h1>
    <ol className="test-list">
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ol>
    <svg>
      <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
    </svg>
    <form>
      <input type="text" />
    </form>
  </>
  ```

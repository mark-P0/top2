# React Components

> Previous course first endorsed **class components**
>
> Modern approach are now **functional components**

---

| Component        | HTML | CSS | JS  |
| :--------------- | :--: | :-: | :-: |
| `App`            |      |     |     |
| `NavBar`         |      |     |     |
| `MainArticle`    |      |     |     |
| `NewsletterForm` |      |     |     |

- Traditional (vanilla) approach is **column-wise**
  - Create individual `.html`, `.css`, and `.js` files
  - Link related components together _manually_, e.g. with `document.querySelector()`
- React (and similar libraries) allow for a **row-wise** approach
  - Files are in a per-component basis
  - Related markup, styles, and logic are close to each other

## Syntax

```jsx
function Greeting() {
  return <p>Hello, world!</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Greeting />
  </React.StrictMode>
);
```

- React components are **functions**
  - Previously classes as well
- Component / Function names are capitalized, in [`PascalCase`](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats>)
- Returns [**JSX**](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>) (JS Syntax Extension | JS XML)
  - Allows writing of HTML-like markup inside what otherwise would be regular JS files
- Used as if they are regular HTML elements
  - Can be self-closing, e.g. `<Greeting />`
  - Can be regular, e.g. `<Greeting></Greeting>`
- Other things can happen inside AND outside the function too! i.e. regular JS

# Handle Inputs and Render Lists

> Did the assignment using Vite... teehee

## Notes

### `.render()` will execute twice

https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice

### Renaming tags/elements triggers the `JSX.IntrinsicElements` error

https://stackoverflow.com/questions/47694227/typescript-error-ts2339-property-span-does-not-exist-on-type-jsx-intrinsice

### ~~Switching between buttons, `.preventDefault()`~~

~~Somehow clicking one button triggers the other button when switching states?~~

#### Components of the same "tag" at the same position are considered the same!

> Differentiate them with the `key` attribute

- https://reactjs.org/docs/reconciliation.html
- https://beta.reactjs.org/learn/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state
- https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key

### Refs

> - https://reactjs.org/docs/forms.html
> - https://reactjs.org/docs/uncontrolled-components.html

- Accessing elements directly can be a pain
  - For listening to value changes, the `on<Property>` attributes should be used
- Alternatively, a direct `ref` can be used
  - They say this is bad practice, but it seems good?
  - Listening on EVERY change seems worse?

### Public Class Fields

https://dev.to/guin/learn-public-class-field-syntax-by-refactoring-a-react-component-njh

- Neater way of defining callbacks
- **TRADE-OFF: Writes a unique callback for every instance!**
  - The alternative, `.bind()`, also creates a new function everytime...
- **DO NOT BIND IN `.render()`???**
  - Components are re-rendered whenever state changes
  - If binding is done in render, new functions are created everytime, when other approaches exist

#### Write _instance methods_ as _instance fields_ pointing to an anonymous function

https://frontarm.com/james-k-nelson/when-to-use-arrow-functions/

```jsx
/* Instead of this... */
class MyComponent extends React.Component {
  myMethod() {
    /*  */
  }
}

/* ...do this. */
class MyComponent extends React.Component {
  myMethod = () => {
    /*  */
  };
}
```

Why?

- tl;dr - simplifies `this` bindings
- The first approach demands manual binding of `this` when used as callback
- The second approach can be used as is, e.g. `onClick={this.myMethod}`

Gotcha

- **Instance fields are generated at instantiation**
- Each component instance will generate their own "method" this way, instead of relying on the prototype
  - This could generate an unnecessary amount of functions...

> Functional components might not have this issue altogether...

### Styling

- Use CSS Modules pattern
  ```js
  import styles from '<>.modules.css';
  ```
- Google Fonts WOFF can be generated via https://gwfh.mranftl.com/

## Knowledge Check

- How do you render lists in React?

  - Use a list element as component root, i.e. `<ul>` or `<ol>`
  - Either add the `<li>` elements explicitly
  - Or map over a data array and generate the `<li>` elements accordingly
    - Use the array of JSX elements directly within the body of the list
    - Spreading the JSX array should be remembered as bad practice
    - Add a unique `key` attribute in each `<li>` for performance purposes (good practice)

- How do you handle input field changes in React?

  - Either listen for all changes via the `onChange` attribute
  - Or add a [`ref`](https://reactjs.org/docs/uncontrolled-components.html) to the element
    - Then access a "final" value when needed

- How do you handle form submission in React?

  - Use the `onSubmit` attributes of forms
  - Associate a `"submit"` button to the forms for best practice
    - Note the _swapping-buttons-via-state_ gotcha...

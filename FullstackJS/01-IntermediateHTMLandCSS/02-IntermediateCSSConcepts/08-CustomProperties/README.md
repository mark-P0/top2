# Custom Properties

> aka CSS **variables**

## Syntax

```css
selector {
  --my-property: 1rem;
}
```

- Prefix with two (2) hyphens `--`
- Use desired variable name as the property name
- Treat as if a regular CSS rule
- Separate words with a hyphen `-`; space would not work
  - Like ID and class names

## Usage

```css
selector {
  --my-property: 1rem;

  font-size: var(--my-property);
}
```

- Use the `var()` function
- Pass in the variable name as argument
- Will evaluate to the set value of that variable

### Fallback

```css
selector {
  --my-property: 1rem;

  padding: var(--undeclared-variable, 2rem);
  padding: var(--undeclared-variable, var(--my-property));
}
```

- `var()` accepts two (2) arguments
  - The variable to be used
  - And if that is non-existent, a fallback value
- Fallback value can also be the result of another `var()`

## Scope

- Variables are only available to...
  - The element on which the style of the variable definition was applied
  - Descendants of that element
- Similar to block scoping in JavaScript

### `:root` variables

- The `:root` pseudo-class refers to the topmost element in the HTML
- Variables defined in this selector will be available in **ALL** other selectors
- Think **global variables**

## Knowledge Check

- How would you declare a custom property with a name of `text-color`?

  - `--text-color: /* insert value here */`

- How would you access a custom property with a name of `background-color`?

  - `/* property name */: var(--background-color)`

- Where would you declare a custom property to have its scope be global and accessible by all other selectors?

  - On the `:root` pseudo-class

- Where would you declare a custom property so that a user’s theme setting from their OS or browser was taken into account?

  - Inside a **media query**

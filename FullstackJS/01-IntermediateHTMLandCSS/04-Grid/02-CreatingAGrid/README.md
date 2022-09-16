# Creating a Grid

> Primarily column-first

## Explicit

```css
#grid-container {
  display: grid;

  grid-template-columns: 2rem 4rem 8rem;
  grid-template-rows: 3rem 9rem 27rem;

  /* Shorthand */
  grid-template: 3rem 9rem 27rem / 2rem 4rem 8rem;
}
```

### `grid-template-columns`

- Specify the sizes of the first few columns

### `grid-template-rows`

- Specify the sizes of the first few rows

### `grid-template`

- Shorthand for the above properties

## Implicit

### `grid-auto-columns`

- Specify the sizes of the new columns after those set by `grid-template-columns`

### `grid-auto-rows`

- Specify the sizes of the new rows after those set by `grid-template-rows`

### `grid-auto-flow`

- Specify how the grid items flow
  - Not quite accurate
- Determines the axis new _implicit_ grid items will be added
- The opposite of this will be how the _explicit_ grid items will flow
  - e.g. if `grid-auto-flow: row;`, grid items will populate columns, and will create new rows on overflow
  - Think `flex-direction` with `flex-wrap`, i.e. `flex-flow`

### Workflow

#### Constrain _columns_ and let rows populate automatically

<!-- prettier-ignore -->
```css
#grid-container {
  display: grid;
  grid-auto-flow: row;                    /* Unnecessary; default value */
  grid-template-columns: 2rem 4rem 8rem;  /* Constrain columns */
  grid-auto-rows: 3rem 9rem 27rem;        /* Rows are added implicitly if no template is set */
}
```

#### Constrain _rows_ and let columns populate automatically

<!-- prettier-ignore -->
```css
#grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 2rem 4rem 8rem;  /* Constrain rows */
  grid-auto-columns: 3rem 9rem 27rem;  /* Columns are added implicitly if no template is set */
}
```

## `gap`

> Already familiar from flexbox!

```css
#container {
  display: ...;

  /* Single value */
  gap: 1rem;

  /* Multiple values */
  row-gap: 1rem;
  column-gap: 2rem;
  /* gap: 1rem 2rem; */ /* Shorthand */
}
```

### `column-gap`

- Gap between columns

### `row-gap`

- Gap between rows

## Knowledge Check

- How does an HTML element become a grid item?

  - By setting its parent with `display: grid;`

- What is the space between lines on the grid?

  - A grid track

- How do you set gutters (also known as alleys) in the grid?

  - `gap: <gutter-size>`;

- Describe what happens when you have more content than defined tracks.

  - They are still added on the grid
  - They are added on a new track as defined by `grid-auto-flow`

- How could you change the size for those undefined tracks?

  - Their sizes are defined by their corresponding `grid-auto-____` properties

# Advanced Grid Properties

## `repeat()` function

- Useful when repeating values
- Can set multiple explicit grid columns/rows of the same sizes, e.g.
  ```css
  #grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 100px);
  }
  ```

## `fr` unit

- Allows a grid track to occupy a _fraction_ of the total length
- **Automatically accounts for gaps**
- Exclusive(?) to grid containers
- Think `flex-grow`
- Alternative to the formula
  ```
  (100% - (gap-size * (col-ct - 1))) / col-ct
  Equivalent is: repeat(col-ct, 1fr)
  ```
  - This _manually_ accounts for gaps
  - `fr` eases this

## Minimum and Maximum Sizes

### `min-content`

- No limit to grid expansion
- Smallest dimension dependent on the grid items
  - Can be referenced with the `min-content` keyword

### `min()`

- For setting a _maximum_ length for a track

### `max()`

- For setting a _minimum_ length for a track

### `minmax()`

- Very reminiscent of `clamp()`
- Does not take an "ideal" size
- Only works within a grid context

### `clamp()`

- Takes in an ideal size
- Works even outside of a grid context

### `auto-fit`

- Used in `repeat()` as "track count" value
- Used in conjunction with `minmax()`
- Returns thew highest possible integer without overflowing the grid
- Will fit only the available grid items as the grid expands
  - Maximizes the space

### `auto-fill`

- Used in `repeat()` as "track count" value
- Used in conjunction with `minmax()`
- Will fill in "imaginary" grid items as the grid expands

## Knowledge Check

- How do you create several grid tracks of the same size without manually typing each one out?

  - `repeat(track-ct, track-size)`

- What is the difference between a static and dynamic size value?

  - Static is absolute, e.g. `px`
  - Dynamic is relative, e.g. `rem` `fr`

- How can you assign a grid track a flexible value that changes depending on the remaining space available in the grid?

  - By assigning the size as a fractional value `fr`
  - e.g. `repeat(track-ct, 1fr)`

- How can you assign grid tracks an uneven distribution of the remaining space in a grid?

  - By specifying a ratio with `fr`
  - e.g. `2fr 3fr 1fr`

- Which CSS functions will return the smallest or largest value supplied to them?

  - `minmax()`
  - `clamp()`

- Which CSS Grid-only function allows you to supply a minimum and maximum track size that is calculated in realtime?

  - `minmax()`

- Which global CSS function allows you to supply a minimum, ideal, and maximum value that is calculated in realtime?

  - `clamp()`

- What attribute of `repeat()` can be used to fill in as many grid tracks as possible, given certain constraints?

  - `auto-fill`
  - Will fill in "imaginary" tracks if a track can be created on the remaining space and no more grid items are left

- What is the difference between `auto-fit` and `auto-fill`?

  - `auto-fit` fits the available grid items as much as possible into the grid
  - `auto-fill` fills the grid as much as possible irrespective of whether there are actual grid items on the tracks

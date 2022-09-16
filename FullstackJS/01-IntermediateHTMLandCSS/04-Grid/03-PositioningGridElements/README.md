# Positioning Grid Elements

## Tracks

- Defined with the grid _template_ properties
  - Templates _explicit_ tracks
  - `grid-template`
  - `grid-template-columns`
  - `grid-template-rows`

### `repeat()` function

- Useful when repeating values
- Can set multiple explicit grid columns/rows of the same sizes, e.g.
  ```css
  #grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 100px);
  }
  ```

### `fr` unit

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

## Lines

- Track enclosures
- Tracks are between lines

## Cells

- Smallest unit of measurement
- Think table cells

## Positioning

- Specifies the grid lines on which a cell will start
- Set on the grid items
- Think `flex` shorthand
  - `flex-grow`
  - `flex-shrink`
  - `flex-basis`

### `grid-column`

#### `grid-column-start`

#### `grid-column-end`

### `grid-row`

#### `grid-row-start`

#### `grid-row-end`

## `grid-area`

- Shorthand for the above positioning properties
  - `grid-area: <row-start> / <column-start> / <row-end> / <column-end>;`
- Can also be set to a "label" which will be used by the `grid-template-areas` property of the grid container

```css
.container {
  grid-template-areas:
    'living-room  living-room  living-room  living-room  living-room'
    'living-room  living-room  living-room  living-room  living-room'
    'bedroom      bedroom      bathroom     kitchen      kitchen    '
    'bedroom      bedroom      bathroom     kitchen      kitchen    '
    'closet       closet       bathroom     kitchen      kitchen    ';
}

#living-room {
  grid-area: living-room;
}

#kitchen {
  grid-area: kitchen;
}

#bedroom {
  grid-area: bedroom;
}

#bathroom {
  grid-area: bathroom;
}

#closet {
  grid-area: closet;
}
```

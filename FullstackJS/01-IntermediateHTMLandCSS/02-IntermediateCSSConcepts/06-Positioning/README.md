# Positioning

## `position: static;`

- Default position
- Just flow normally
- Usually explicitly set only when overriding other `position` rules

## `position: relative;`

- Relative to _itself_
- Mostly the same as `static`, with few additions

### Additions over `static`

#### Offset `top` `bottom` `left` `right` support

- e.g. if `top: 10px;` is set, it will move this element _down_ by `10px`
- Like adding a margin/padding to the top
- These are not available for `static`-position elements

#### `z-index` support

- Think _layering_ of elements on top/bottom of each other

#### Scoping for `absolute`-position children

- Elements with `position: absolute;` are positioned _relatively_ from their parent that has either `absolute` or `relative` positions

## `position: absolute;`

- Exact, manual position within the page, or a **parent element**
  - Containing parent must have `absolute` or `relative` position
  - If not, will default to the topmost `<html>` element, or the page itself
- Use `top` `bottom` `left` `right` for positioning
- Can be scrolled past from view
  - Position is absolute in the webpage
  - Which may or may not be in the viewport

## `position: fixed;`

- Exact, manual position within the **viewport**
  - Viewport is the that can be seen by the user
  - Thus, these elements are **always in view**
- Use `top` `bottom` `left` `right` for positioning
- Can NOT be scrolled past from view
  - Will always be in the viewport

## `position: sticky;`

- While still has not scrolled to, or is currently in view, acts like a `static`-position element
- After scrolling past its position, will _stick_ to the **top of the viewport**
  - Act like `fixed` to the top of the viewport
- Will stop sticking when its parent element is completely scrolled past
  - Act like `static` again
- Useful for...
  - Section headings
  - Navigation bars
    - `<body>` will always be visible

## Knowledge Check

- What is the difference between static and relative positioning?

  - Effects of `top` `bottom` `left` `right` for positioning

- What is absolute positioning useful for?

  - Useful for exact placement of an element

- What is the difference between fixed and sticky positioning?

  - `fixed`-position elements will always stay in view (viewport)
  - `sticky`-position elements will be `fixed` to the top of the view until its parent is scrolled past from view
    - Otherwise, it will be `static`

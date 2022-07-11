# The Box Model

- [x] ~~Fonts and colors~~
  - CSS Foundations
- [ ] Positioning and layout
  - Box Model
  - CSS display modes

## The Box Model

- Everything is a box in a webpage
- Manipulate the **sizes** of the boxes
- Manipulate the **spacings** between these boxes

## Spacings

`padding`

- Space between the box and the content
- Internal

`margin`

- Space between the box and other boxes
- External

`border`

- Space between the padding and margin
- Outline

## Assignments

### [Learn CSS Box Model In 8 Minutes](https://www.youtube.com/watch?v=rIO5326FgPE)

Margins between elements "collapses"

- If an element has a margin of `70px` and its adjacent element has `60px`, the size of the margin between them will be `70px` only (not 70 + 60)
- The largest margin takes precedence
- **NOTE:** Only vertical margins collapse!

`box-sizing: border-box`

- Automatically adjusts the effective size of the element content
- Deducts the padding and border sizes of an element from its height and width
- Whatever remains is the effective size of the content
- Makes styling easier

### [The box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)

Outer display types

- `block`
  - Vertical
  - Top to bottom
- `inline`
  - Horizontal
  - Left to right
- `inline-block`
  - Both horizontal and vertical

Inner display types

- `flex`
- `grid`

Negative margins

- Can be used to _stack_ elements on each other
- i.e. _overlapping_

### [CSS Almanac → Properties → M → margin](https://css-tricks.com/almanac/properties/m/margin/)

`margin` shorthand

- 4 values: `margin: top right bottom left`
- 3 values: `margin: top right-left bottom`
- 2 values: `margin: top-bottom right-left`, i.e. vertical & horizontal
- 1 value: `margin: top-right-bottom-left`, i.e. all sides

`margin: 0 auto;` and _horizontal_ centering

- `auto` can be used as `margin` value to center an element horizontally
- It needs to have an explicit width
- `auto` will be equivalent to half the remaining space of the webview after deducting the element's width, effectively centering it
  ```css
  .container {
    width: 980px;
    margin: 0 auto;
  }
  ```
- If no `width` is set, `auto` will be equal to `0`
- Does NOT work for vertical centering

Collapsing margins

- Only **vertical** margins collapse
- Horizontal margins do not collapse

## Knowledge Check

- From inside to outside, what is the order of box-model properties?
  - Padding, Border, Margin
- What does the `box-sizing` CSS property do?
  - Switch between the **standard** and **alternative** box model types
- What is the difference between the standard and alternative box model?
  - **Standard**. `width` and `height` refers to the size of the element content
  - **Alternative**. `width` and `height` refers to the size of the element content, padding, and border.
    - In other words, the border and padding sizes will be deducted from the `width` and `height`, and the remaining will be the size of the content
    - Does not include margin in the computation.
- Would you use `margin` or `padding` to create more space between 2 elements?
  - `margin`
  - "space between two elements" is space **outside** of the elements
- Would you use `margin` or `padding` to create more space between the contents of an element and its border?
  - `padding`
  - "space between content and border` is internal space
- Would you use `margin` or `padding` if you wanted two elements to overlap each other?
  - `margin`
  - Overlapping requires setting a negative value
  - Only `margin` can be set as negative
  - Relationship/Interaction between different elements === External spacing === Margins

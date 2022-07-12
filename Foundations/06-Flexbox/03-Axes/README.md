# Axes

## `flex-direction`

- Default to `row` | horizontal | x-axis
  - Can also be considered as _inline_ in CSS terms
  - Flexibility (automatic growth) can be more easily achieved width-wise
  - Anything width-related is easier to achieve than height in CSS

| `flex-direction`  |       `row`        |     `column`      |
| :---------------: | :----------------: | :---------------: |
|     Direction     |   Left to right    |   Top to bottom   |
|       Plane       |     Horizontal     |     Vertical      |
|       Axis        |       x-axis       |      y-axis       |
|     Parallels     | `display: inline;` | `display: block;` |
| `flex-basis` base |      `width`       |     `height`      |

### Elements with empty `height`

- Some elements, e.g. `<div>` do not have a default height
- In a flexbox div-of-divs with `flex-direction: column;`...
  - If flex items have `flex: 1;`
    - Will not respect heights of flex items
      - They would "collapse" on each other, as they are working from a 0 height
      - Set by the shorthand overriding default `flex-basis` value
      - Also by divs not having a default height
    - Needs to set a height on the flex container itself
  - If flex items have `flex: auto;`
    - Heights of flex items will be respected, if present
      - `flex-basis` default will remain
    - No need for flex container to have a set height
      - Container will automatically adjust with the flex items sizes
- This is another example of why `width` is easier to work with than `height`

## Knowledge Check

- How do you make flex items arrange themselves vertically instead of horizontally?
  - On the **flex container**...
  - set the CSS flexbox rule `flex-direction: column;`
- In a `column` flex-container, what does `flex-basis` refer to?
  - `height`
- In a `row` flex-container, what does `flex-basis` refer to?
  - `width`
- Why do the previous two questions have different answers?
  - `flex-basis` will "base" on a different dimension, depending on the direction of the flexbox
  - Flexbox uses two (2) different axes

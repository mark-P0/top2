# Growing and Shrinking

## The `flex` shorthand

### `flex: <grow> <shrink> <basis>;`

- Kind of similar to `margin` and `padding` shorthands
- Default is `flex: 0 1 0%;`
- Commonly shortened to `flex: 1;`
  - Equialent to `flex: 1 1 0;`

### `flex-grow`

- _Growth factor_
- First value of the shorthand
- When all items of a flex container has `flex: 1;` or `flex-grow: 1;`, they will all grow with the same amount
  - Values more than 1 will increase the rate of growth
  - `flex-grow: 0;` will disable growth, or the _flexing_ of the element
- Think fractions
  - Given a flex container of `n` items...
  - Flex items will occupy `x/n` of the container's size, where `x` is the `flex-grow` factor

### `flex-shrink`

- _Shrink factor_
- Second value of the shorthand
- Applied when the total sizes of the flex items exceeds that of their container
- `flex-shrink: 1;`
  - Default value
  - Shrink proportionally as 1 part of the flex items
  - Values more than 1 will increase the rate of shrinking
- `flex-shrink: 0;`
  - **Disable** shrinking
  - Maintain size of flex item and let others shrink accordingly

### `flex-basis`

- Sets initial size of flex item
- Growth and shrinkage starts from this _base_ size
- Default value: `flex-basis: auto;`
  - **Respects** `width` declaration
- Shorthand `flex: 1;` changes the default to `flex-basis: 0;`
  - **Ignores** `width` declaration

### In practice...

Complex flex values are unlikely to be used, in favor [a combination] of the following:

- `flex: 1;`
  - Enable flexible growth of the item box
  - i.e. enable flexbox on flex item
- `flex-shrink: 0;`
  - Disable shrinking if desired
- `flex: auto;`
  - Seems like a more preferable shorthand than `flex: 1;`?
  - Respects `flex-basis` defaults
  - `flex-basis` itself is unlikely to be modified in actual use

## Shorthands to remember

| Shorthand     | Equivalent       | Remarks                       |
| :------------ | :--------------- | :---------------------------- |
| `flex: 1;`    | `flex: 1 1 0`    | Changes `flex-basis` default  |
| `flex: auto;` | `flex: 1 1 auto` | Respects `flex-basis` default |

<!--
| Shorthand  |          `flex: 1;`          |         `flex: auto;`         |
| :--------: | :--------------------------: | :---------------------------: |
| Equivalent |        `flex: 1 1 0;`        |       `flex: 1 1 auto;`       |
|  Remarks   | Changes `flex-basis` default | Respects `flex-basis` default |
 -->

<!--  -->

## Knowledge Check

- What are the 3 values defined in the shorthand `flex` property (e.g. `flex: 1 1 auto`)?
  - `flex-grow`, set to first `1` on the given
  - `flex-shrink`, set to second `1` on the given
  - `flex-basis`, set to `auto` on the given
  - Given can be shortend to `flex: auto;`

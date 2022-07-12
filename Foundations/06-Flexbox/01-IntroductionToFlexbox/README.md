# Introduction to Flexbox

## Most(?) important properties

`display: flex;`

- Enable Flexbox on element
- Layout element's children as _flexible_ boxes
- Directly tied with CSS' **Box** model

`flex: 1;`

- Enable Flexbox on an element of a flex container
- Set element as a _flexible_ box relative to its parent

## Concepts

- Flex containers
  - Elements with `display: flex;` CSS rule
- Flex items
  - Elements within flex containers
- Elements can both be _flex containers_ and _flex items_
  - Nesting allows for complex layouts

## Knowledge Check

- What’s the difference between a flex container and a flex item?

  - **Flex container**. With `display: flex;` rule
  - **Flex item**. Children of flex containers. Applied with `flex: 1;` rule

- How do you create a flex item?
  - Nest the element within a flex container
  - Add `flex: 1;` rule

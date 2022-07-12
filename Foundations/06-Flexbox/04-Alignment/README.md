# Alignment

## `align-items` and `justify-content`

- Properties of **flex containers**
- Aligns flex items along the flex axes
- Axes "perspective" changes based on `flex-direction`

| `flex-direction` | `align-items` | `justify-content` | _Notes_ |
| :--------------: | :-----------: | :---------------: | :-----: |
|      `row`       |   Vertical    |    Horizontal     | Default |
|     `column`     |  Horizontal   |     Vertical      | Swapped |

## `gap` property

- Property of **flex containers**
- New property, but well-supported by modern browsers
- Functions similarly with `justify-content: space-between;`
- However, the size of the spaces between is directly specified
- Also allows for center alignment within flex container while having gaps between flex items
  - Would need nested flexboxes for this if only used `align-items` and `justify-content`

## Knowledge Check

- What is the difference between `justify-content` and `align-items`?
  - `justify-content` aligns flex items on the main axis (_inline by default_)
  - `align-items` aligns flex items on the cross axis (_block by default_)
- How do you use flexbox to completely center a div inside a flex container?
  - By applying the following style rules on the flex container
  ```css
  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
- What’s the difference between `justify-content: space-between` and `justify-content: space-around`?
  - `space-between` only adds spaces **between** the flex items
    - Sides of the flex items will touch the edge of the flex container
  - `space-around` adds spaces **between** and to the **sides** of the first and last flex items
    - Sides of the flex items will be padded from the flex container

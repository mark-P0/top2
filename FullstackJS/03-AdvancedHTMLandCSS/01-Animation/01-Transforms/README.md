# Transforms

> I'm familiar with the `translateX` and `translateY` functions.

## Basics

- The `transform` property takes in **transform functions**
- _All_ elements can have a `transform` property, **except**:
  - `<col>`
  - `<colgroup>`
  - _Non-replaced inline elements_, e.g.
    - `<span>`
    - `<b>`
    - `<em>`

## Transform functions

### 2-dimensional

#### `rotate()`

- Like in a circle

#### `scale()`

- Resize

#### `skew()`

- Kind of slanted

#### `translate()`

> I am most familiar with this, for centering

- Move in a specified axis from the actual position
- Does not affect the surrounding elements

### Chaining

Transform functions can be chained in a single definition, e.g.

```css
selector {
  transform: function1() function2() function3;
}
```

However, the ordering matters, and produces different results

- If read from left to right, the element is transformed along with its axis
- If read from right to left, the element is transformed along its untransformed axis

### 3-dimensional

> The following can also be used as non-3D, i.e. the 2D functions above

#### `perspective()`

- Required for 3D effects
- Must be the leftmost transform, i.e. the first

#### `rotate3d()`

- Rotate along an axis
- Think 3D cube

#### `scale3d()`

- Resizing along an axis

#### `translate3d()`

- Movement along an axis
- Can move left, right, further away or towards the perspective

#### ~~`matrix3d()`~~

- **NOT RECOMMENDED**
- Use the above functions instead
- Provides a way to manually encode the desired functions above

## Benefits

- Occurs during **composition**
  - Does not require a lot of re-rendering content
  - In contrast with pure JS animations, which essentially re-renders the whole page
- Can be **GPU-accelerated** (hardware acceleration)
  - Smoother and more performant animations

## Knowledge Check

- What are the four main functions of the transform property?
  - `rotate()`
  - `scale()`
  - `skew()`
  - `translate()`
- Which function can be used to move an object through space on the X, Y, or Z axis?
  - `translate()`
- Which function can be used to make an object larger or smaller on the X, Y, or Z axis?
  - `scale()`
- What additional function is required for 3D transforms?
  - `perspective()`

# CSS Functions

- Reusable "pieces of code"
- Behavior can be changed with arguments
- **No custom functions in CSS**
  - All function instances are predefined / built-in

## [Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)

Commonly used as value for the `color` and `background-color` properties

### `rgb[a](r, g, b[, a])`

Numbers:

|     | Min | Max |
| :-: | :-: | :-: |
|  R  |  0  | 255 |
|  G  |  0  | 255 |
|  B  |  0  | 255 |
|  A  |  0  |  1  |

Percentages:

|     | Min | Max  |
| :-: | :-: | :--: |
|  R  | 0%  | 100% |
|  G  | 0%  | 100% |
|  B  | 0%  | 100% |
|  A  | 0%  | 100% |

<!-- cspell:disable -->

```css
rgb(255, 0, 123);
rgba(51, 170, 51, 0.1);
```

<!-- cspell:enable -->

### `hsl[a](h, s, l[, a])`

|     | Min | Max  |       Norm       |
| :-: | :-: | :--: | :--------------: |
|  H  |  0  | 360  | Increments of 30 |
|  S  |  0  | 100% |       100%       |
|  L  |  0  | 100% |       50%        |
|  A  |  0  |  1   |        1         |

```css
hsl(270, 60%, 70%);
hsla(270, 60%, 70%, 0.25);
```

## [Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)

Used as an alternative for actual image files in `background-image` properties

### `linear-gradient()`

### `radial-gradient()`

### `repeating-linear-gradient()`

### `repeating-radial-gradient()`

### `conic-gradient()`

## Math

### `calc()`

- Allows performing arithmetic in CSS
- Syntax appears to accept a single expression only...
  - Single arithmetic operator
  - Single left and right operands
- Useful for...
  - mixing units
  - nesting calculations, e.g. `calc( calc () - calc () )`

### `min()`

- Returns smallest value in a given comma-separated list
- Useful in creating responsive websites
- Basic arithmetic is allowed inside, e.g.
  - `width: min(80ch, 100vw - 2rem);`

### `max()`

- Returns largest value in a given comma-separated list
- Effectively opposite of `min()`
- Useful in boosting accessibility
- Ensures a minimum allowable value

### `clamp()`

```css
clamp(1rem, 10vw, 2rem);

/* Resolves to... */
max(1rem, min(10vw, 2rem))
```

- Selects a value between a `minimum`, `ideal`, and `maximum`
  - If `minimum < ideal < maximum`, use `ideal`
  - If `ideal < minimum`, use `minimum`
  - If `maximum < ideal`, use `maximum`
- Use `ideal` if it's within `minimum` and `maximum`, and if not, _clamp_ it to the specified extremes
- Would only be effective if `ideal` is a relative / derived value
  - Using `calc()`
  - Using percentage or viewport units

## Knowledge Check

- What are the four CSS math functions we covered above?

  - `calc()`
  - `min()`
  - `max()`
  - `clamp()`

- How do we use CSS math functions in our CSS?

  - Similar to programming languages
  - Call it with a `()` suffix and pass arguments onto it

- How can CSS functions help make websites and applications more responsive?

  - By setting and limiting sizes for elements

# More CSS Properties

## Background

### `background` shorthand

> Probably best to set the needed `background-*` properties individually instead of using this [obnoxious] shorthand...

- **Shorthand** for the different background properties

### `background-attachment`

Set background image **scrolling**

### `background-clip`

Set box / area for background image to cover

- Content box
  - Only under the content
- Padding box
  - Include the padding area
- Border box
  - Include up to the border area

### `background-color`

Sets background color, using different methods:

- Hexadecimal color
- RGB[A]
- HSL[A]

There are others, but these are the most commonly used methods.

### `background-image`

Set a background image, either via:

#### `url()` file

- Use an external image file
- Either available locally or online

#### Gradients

##### `linear-gradient()`

- Transition between colors via a straight line

##### `radial-gradient()`

- Transition between colors from a circle center radiating outwards

##### Repeating gradients

- Repeated linear or radial gradients

##### `conic-gradient()`

- Transition between colors along the perimeter of a circle
- Kind of like a combination between linear and radial gradients

### `background-origin`

Set which box does the background start

- Content box
- Padding box
- Border box

### `background-position`

- Sets the initial position of the background image
- Relative to the position set by `background-origin`
- Can use offset values

### `background-repeat`

Set how the background image is repeated (tiled)

- Along an axis
- Spaced-out

### `background-size`

Set the dimensions of the background image

## Borders

### `border` shorthand

```css
border: <border-width> <border-style> <border-height>;
```

- Sets all three (3) common border properties at once

### `border-width`

Set thickness of element's border lines, if present at all

### `border-style`

Set the line style of the border lines, e.g.

- Solid, straight lines
- Dashed
- Dotted

### `border-color`

Set the color of the border lines

### `border-radius`

- Set the roundness of the element's corners
- Useful for creating circle/round shapes/sections

## `box-shadow`

- Adds shadows to an element
- Adds sense of depth, separation between elements
- Use light, subtle, barely visible shadows

## `overflow`

Control what happens when an element's content grows too big for its size

- Hide?
- Show despite going over the boundaries?
- Make scrollable?

> This also explicitly adds scroll bars when set accordingly, even if the content does not overflow.

## `opacity`

- Set transparency of an element
- Think _alpha_, the last values of `rgba()` and `hsla()`

### Choices for element visibility

https://stackoverflow.com/questions/14731049/visibilityhidden-vs-displaynone-vs-opacity0

#### `visibility: hidden`

- Hides the element, but leaves the area "occupied"

#### `display: none`

- Hides the element, and allows other elements to take up its space

#### `opacity: 0`

- Like `visibility: hidden`, bot not really _true_ hiding
- Element is "transparent" instead
- Element is still present on the DOM, just not rendered

## Knowledge Check

- Which property would you use to make an element transparent?

  - `opacity`
  - For hiding, I would use `display: none`

- Which property would you use to make a background image tile?

  - `background-repeat`

- Which property would you use to add scroll bars to an element?

  - `overflow`
  - Specifically, `overflow: scroll`

- Which property would you use to add a shadow behind an element?

  - `box-shadow`

- Which property would you use to create rounded corners on an element?

  - `border-radius`

- How would you use border-radius to make a circular element?

  - `border-radius: 50%`

# CSS Foundations

> Cascading Style Sheets

## Basic Syntax

```css
/*  Structure
 *
 *  Looks like named JS blocks or class declarations
 *  Block itself looks like a JS object definition
 */
selector {
  property: value;
}

/* Example */
div.bold-text {
  font-weight: 700;
}
```

## Selectors

HTML to apply sample styles on:

```html
<div>Hello, World!</div>
<div>Hello again!</div>
<p>Hi...</p>
<div>Okay, bye.</div>

<div class="alert-text">Please agree to our terms of service.</div>

<div id="title">My Awesome 90's Page</div>

<div class="read">This is already read.</div>
<div class="unread">This is still unread.</div>

<div>
  <div class="subsection header">Latest Posts</div>
  <p class="subsection preview" id="preview">
    This is where a preview for a post might go.
  </p>
</div>

<!-- prettier-ignore -->
<div>
  <div class="ancestor"> <!-- A -->
    <div class="contents"> <!-- B -->
      <div class="contents"> <!-- C -->
      </div>
    </div>
  </div>

  <div class="contents"></div> <!-- D -->
</div>
```

- **Universal selector** [ `*` ]
  ```css
  * {
    color: purple;
  }
  ```
  - Selects elements of any type
  - i.e. applies to ALL elements
- **Type selector**
  ```css
  div {
    color: white;
  }
  ```
  - Selects elements of specified type (name)
  - Applies to all elements of that type
- **Class selector**

  ```css
  .alert-text {
    color: red;
  }

  .alert-text-bold {
    font-weight: bold;
  }
  ```

  - Selects elements of the specified class
  - Starts with a dot `.`
  - Think _dot notation_, i.e. accessing object properties
    - Objects are traditionally derived from **classes**
  - Class names are **case-sensitive**
  - Classes are not unique to an element, and can be applied to several of them, e.g.
    ```html
    <div class="alert-text">The above CSS will apply to this.</div>
    <div class="alert-text">It will also apply to this.</div>
    <div class="alert-text">And also this</div>
    ```
  - Elements can also have multiple classes, separated by a space, e.g.
    ```html
    <div class="alert-text alert-text-bold">
      This element has multiple classes!
    </div>
    ```
    - Because of this, class names must not contain spaces
    - Though that does not seem to be possible in the first place

- **ID selector**

  ```css
  #title {
    background-color: red;
  }

  #element-id {
    background-color: black;
  }
  ```

  - Selects an element with the specified ID
  - Starts with a hash `#`
  - ID names are **case-sensitive**
  - IDs are **unique** to an element; once given, they cannot be given to another
    - Elements also could only have a single ID, unlike classes
    ```html
    <!-- This is invalid, though technically works -->
    <div id="element-id">Element content</div>
    <div id="element-id">Another element</div>
    ```
  - **Use element ID's sparingly!**
    - When specifically want to target a single element
    - Having links jump to a specific section of the page
      ```
      https://my.website.com/a-webpage/content#section-id
                                              ↑↑↑↑↑↑↑↑↑↑↑
      ```

- **Grouping selector**

  ```css
  .read,
  .unread {
    color: white;
    background-color: black;
  }

  .read {
    /* several unique declarations */
  }

  .unread {
    /* several unique declarations */
  }
  ```

  - Selects multiple elements and applies the same styles to them
  - Separate selectors with a comma `,`
  - Best used if they are somehow related (logically, by name, etc.)
  - Selectors in a group can also have additional styles **unique** to themselves
    - Unique styles are defined using the applicable syntax from previous entries
    - These are added on top of their shared styles

- **Chaining selectors**

  ```css
  .selector1.selector2#selector3 {
    /* Properties here */
  }

  .subsection.header {
    color: red;
  }

  .subsection#preview {
    color: blue;
  }
  ```

  - Selects elements that has all of these identifiers (selectors)
  - Has no separators; continuous
  - Similar to dot notation, but does not go down a level
  - Works for any combination of selectors (e.g. classes, IDs) except **type selectors**
    - Combining `div` and `p` without separators will result in a `divp`
    - The selector would try to find an element `divp` which does not normally exist
  - Generally can go on forever
    - Might be a "code smell" however, as it implies that an element has several classes

- **Descendant combinators**

  ```css
  .ancestor .contents {
    /* some declarations */
  }
  ```

  - Selects applicable elements within a hierarchy
  - Separated by space ` `
  - The example above would select elements of class `.contents` which are within elements of class `.ancestor`
    - Bare elements of class `.contents` will NOT be selected
  - Generally can go on forever
    - This is a "code smell" however, as it implies deep nesting, which should not be preferred

### Note on chain and descendant combinations

They are kind of confusing if "dot notation" is used as a distinction.

In programming, something like `object.prop1.prop2` would access the `prop2` property of the `prop1` property of `object`.

In CSS however, this is a **descendant** behavior, which is separated by space, though the syntax resembles **chaining**.

## Properties to get started with

### Color

```css
... {
  color: ...;
  background-color: ...;
}

p {
  /* Hex: */
  color: #1100ff;
  /* RGB: */
  color: rgb(100, 0, 127);
  color: rgba(228, 30, 147, 0.33);
  /* HSL: */
  color: hsl(15, 82%, 56%);
  color: hsl(325, 87%, 89%, 0.33);
}
```

- `color`
  - Sets an element's **text** color
  - Can also be thought of as the **foreground** color
- `background-color`
  - Sets an element's **background** color

#### Accepted values

- Keywords
  - Color names, e.g. `red`, `firebrick` `gainsboro`
    - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color_keywords
    - https://en.wikipedia.org/wiki/Web_colors
  - `transparent` keyword
- Hex, e.g. `#1100ff`
  - Hexadecimal number
  - Prefixed with hash (`#`) symbol
  - Divided into three parts: red, green, blue
    - `#RRGGBB`
  - Each part goes from `00` to `ff`
    - Hexadecimal numbers: `0123456789abcdef`
    - Case does not matter
  - Whole code normally ranges from `#000000` to `#ffffff`
  - Can add support for **transparency** (alpha), by appending two additional hex digits
    - `#RRGGBBAA`
    - e.g. `#e41e930f`
- RGB, e.g. `rgb(228, 30, 147)`
  - Uses `rgb()` function
  - Accepts three (3) arguments, each for **red**, **green**, and **blue** values
  - Each value ranges from `0` to `255` (8-bit)
    - CSS colors use 24-bit range
  - There is also `rgba()`, which adds an "alpha" property, i.e. **transparency**, ranging from `0` to `1`
    - e.g. `rgba(228, 30, 147, 0.33)`
- HSL, e.g. `hsl(325, 87%, 89%)`
  - Uses `hsl()` function
  - Accepts three (3) arguments:
    - **Hue**. Angle in the color wheel; default to degrees `deg`
      - Degrees, e.g. `0deg` or `0` (unitless)
      - Radians, e.g. `1rad`
      - Gradians, e.g. `100grad`
      - Turns, e.g. `0.25turn`
    - **Saturation**. Percentage from `0%` to `100%`
      - `0%` Unsaturated (greyscale)
      - `100%` Fully saturated
    - **Lightness**. Percentage from `0%` to `100%`
      - `0%` Black
      - `50%` Normal
      - `100%` White
  - There is also `hsla()`, which adds an "alpha" property, i.e. **transparency**, ranging from `0` to `1`
    - e.g. `hsl(325, 87%, 89%, 0.33)`

### Typography

```css
_ {
  font-family: ...;
  font-size: ...;
  font-weight: ...;
  text-align: ...;
}

div {
  /* Font family */
  font-family: 'Specific name only';
  font-family: generic-name-only;
  font-family: 'Font family name', generic-family-name;

  /* Font size */
  font-size: 22px;
  font-size: 2rem;

  /* Font weight, e.g. boldness */
  font-weight: bold;
  font-weight: 700;
  font-weight: 900;

  /* Text alignment */
  text-align: center;
}
```

`font-family`

- Accepted values
  - "Specific" font family, e.g. `font-family: "Times New Roman";`
    - Enclosed in quotation marks
  - Generic font family, e.g. `font-family: sans-serif;`
    - Not enclosed in quotes
- Number of values
  - Single (as per above example)
  - Comma-separated list, e.g. `font-family: "Times New Roman", sans-serif;`
- If browser can't find the first font in the list, it will try the second one, then the third, and so on
  - Best practice is to use a list for _fallback_

`font-size`

- https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
- Accepted values
  - Keywords
    - Absolute, e.g. `x-small`, `large`
    - Relative, e.g. `larger`, `smaller`
  - Values
    - Pixels, e.g. `font-size: 22px;`
    - Ems, particularly, root em, e.g. `font-size: 2rem;`
      - `rem` is preferable for accessbility and respecting user preferences
    - Percentages, e.g. `font-size: 25%;`
    - Note that there are no separator between the value and the unit
- https://www.youtube.com/watch?v=N5wpD9Ov_To

`font-weight`

- Boldness of text
- Font itself must support the specified weight
- Accepted values
  - Keywords
    - Absolute, e.g. `normal`, `bold`
    - Relative, e.g. `bolder`, `lighter`
  - Values, e.g. `100`, `700`, `900`
    - Increments of 100

`text-align`

- Horizontal alignment of text within element
- Typical values: `center`, `end`, `justify`

### Image height and width

- By default `<img>` uses actual image file's height and width
- To adjust image size while maintaining proportions, set one property to `auto` and adjust the other, e.g.
  ```css
  img {
    height: auto;
    width: 500px;
  }
  ```
  - Its usually best to adjust `width` and let `height` adjust automatically
  - Horizontal scrolling is often frowned upon
  - https://www.youtube.com/watch?v=N5wpD9Ov_To
- Both `width` and `height` is also best to be specified for `<img>` elements, even if one of them won't be adjusted, in order to prevent random size changes in webpage content

## Cascade of CSS

CSS only does things it is told to do (like a program)

When the webpage does not appear as expected, it is either due to:

- Default styles of browsers, which may silently add spacings or customizations, or
- Incomplete understanding of **cascade**, or the rules of how styles apply to HTML

### Specificity

> More specific styles will take precedence over less specific styles

- Order (simplified)
  - Inline styles
    - Have the highest specificity
    - Styles within the elements themselves on the HTML
  - ID selectors
    - IDs can only be assigned to a single element
  - Class selectors
    - Classes can be applied to several elements
  - Type selectors
    - Applies to all elements of that type
- Specificity is only applied on conflicting rules
- Larger number of selectors in a rule beat smaller numbers

### Inheritance

> Styles applied to an element are also usually applied to its children

- Typography-based properties (e.g. `color`, `font-size`, `font-family`) are often inherited
  - Most others are not
- Directly applied styles take precedence over inherited styles

### Rule Order

> In case of still non-resolvable cases after taking everything into consideration, _the last defined styles will take precedence_.

- The deciding factor, after everything else
- Think procedures, or a stack
  - The last item will often be the most "visible"

## Adding CSS to HTML

### External CSS

```css
/* styles.css */

div {
  color: white;
  background-color: black;
}

p {
  color: red;
}
```

```html
<!-- index.html -->

<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

- Most common method
  - Keeps HTML and CSS separated, resulting in smaller file sizes and cleaner, readable structure
  - CSS is edited only in one place, making it easier to diagnose issues
- Steps
  - Have a dedicated `.css` file
  - Link it within the `.html` file
    - Using the `<link>` element
    - Within the `<head>` element
- CSS file name can be whatever
  - `styles.css` or `style.css` is common

### Internal CSS

```html
<head>
  <style>
    div {
      color: white;
      background-color: black;
    }

    p {
      color: red;
    }
  </style>
</head>

<body>
  ...
</body>
```

- CSS within HTML itself
  - Within `<style>` element
  - Within `<head>` element
  - Does not need linking, i.e. `<link>`
- Useful for adding unique styles to a single page
  - More specific than the external file approach
- Might make the HTML file size larger, making it slow to download, and the website appear slow to load

### Inline CSS

<!-- prettier-ignore -->
```html
<body>
  <div style="color: white; background-color: black;">
    ...
  </div>
</body>
```

- Add styles directly to an element
- No need for selectors, as the element is implicitly selected already
- Add style as an attribute `style` of the element, with its value being a string of semicolon-separated rules
- Useful for adding unique styles to a single element
- Generally not recommended
  - Lots of styles to a single element will get messy
  - Bloat HTML file size
  - Tedious and repetitive styling for each individual element, as needed
  - Inline CSS is most specific, overrides other rules, and may produce unexpected results

<!--

EOF

-->

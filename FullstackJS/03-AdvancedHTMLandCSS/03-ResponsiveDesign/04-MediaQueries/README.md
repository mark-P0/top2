# Media Queries

## Basic Syntax

<!-- prettier-ignore -->
```css
/* This applies a different selector rule when the query is satisfied */
selector { property: value-1; }
@media (query) {
  selector { property: value-2; }
}

/*  Example:
 *  For devices 600px and below, apply a margin of 8px to the body
 *  Otherwise, apply a margin of 24px to the body
 */
body { margin: 24px; }
@media (max-width: 600px) {
  body { margin: 8px; }
}
```

## Common Practices

### Query variants

#### `max-width`

#### `min-width`

- May be more intuitive / preferable
- Could be read as _"from this width and above, unless otherwise overridden"_

#### `max-height`

#### `min-height`

### Limit media queries

- Use as few media queries as possible
- Rely on natural responsiveness
- Leverage the fact rules outside the query is applied by default
  - Rules inside the query could override these

### Common breakpoints

- The course suggests...
  ```
  Mobiles < 500px <= Tablets < 1000px <= Desktops
  ```
  - `< 500px` for mobiles
  - `>= 500px` and `< 1000px` for tablets
  - `>= 1000px` for desktops
- A Bootstrap-based query could be like...
  ```
  Mobiles < 576px <= Tablets < 992px <= Desktops
  ```
  - `< 576px` for mobiles (_extra small_)
  - `>= 576px` and `< 992px` for tablets (_small_ to _medium_)
  - `>= 992px` for desktops (_large_)
- [List of common viewport resolutions according to Adobe](https://experienceleague.adobe.com/docs/target/using/experiences/vec/mobile-viewports.html)

### Zooming

- Zooming has the effect of "changing" the resolution of the page
- This also triggers breakpoints
- May be handy for debugging media queries

> Or (_set a resolution_ | _resize the page_) via the responsive mode of a browser's dev tools...

## Print Styles

- There are two (2) types of media that media queries target
  - Screen
  - Print
- The following bare syntax applies to _both_ of these
  ```css
  @media (query) {
    /* ... */
  }
  ```
- The query may be constrained to a specific type using
  ```css
  @media type and (query) {
    /* ... */
  }
  ```

<br>

- Screen types refer to digital displays, e.g. desktop monitors, mobile screens
- Print types refer to when the webpage is printed. In such a case, it may be preferable to...
  - Convert the webpage to black and white
  - Hide/Show some elements

## Knowledge Check

- How do you define a media query to create a mobile layout for your site?

  - Add breakpoints via media query
  - Add rules that will only be used when that breakpoint is satisfied

- What is the difference between `max-width` and `min-width` in a media query definition?

  - In a `max-width` query, the contained rules will be applied only when the device is at or **below** the specified value
  - In a `min-width` query, the contained rules will be applied only when the device is at or **above** the specified value

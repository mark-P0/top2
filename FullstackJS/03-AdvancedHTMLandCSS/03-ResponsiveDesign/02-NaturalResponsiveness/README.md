# Natural Responsiveness

- **Plain HTML is responsive**
  - Webpages are responsive by default, and the layout process (i.e. us developers) breaks this

## Keeping Natural Responsiveness

### Consider the "viewport" `meta` tag required

> - This is included in Emmet's `!` boilerplate snippet
> - One of my Webpack projects looked weird on mobile when I forgot to include this... yikes

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- The HTML standard never considered mobile devices
- The default behavior is to simulate a larger screen and zoom it out so that the full width of the webpage is visible
- The above HTML snippet overrides this so that it may be viewed in as the actual non-zoomed version
- tl;dr ― **add this to the `<head>` of every website / app**

### Avoid fixed dimensions (width, height)

- Replace `width` with `max-width`
  - So that it may shrink when necessary
- Replace `height` with `min-height`
  - So that it may grow when necessary
- May also use the remaining counterparts when appropriate

#### Or avoid setting heights altogether

- Prefer [a combination of] paddings and margins in setting a fixed height
- Whenever applicable of course
- Could also just set a fixed width and let height be computed automatically, e.g. via `aspect-ratio`

#### When to set fixed widths

- Smaller sizes should be fine, e.g. `32px` for icons

### Use Flex and Grid

- The purpose of Flex was literally for creating _flexible_ layouts, i.e. responsive layouts
  - `flex-wrap` allows the layout to be wrapped within the viewport / container
- Grid can mimic most of Flex' functionalities
  - Using a combination of `minmax` and `auto-fit` / `auto-fill`
  - Create a grid layout with automatic rows and columns as needed

## Knowledge Check

- Why should you avoid fixed width?

  - The fixed-width element may overflow the viewport, resulting in unwanted horizontal scrolling
  - Width is the constrained dimension for pages, so it is important that it can accommodate for changes

- Why should you avoid fixed height?

  - The fixed-height element may be overflowed by its content, resulting in broken layouts
  - Height is often arbitrary, and depends on the amount of content on the page
    - Setting a fixed height for anything contradicts this expectation

- In what situations might it be appropriate to use a fixed height or width?

  - Significantly small elements, e.g. icons, small shapes

- Why should you avoid percentages?

  - Percentages may behave _unexpectedly_ at times
  - Percentages are relative to the container size
    - Or the viewport for the outermost element
  - Some other properties may be implicitly dependent on these dynamic sizes
    - And also change whenever they change

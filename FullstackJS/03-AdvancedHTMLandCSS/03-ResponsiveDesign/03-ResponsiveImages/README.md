# Responsive Images

## Basics

- Do not set BOTH `width` and `height`
- Manipulate one directly (e.g. `width`), and let the other grow dynamically (e.g. `height: auto`)

## Fitting images within elements

### `background-position` | `background-size`

- For background images (set via CSS)

### `object-fit`

- For `<img>` elements

## Knowledge Check

- What is the main difference between `object-fit` and `background-size`?

  - `object-fit` works on elements like `<img>`
  - `background-size` works on elements with a background image set via CSS
    - `<img>` elements do not work this way

- How can you define a width and a height on an `img` without distorting it?

  - Pick ONE dimension to be directly manipulated, most commonly `width`
  - Set the other dimension to `auto`, e.g. `height: auto`
  - This keeps the natural aspect ratio of the image itself

- Why would you want to provide different images at different screen resolutions?

  - Images must scale accordingly to the resolution they are viewed at to be displayed nicely
  - Larger images mean larger file sizes, which mean larger bandwidths and slower loading times than may be necessary
    - e.g. mobile may not need a full HD copy of an image when it will only be viewed from a small screen

- When would you want to use an `img` with a `srcset` vs a `picture`?

  - `<img srcset="...">` if the goal is to intelligently choose between pictures of the **same content** but **different sizes**
  - `<picture>` if the goal is to choose between pictures of **different content**
    - This could also be potentially used to choose between pictures of **different sizes**

# CSS Units

> I try to spam `rem` as much as possible... (even outside font sizes)
>
> Then use `px` for very small and/or throwaway units...

## Absolute Units

`px` should be the **ONLY** absolute unit that should be used for web development. Other absolute units, e.g. `cm`, `in` are based on physical units and makes more sense on a print setting and not a digital setting

- There's also some caveats regarding DPI, screen resolution, Retina display, HiDPI, etc.

### `px`

- Pixels
- `1px` is a pixel on a screen
- Pixel size depends on monitors

## Relative Units

### `em` | `rem` (_Font size_ units)

> _Rule of thumb_: Prefer `rem`

- Term "_em_" apparently derived from the use of character `M` as full-width blocks
  - [Arguable](https://stackoverflow.com/questions/15827038/what-does-css-measurement-unit-em-actually-stand-for)
  - Closest definition that could be gotten

&nbsp;

- `em` | `font-size` of the element in context
- `em` | `font-size` of the root element, either...
  - `:root`
  - `<html>`

&nbsp;

`rem` is recommended as it effectively follows the browser's font size, i.e. most likely comfortably set by the user

- It is best to respect and follow the user's wishes

### `vw` | `vh` (_Viewport percentage_ units)

> A viewport represents the area in computer graphics being currently viewed.
>
> ― [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts)

- Percentages of the viewport dimensions, e.g.
  - `1vw` is `1%` of the viewport width
  - `1vh` is `1%` of the viewport height

## Knowledge Check

- Why would you want to use `em` or `rem` for `font-size` instead of `px`?

  - As relative units, they scale with the browser font size set by the user
  - It is best to adjust to the user's wishes, as opposed to setting a static definition via an absolute unit like `px`

- What are some instances where you might want to use `vh` and `vw`?

  - Single- / Full-page applications
  - Sizing a section (that can be auto-scrolled to) to the viewport dimensions for a full-screen effect

- What are some instances where you might want to use `px` instead of a relative unit?

  - Static designs and layouts

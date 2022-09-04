# SVG

> **Scalable Vector Graphics**

- _Scalable_ image format
- Scales to any size
- Maintains quality
- Same file size
- Programmatic images
  - Creation
  - Modification
  - Via CSS and/or JS
- Common use cases:
  - Icons
  - Graphs / Charts
  - Large, simple images
  - Patterned backgrounds
  - Applying effects to other elements via SVG filters

## Graphics Types

|             |        Raster         |            Vector             |
| :---------: | :-------------------: | :---------------------------: |
| Definition  |    Grid of pixels     |             Math              |
|  Think...   |       Hardcoded       |            Formula            |
|   Detail    | Limited to pixel grid |     Potentially limitless     |
|   Scaling   |  Increase grid size   | Native<br>(Formula parameter) |
|  File size  |         Large         |             Small             |
|   Format    |        Binary         |              XML              |
| Readability |        Machine        |             Human             |

### Raster

![](https://upload.wikimedia.org/wikipedia/commons/3/3b/Rgb-raster-image.svg)

#### Binary

```
NÆ)�A�:��S[7�d�60}z�
ӗe��t;ك�a\��_��F����bҦ`}��A��:ͫ�0s!;�w�5皍�+4��c��%�j�Cg=H��D��>;��Q����H#�(	}���㌚P��c�
��"/$�Z��m�LˑLw���b.�d=���P!`Aޜ���ګ�_C�қ����K+c��6�v������<�t��4p�P�}8�dm��� ���Ʋ��y`A?t�i�la�
�R7�9�
```

- Raster image (JPEG) opened as text
- Machine-readable language
- Binary gibberish

### Vector

![](https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg)

#### XML

> **Extended Markup Language**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="0" y="0" width="100" height="50" />
  <circle class="svg-circle" cx="50" cy="50" r="10" />
</svg>
```

- Used to create / define SVG images
- HTML-like syntax
  - Tags
  - Attributes
- Human-readable
- Interoperable with HTML; can be targeted with CSS
  - Treat as if HTML elements
  - Select with _CSS selectors_

## Disadvantages

- Best for **simple** images
  - Inefficient at complex, detailed, realistic images
  - Numerous formulas for each and every detail
  - Tedious, computationally heavy, potentially infinite
  - Think analog vs. digital data, digitization, sampling
    - Audio, signals, recording

## Creation

- Creating from scratch **not recommended**
  - While it looks like HTML, it would be best not to craft it like HTML.
- Use image editors
- Manual editing recommended only for
  - minor editing
  - already crafted SVG images

### Image editors

- Adobe Illustrator
- Figma
- https://yqnn.github.io/svg-path-editor/
- https://inkscape.org/
- https://affinity.serif.com/en-us/designer/

### Via program / script

- http://snapsvg.io/
- https://svgjs.dev/docs/3.0/
- https://d3js.org/
  - Data science...?

## Anatomy

```xml
<div class="container">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x="0" y="0" width="100" height="100" fill="burlywood" />
    <path
      d="M 10 10 H 90 V 90 L 10 60"
      fill="transparent"
      stroke="black"
      stroke-width="3"
    />
    <circle cx="50" cy="50" r="20" class="svg-circle" />
    <g class="svg-text-group">
      <text x="20" y="25" rotate="10" id="hello-text">Hello!</text>
      <use href="#hello-text" x="-10" y="65" fill="white" />
    </g>
  </svg>
</div>
```

```css
.container {
  max-width: 200px;
  margin: auto;
}

.svg-circle:hover + .svg-text-group {
  opacity: 0;
}
```

### `xmlns`

- Stands for **XML namespace**
- Specifies XML _dialect_
  - Think _versions_
  - JS has a dialect by Microsoft called [JScript](https://en.wikipedia.org/wiki/JScript)
  - SVG itself is a dialect of XML
- **REQUIRED** attribute

### `viewBox`

- Defines...
  - Image bounds
  - Aspect ratio
  - Origin
- Think _resolution_, or _size_

### `class`, `id`

- Similar functions as in HTML
  - `class`es are definitions that is the same across elements
  - `id`s are definitions that is unique to a single element
  - Allows SVG elements to be targeted by CSS
- SVG elements with `id` can also be reused via the `<use>` SVG element
  - Supply via the `href` attribute, with the `#{id-name}` syntax
  - Original attributes cannot be changed, except: `x`, `y`, `width`, `height`, `href`

From [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use):

```xml
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <circle id="myCircle" cx="5" cy="5" r="4" stroke="blue" />
  <use href="#myCircle" x="10" fill="blue" />
  <use href="#myCircle" x="20" fill="white" stroke="red" />
  <!--
    stroke="red" will be ignored here, as stroke was already set on myCircle.
    Most attributes (except for x, y, width, height and (xlink:)href)
    do not override those set in the ancestor.
    That's why the circles have different x positions, but the same stroke value.
  -->
</svg>
```

### SVG elements

- Provided by the SVG namespace
- Available elements depends on the namespace name / version
- Basic building blocks:
  - `<circle>`
  - `<rect>`
  - `<path>`
  - `<text>`

### SVG element attributes

- Many can be changed via CSS, e.g.
  - `fill`
  - `stroke`

## Actual Use

> Link SVG file until it is necessary to edit it via JS / CSS

### External (Linking)

- Use `<img>` HTML element
  - Via the `src` attribute
  - Like a regular image file
- Set as `background-image` via CSS
  - Selected element needs to have appropriate dimensions for image to show
  - Element does not scale to set SVG dimension
  - For instance, adding a background image to an empty `<div>` does nothing, as it has no dimensions by virtue of having no element / content

### Internal (Embedding)

- Best way to use SVG's
  - Allows SVG elements to be treated like HTML
  - Target via CSS
  - Mutate via JS
- Also arguably the messiest
  - Clutters HTML structure, especially with complex SVG
  - Slows down HTML loading
  - Prevents caching
    - Image is embedded into the HTML
    - External files can be cached until changed

## Icon Libraries

- https://fonts.google.com/icons
- https://feathericons.com/
- https://thenounproject.com/browse/icons/term/free/?iconspage=1

## Knowledge Check

- What is the `xmlns` attribute?

  - XML namespace
  - Required attribute
  - Specifies the XML dialect to be used
  - Defines what SVG elements can be used

- What are some situations where you wouldn’t want to use SVG?

  - Realistic images
  - Anything that is too complex and/or detailed

- What are the benefits of “inlining” your SVGs? What are the drawbacks?

  - Benefits
    - Can be targeted via CSS and/or JS
  - Drawbacks
    - Clutters HTML
    - Bogs down HTML loading
    - Caching not possible, as it is rendered alongside HTML

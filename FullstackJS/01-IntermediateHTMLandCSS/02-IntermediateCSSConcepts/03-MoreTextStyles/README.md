# More Text Styles

## Fonts

### System fonts stack

#### Original

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
```

#### Newer

```css
body {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
```

- Replaced `-apple-system, BlinkMacSystemFont` with `system-ui`

### Online fonts

#### Some sources

- [Google Fonts](https://fonts.google.com/)
- [Font Library](https://fontlibrary.org/)
- [Adobe Fonts](https://fonts.adobe.com/)
  - Premium, non-free

#### Usage

- Highly depends on source service
- Would be best to follow their documentation

##### HTML `<link>`

<!-- prettier-ignore -->
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```

##### CSS `@import url()`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
```

### Downloaded fonts

- Save font file locally
  - "_Locally_" is relative
  - It must be stored on the host that is serving the website
- Define a new CSS `@font-face`, and point its `src` property to the [relative] path of the font file

```css
@font-face {
  font-family: my-cool-font;
  src: url(../fonts/the-font-file.woff);
}

h1 {
  font-family: my-cool-font, sans-serif;
}
```

> Not all font file [formats] are supported by web browsers! Use cautiously.

## Text Styles

### `font-style`, e.g. bold, italic, underlined

- If applicable, prefer this approach over HTML elements, e.g. `<strong>`, `<em>`
  - If text has **semantic** meaning, use HTML elements instead

### `letter-spacing`

- Adjusts spaces _between_ **words**
- Useful for aesthetics, e.g. section header texts

### `line-height`

- Adjusts spaces _between_ **lines**
- Can increase readability of text blocks
- Think _research_ double-spacing, 1.5, etc.

### `text-transform`

- Control text **capitalization**
- `capitalize` every word, or turn all letters `uppercase` or `lowercase`

### `text-shadow`

- ...adds shadow to text content.
- Useful for contrasting light-colored text against light background
- Or for general aesthetics

### `text-overflow: ellipsis;`

- Add an ellipsis at the point of truncation in case of overflow

## Knowledge Check

- What are the 2 ways to add fonts that are not installed on a user’s computer?

  - Linking an online font
  - Linking a locally downloaded font
    - Available on the host serving the website
    - Define a new font face using `@font-face`

- What is the ‘system font stack’ and why would you want to use it?

  - A sequence of font names for the `font-family` property corresponding to those natively used by [the majority of] users' operating systems / machines
  - Display text using the users' native machine fonts
  - Arguably easier on the eyes than a custom font as the user is likely already used to seeing and reading their system font

- Which property would you use to increase or decrease the space between letters in a word?

  - `letter-spacing`

- Which property would you use to increase or decrease the space between lines in a paragraph?

  - `line-height`

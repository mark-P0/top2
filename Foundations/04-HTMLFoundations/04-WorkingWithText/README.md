# Working with Text

Particularly useful in this section was:

- HTML Preview
- Prettier
- Emmet
  - Abbreviations
  - Wrapping a selection with an Emmet abbreviation
- Finding parallels of Markdown features in HTML

## Nesting and Indentation

- Used to define parent, child, and sibling relationships
- Defines HTML structure
- Important for CSS and JS

## Knowledge Check

- How do you create a paragraph in HTML?

  - By using `<p>` tags

  ```html
  <p>This is a paragraph.</p>
  ```

- How do you create a heading in HTML?

  - By using `<h_>` tags, where `_` is a number from 1 to 6

  ```html
  <h1>This is a heading 1</h1>
  <h2>This is a heading 2</h2>
  <h3>This is a heading 3</h3>
  <h4>This is a heading 4</h4>
  <h5>This is a heading 5</h5>
  <h6>This is a heading 6</h6>
  ```

- How many different levels of headings are there and what is the difference between them?

  - There are six (6) levels of headings
  - They differ in terms of size and implied hierarchical importance

- What element should you use to make text bold and important?

  - The `<strong>` element
  - Discouraged, but could also use `<b>`

  ```html
  <strong>This important text should be in bold.</strong>
  ```

- What element should you use to make text italicized to add emphasis to it?

  - The `<em>` element
  - Discouraged, but could also use `<i>`

  ```html
  <em>This emphasized text should be italicized.</em>
  ```

- What relationship does an element have with any nested elements within it?

  - This element is the parent of the nested elements
  - The nested elements are children of the next element up in the hierarchy.

  ```html
  <parent>
    <children></children>
    <children></children>
    <children></children>
    <children></children>
    <children></children>
  </parent>
  ```

- What relationship do two elements have if they are at the same level of nesting?

  - They are sibling elements.

  ```html
  <parent>
    <sibling1></sibling1>
    <sibling2></sibling2>
  </parent>
  ```

- How do you create HTML comments?

  - By using the following syntax: `<!-- -->`

  ```html
  <!-- This is an HTML comment -->
  <!-- These will not be rendered by the browser -->
  <p>
    We are
    <strong>regular</strong>
    <em>HTML</em>
    <mark>elements!</mark>
  </p>
  ```

<!--
## Paragraphs

The following will be compressed into a single line:
```html
<body>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua.

  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat.
</body>
```

## Headings

## Bold text

## Italicized text

## Nesting and indentation

## HTML comments
-->

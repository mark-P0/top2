# Semantic HTML

> Semantic ― the meaning of something

## Non-Semantic Elements

These do not have any inherent meaning nor provide any context

### `<div>`

- Generic block element

### `<span>`

- Generic inline element

## [Examples of] Semantic Elements

### `<p>`

- Indicates a paragraph of text

### `<button>`

- Indicates an interactive element that can be clicked to achieve a particular effect

### `<table>`

- Indicates a tabular data for better parsing

### Labelled inputs

- Provides additional context for `<input>` elements
- As a sibling relationship. Requires `id`
  ```html
  <label for="name">Name</label> <input type="text" id="name" />
  ```
- As a nested relationship
  ```html
  <label>
    Name
    <input type="text" />
  </label>
  ```

### `<input>` types

- Use the closest, most appropriate `type`
- Devices could provide a specialized input field for certain `type`

### Lists

- A collection of related items must should be within a list
- Items should be set as `<li>`
- Items should be within either `<ol>` or `<ul>`
  - Most likely `<ul>`

## Page Parts

### Headings

- These act as section headers
- They also outline the content of the page
- Provides a sort of **Table of Contents**

#### `<h1>`

- There must be only one (1) of these

#### `<h2>`

#### `<h3>`

#### `<h4>`

#### `<h5>`

#### `<h6>`

### Landmarks

- These act as page regions

#### `<header>`

- Topmost page content
- May contain branding, and the `<nav>` elements

#### `<nav>`

- Set of navigation links
- Links to other pages or external sites
- Usually paired with `<li>` | `<ul>` | `<ol>`

#### `<main>`

- Main page content
- Usually the middle, between `<header>` and `<footer>`
- Only one on each page
- Contains nearly everything else

#### `<article>`

- Content that can stand alone without losing meaning
- Summarized by a heading

#### `<section>`

- Content with a heading

#### `<form>`

- Set of input fields
- `<input>` elements with appropriate `type`

#### `<aside>`

- Content on the side of the page
- Beside the `<main>` content
- Usually always visible
- In contrast with the scrollable long `<main>` content

#### `<footer>`

- Bottommost page content
- May contain branding, disclaimers, more `<nav>` content, copyright information

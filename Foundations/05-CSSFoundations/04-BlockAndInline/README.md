# Block and Inline

<!--
| Element type |   CSS `display`    |  Start   |
| :----------: | :----------------: | :------: |
|    Block     | `display: block;`  | New line |
|   In-line    | `display: inline;` | In line  |
-->

|  Description   |          Block          |       Inline       |
| :------------: | :---------------------: | :----------------: |
|  CSS display   |    `display: block;`    | `display: inline;` |
|   Direction    |        Vertical         |     Horizontal     |
|      Size      | Full-width & set height |        None        |
|     Start      |        New line         |      In-line       |
| Semantic (ex.) |      `<p>` `<h1>`       |    `<a>` `<em>`    |
|  Non-semantic  |          `div`          |      `<span>`      |

`display: inline-block`

- Inline elements but with vertical (block) settings in effect

## Assignments

### [Normal Flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)

Initial thoughts

- Kind of like Markdown style?
- Top-to-bottom?
- Treat webpage as a document? e.g. `.docx`

Default flow

- Depends on parent's writing mode
- In systems that write from left to right...
  - Blocks fill vertically, top-to-bottom
  - Inlines fill horizontally, left-to-right
  - e.g. English
- In systems that write from top to bottom...
  - Blocks fill horizontally, left-to-right
  - Inlines fill vertically, top-to-bottom

### [HTML Block and Inline Elements](https://www.w3schools.com/html/html_blocks.asp)

Block-level elements (by default)

```
<address>     <dd>        <figcaption>  <header>  <noscript>  <table>
<article>     <div>       <figure>      <hr>      <ol>        <tfoot>
<aside>       <dl>        <footer>      <li>      <p>         <ul>
<blockquote>  <dt>        <form>        <main>    <pre>       <video>
<canvas>      <fieldset>  <h1>-<h6>     <nav>     <section>
```

Inline-level elements (by default)

```
<a>        <big>     <dfn>    <kbd>     <q>       <span>      <time>
<abbr>     <br>      <em>     <label>   <samp>    <strong>    <tt>
<acronym>  <button>  <i>      <map>     <script>  <sub>       <var>
<b>        <cite>    <img>    <object>  <select>  <sup>
<bdo>      <code>    <input>  <output>  <small>   <textarea>
```

- Block elements **CAN** contain inline elements
- Inline elements **CANNOT** contain block elements

### [Inline vs Inline-Block Display in CSS](https://www.digitalocean.com/community/tutorials/css-display-inline-vs-inline-block)

`display: inline-block;`

- Allows setting `width` and `height`
- Respects top & bottom `margin` and `padding`
- Not possible with regular `display: inline;`

## Knowledge Check

- What is the difference between a block element and an inline element?
  - **Block**. Flows vertically, placed on a new line
  - **Inline**. Flows horizontally, placed on the same line
- What is the difference between an inline element and an inline-block element?
  - **inline**. Size cannot be set, does not respect top & bottom `margin` and `padding`
  - **inline-block**. Size can be set (**width** & **height**), respects all sides of `margin` and `padding`
- Is an `h1` block or inline?
  - `block`
  - Top-level header is on its own line
- Is `button` block or inline?
  - `inline`
  - As observed from exercise 2
- Is `div` block or inline?
  - `block`
  - Most familiar element
- Is `span` block or inline?
  - `inline`
  - New knowledge!

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

<!--

EOF

-->

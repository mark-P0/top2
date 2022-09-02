# Emmet

> I'm already quite familiar with Emmet! :D
>
> A formatter can and will reorganize Emmet's inserted snippet

- CSS selector-like expressions that expand to HTML elements
- Think dynamic HTML _snippets_

## Official Cheat Sheet

https://docs.emmet.io/cheat-sheet/

## At a Glance

### Emmet expression

```css
ul#nav>li.item$*4>a{Item $}
```

### HTML output

```html
<ul id="nav">
  <li class="item1"><a href="">Item 1</a></li>
  <li class="item2"><a href="">Item 2</a></li>
  <li class="item3"><a href="">Item 3</a></li>
  <li class="item4"><a href="">Item 4</a></li>
</ul>
```

### Breakdown

|   Expression | Explanation                                                            |
| -----------: | :--------------------------------------------------------------------- |
|     `ul#nav` | `<ul>` element with ID `nav`                                           |
|          `>` | Children                                                               |
|    `li.item` | `<li>` element with class `item`                                       |
| `li.item$*4` | Four (4) `<li>` elements with classes `item` appended with the count   |
|         `>a` | Each `<li>` item has an `<a>` child                                    |
|  `a{Item $}` | `<a>` child has a text content `Item _` using the aforementioned count |

## Common Expressions

> Emmet expressions I often use

### HTML boilerplate

```
!
```

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

### ID

```
element#id
```

```html
<element id="id"></element>
```

### Classes

```
element.class
```

```html
<element class="class"></element>
```

### Misc. attributes

```
element[attr1=val1 attr2=val2 attr3=val3]
```

```html
<element attr1="val1" attr2="val2" attr3="val3"></element>
```

Can be used as an alternative for ID / Class syntax:

```
element[id=element-id class=this-class]
```

```html
<element id="element-id" class="this-class"></element>
```

### Text content

```
element{This is content!}
```

```html
<element>This is content!</element>
```

- Think JS' template literal syntax

```js
let who = 'your';
console.log(`This is ${who} string!`);
```

```
This is your string!
```

### Multiple elements

```
element*3
```

```html
<element></element>
<element></element>
<element></element>
```

### Child elements

```
element>child>grandchild
```

```html
<element>
  <child>
    <grandchild></grandchild>
  </child>
</element>
```

### Numbering

```
element$.class$*3>child{I am child $!}*3
```

```html
<element1 class="class1">
  <child>I am child 1!</child>
  <child>I am child 2!</child>
  <child>I am child 3!</child>
</element1>
<element2 class="class2">
  <child>I am child 1!</child>
  <child>I am child 2!</child>
  <child>I am child 3!</child>
</element2>
<element3 class="class3">
  <child>I am child 1!</child>
  <child>I am child 2!</child>
  <child>I am child 3!</child>
</element3>
```

Works for...

- Element names
- Attributes
- Content

## Common "Functions"

> Emmet functionalities I often use
>
> Course suggests setting up shortcuts for them, but I prefer, and have always used them via VSCode's Command Palette (`Ctrl` + `Shift` + `P`)

### Wrap with Abbreviation

- Place a selection within the result of an Emmet expression

Useful for...

- Typing a text content then adding it to an element after
- Nesting an HTML portion within another element, e.g. a `<div>`
  - For containerizing
  - Then let the formatter organize it

### Expand Abbreviation

- Readily available with VSCode's IntelliSense (`Ctrl` + `Space`)
- Useful when editing sources the language of which Emmet has not been enabled for [yet]
  - IntelliSense does not know to use Emmet in such cases
  - Emmet can be explicitly activated on sources other than HTML, e.g. Markdown

### Balance Outward

- Select the full group to which the text on the cursor belong
- Can even work within JavaScript!
- Functions very similarly with **Smart Select (Grow)**
  - `Ctrl` + `Shift` + `Space` on my setup, but not sure if this is VSCode's, the Sublime Keymap extension, or some other extension

## Knowledge Check

- Why should you use Emmet?

  - Allows for writing complex HTML structures in a concise manner
  - Significantly reduces tedium of HTML writing, e.g.
    - Manually enclosing tags with angled brackets
    - Manually selecting a large HTML section for wrapping / grouping
  - Syntax is heavily inspired by CSS selector syntax
  - _a la_ write HTML using CSS

- What are some useful Emmet abbreviations?

  - `!`
  - `element#id`
  - `element.class`
  - `element[attribute=value]`
  - `element*multiple`
  - `element>child`
  - `element{Content}`

- What syntax would you use to create this element?

  ```html
  <p class="text"></p>
  ```

  - `p.text`

- What syntax expands to an element with a child element inside of it? For example:

  ```html
  <div><p></p></div>
  ```

  - The `>` syntax
  - `div>p`

- What syntax would you use to create three elements that have the same class name?

  - `element.same-class-name*3`

    ```html
    <element class="same-class-name"></element>
    <element class="same-class-name"></element>
    <element class="same-class-name"></element>
    ```

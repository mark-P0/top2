# DOM Manipulation and Events

## Document Object Model (DOM)

```html
<div id="container">
  <div class="display"></div>
  <div class="controls"></div>
</div>
```

- Tree-like representation of webpage contents
- Hierarchical
- Tree of _nodes_, i.e. a family tree
  - Parent nodes
  - Children nodes

### Representation in JS

#### [`Document` class](https://developer.mozilla.org/en-US/docs/Web/API/Document)

A `Document` instance represents the webpage, i.e. the global `document` object

> Note the cases! `Document` (the type) is different from `document` (the object)

```js
document instanceof Document; // true
```

- The global `document` object represent the current webpage
- New `Document` instances represent new webpages?
  - Inherently "empty"?

#### [`Element` class](https://developer.mozilla.org/en-US/docs/Web/API/Element)

`Element` instances represents elements on the webpage, e.g.

<!-- prettier-ignore -->
```js
const container = document.querySelector('#container');
const newParagraph = document.createElement('p');

container instanceof Element; // true
newParagraph instanceof Element; // true
```

- Those that use _tags_
- Those created dynamically with `document.createElement()`

### Targeting Nodes with Selectors

#### CSS-style selectors

```css
div.display
.display
#container > .display
div#container > div.display
```

#### Relational selectors

```js
htmlElement instanceof Element; // true

htmlElement.firstElementChild;
htmlElement.lastElementChild;
```

- _Properties_ of an element
- Interestingly, global `document` also has these properties

  <!-- prettier-ignore -->
  ```js
  document.firstElementChild; // html
  document.lastElementChild;  // html
  ```

  - The outermost "element" of an HTML file is a single `<html>`

Example, based on the initial DOM example:

<!-- prettier-ignore -->
```js
const container = document.querySelector('#container');
const { firstElementChild, lastElementChild } = container;

console.log({
  container,          // div#container
  firstElementChild,  // div.display
  lastElementChild,   // div.controls
});
```

### DOM Methods

> Most of these are present on both `Document` and `Element` object instances

#### Selection

##### `.querySelector()`

```js
document.querySelector(selector);
element.querySelector(selector);
```

- Returns reference to **first** match of `selector`
- Generally used to target elements in the DOM

  <!-- prettier-ignore -->
  ```js
  const container = document.querySelector('#container')
  const firstDivMatch = container.querySelector('div')

  container;     // div#container
  firstDivMatch; // div.display
  ```

##### `.querySelectorAll()`

```js
document.querySelectorAll(selector);
element.querySelectorAll(selector);
```

- Returns reference to **all** matches of `selector`
- Return value is a `NodeList`

  <!-- prettier-ignore -->
  ```js
  const divList = document.querySelectorAll('div');
  const divListArr1 = Array.from(divList)
  const divListArr2 = [...divList]

  divList; // NodeList(3) [div#container, div.display, div.controls]
  divListArr1; // [div#container, div.display, div.controls]
  divListArr2; // [div#container, div.display, div.controls]

  divList instanceof Array;     // false
  divListArr1 instanceof Array; // true
  divListArr2 instanceof Array; // true
  [1, 2, 3] instanceof Array;   // true
  ```

  - Looks like, but is actually not an array
  - Important distinction, as some convenient array methods are not present in a `NodeList`, e.g. `.map`, `.filter`, `.reduce`
  - Still an iterable though; can be looped with a `for`-`of`

#### Specific methods

When using `.querySelector()` or `.querySelectorAll()`, the proper prefixes must be used, e.g.

- `#` for IDs, e.g. `#element-id`
- `.` for classes, e.g. `#my-class-name`

However, the following dedicated methods allow skipping these, as if querying for bare tag names, and are also relatively more performant than a wide-cast query selection

- `.getElementsByClassName('my-class-name')`

  - `.querySelector('.my-class-name')`

- `.getElementsByTagName('tag')`

  - `.querySelector('tag')`
  - No prefix needed; functionally the same

- `.getElementsById()`

  - `.querySelector('#element-id')`

#### Creation

```js
document.createElement(elementName);

const newDiv = document.createElement('div');
const newPara = document.createElement('p');
const newSection = document.createElement('section');
```

- **`Document` method only**, i.e of `document`
- **Creates** element, but does not _add_ it yet to the DOM

#### Adding

```js
parentElement.appendChild(newChild);
parentElement.insertBefore(newChild, referenceChild);

document.querySelector('body').appendChild(newElement);
```

#### Removal

```js
parentElement.removeChild(child);
```

- `child` must be a direct child of `parentElement`

#### Modification

- Reference to an element can be used to change its "properties"
- The following examples will use this new element:

  ```js
  const div = document.createElement('div');
  ```

##### Inline style

```js
/* Individual rules */
div.style.color = 'blue';
div.style.background = 'white';

/* As a CSS text */
div.style.cssText = `
  color: blue;
  background: white;
`;
```

`kebab-case` CSS rules can be accessed using different approaches:

<!-- prettier-ignore -->
```js
/* Will not work; literally subtracting `color` */
div.style.background - color;

/* Works */
div.style.backgroundColor = 'white';     // Use corresponding camelCase
div.style['background-color'] = 'white'; // Treat like an object property
div.style.cssText = `
  background-color: white;
`;
```

##### Attributes

```js
div.getAttribute('id'); // null

div.setAttribute('id', 'the-div');
div.getAttribute('id'); // 'the-div'

div.removeAttribute('id');
div.getAttribute('id'); // null
```

Inline style is also an attribute. Treat it like `cssText`

```js
div.setAttribute('style', 'color: blue; background: white;');
```

##### Classes

```js
div.classList.add('new');
div.classList.remove('new');

/* Preferred way */
div.classList.toggle('active');
```

- The preferred way of adding dynamic classes is via `.classList.toggle()`

##### Text

```js
div.textContent = 'Hello World!';
```

- For general HTML content, a separate property can be set:

  ```js
  div.innerHTML = '<span>Hello World!</span>';
  ```

  - Adding HTML this way is **NOT RECOMMENDED**
  - For plain text, setting the `.textContent` property is preferred

### DOM Availability

For JS to have access to DOM elements, either:

- Place `<script>` elements at the bottom of the HTML
  - Doing so ensures that the DOM have been fully loaded
  - HTML elements are parsed from top to bottom
- Add the `defer` attribute to `<script>` elements at the top

  ```html
  <html>
    <head>
      ...
      <script src="./script.js" defer></script>
      ...
    </head>

    <body>
      ...
    </body>
  </html>
  ```

## Events

- Actions that occur on your webpage, e.g.
  - Mouse clicks
  - Key presses

### Defining Actions

The preferred method is adding functions as event listeners

- Separate from HTML
- Can have multiple functions on a single element

> These functions are also referred to as **callbacks**

#### Inline

```html
<button onclick="alert('Hello World')">Click Me</button>
```

#### On DOM object property

```html
<button id="btn">Click Me</button>
```

```js
const btn = document.querySelector('#btn');
btn.onclick = () => alert('Hello World');
```

#### As event listener

```html
<button id="btn">Click Me Too</button>
```

```js
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert('Hello World');
});
```

### Callback Argument(s)

<!-- prettier-ignore -->
```js
btn.addEventListener('click', function (e) {
  console.log(e);        // Event reference only
  console.log(e.target); // The element which received the event
  e.target.style.background = 'blue';  // Can change properties of the element
});
```

### Callback on Multiple Elements

```html
<div id="container">
  <button id="1">Click Me</button>
  <button id="2">Click Me</button>
  <button id="3">Click Me</button>
</div>
```

```js
// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
for (const button of buttons) {
  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    alert(button.id);
  });
}
```

### Common Events

<!-- cspell:disable -->

- `click`
- `dblclick`
- `keydown`
- `keyup`

<!-- cspell:enable -->

## Assignment

1. [JavaScript Drum Kit](https://mark-p0.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/)
2. ~~Event Capture, Propagation and Bubbling video~~
   > I don't think there's much that I can do about this. The video seems only explanatory.

## Knowledge Check

- What is the DOM?

  - Document Object Model
  - Representation of the webpage
  - Built from an HTML file
  - Consists of "actual" nodes arranged in a tree-like manner

- How do you target the nodes you want to work with?

  - Either via the global `document` object or individual `Element` instances:
  - `.querySelector()`
  - `.querySelectorAll()`
  - Use CSS-style selectors as argument

- How do you create an element in the DOM?

  - Via the global `document` object
  - `.createElement()`
  - Use element names (i.e. tags) as argument

- How do you add an element to the DOM?

  - `.appendChild()`
  - Can be via the global `document` but that's kind of non-sensical
  - More sensible use is via a selected DOM `Element` acting as the parent of the new element
  - e.g. the HTML body `document.querySelector('body')`

- How do you remove an element from the DOM?

  - `.removeChild()`
  - Subject to the same caveats as `.appendChild()`

- How can you alter an element in the DOM?

  - Get reference to element via e.g. `.querySelector()`
  - Access and modify its properties, e.g. style, text content
  - Treat element reference like a JS object with properties

- When adding text to a DOM element, should you use textContent or innerHTML? Why?

  - `textContent`
  - It is much more secure

- Where should you include your JavaScript tag in your HTML file when working with DOM nodes?

  - Bottom of `<body>`, so that all DOM nodes are present when the JS is executed
  - Can also be at the `<head>`, but must have the `defer` attribute so that it would effectively load after the DOM nodes are present as if it is at the `<body>` bottom
    - This is best practice; keeps HTML clean

- How do “events” and “listeners” work?

  - Events are interaction between visitor and webpage
  - Listeners "listen", or actively look out for a set of these events and perform some actions when they are detected. They call back some functions.

- What are three ways to use events in your code?

  - Inline on the HTML
  - As a property of the DOM node
  - As an event listener

- Why are event listeners the preferred way to handle events?

  - Multiple actions can be defined on a single event, each of which can be defined separately
  - Keeps the JS logic separate from the HTML initial structure

- What are the benefits of using named functions in your listeners?

  - Increases reusability of the defined behavior

- How do you attach listeners to groups of nodes?

  - Get a reference to the desired "group of nodes" as a collection, e.g.
    - via `.querySelectorAll()`
    - via manual array of DOM node references
  - Iterate through them in a loop, e.g. `for`-`of`
  - Add event listener to each via `.addEventListener()` using the internal loop item reference

- What is the difference between the return values of querySelector and querySelectorAll?

  - `.querySelector()` returns a single DOM node reference
  - `.querySelectorAll()` returns a several DOM node references, in a `NodeList` (not quite an array)

- What does a “nodelist” contain?

  - Several DOM nodes

- Explain the difference between “capture” and “bubbling”.

  - Both of these happen during events
  - Capture, or capturing, is the process of going deep into the DOM until it reaches the node on which the event is applied on
  - Only after reaching the target element will the event be actually applied
  - After this, the event goes back up in the DOM (kind of reverse of capture), applying the event on each parent/ancestor of the target
  - By default, event listeners are configured to be executed while the event is bubbling up
  - However, an argument on the `.addEventListener()` method can be set so that they may also execute while the event is capturing down

## Additional Resources

> _All skipped_, as they are particularly lengthy...

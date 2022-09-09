# Form Basics

> _i.e._ inputs!

> Use the outline of the parsed Markdown for better navigation.

## HTML

### `<form>`

- Root element of input form
- Form elements can be used outside of it
- With the following attributes:

#### `action` URL

- The URL on which the form data will be submitted

#### HTTP `method`

- HTTP verb request in making the submission

##### `"get"`

##### `"post"`

### `<input>`

#### Input `type`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types

##### `"text"`

Regular text input

##### `"radio"`

- Used for representing selections
- Only allows a single button of the same `name` attribute to be selected
- Ideal for less than 5 options
  - Else, use _dropdown menus_ via `<select>` rather than `<input>`
- Uses `checked` attribute

##### `"checkbox"`

- Like radio buttons
- Allows multiple selections
- Uses `checked` attribute

##### `"color"`

Color picker

##### `"file"`

- File browser
- For uploading files

##### `"email"`

- Email field
- Useful in mobile devices for constraining touch keyboard keys

##### `"password"`

- Hides password input from plain sight
- _e.g._ using asterisks `*`

##### `"number"`

- Constrains inputs to only numeric keys
- Also adds incrementing & decrementing buttons

##### `"date"`

Date / Calendar picker

##### `"button"`

- Button without any behavior
- Equivalent to, and succeeded by, `<button type="button"></button>`

##### `"submit"`

- Button for form submission
- Equivalent to, and succeeded by, `<button type="submit"></button>`

##### `"reset"`

- Button for resetting form fields
- Equivalent to, and succeeded by, `<button type="reset"></button>`

#### `id`

- Used by the `<label>` it is labelled by

#### `placeholder`

#### `name`

- Used when submitting the form
- Used as reference / variable name to the input
- Used by `"radio"` inputs
  - Only one radio button of the same `name` can be active at once

#### `checked`

- Used for setting default value
- Only used by `"radio"` and `"checkbox"` inputs

### `<label>`

#### `for`

- Must be equal to the `id` of the `<input>` it is labelling

### `<textarea>`

- Large text input
- Resizable

### `<select>`

- Dropdown menu

#### `<option>`

- Dropdown options

##### `value`

- Dropdown option value

##### `selected`

- Used for setting default value

#### `<optgroup>`

- Dropdown option group
- Composed of `<option>` elements

##### `label`

- Label of the `<option>` group, i.e. `<optgroup>`

### `<button>`

- Succeeded `<input type="button">`
- _i.e._ the standard HTML button

#### `type`

- Defaults to `"submit"`
  - Will "submit" a "form" implicitly
  - Even if non-existent
- Should be set to `"button"` explicitly for custom buttons without any implied behavior

##### `"submit"`

- Submits the form
- Uses the `action` attribute of the parent `<form>`

##### `"reset"`

- Resets the form field

##### `"button"`

- Does nothing
- Behavior up to implementation

### `<fieldset>`

- Group of form elements

#### `<legend>`

- Label for a `<fieldset>`

## Clickable HTML

[Buttons vs. Links](https://ux.iu.edu/writings/buttons-vs-links-basic/)

- Use buttons for **actions** that affect the front-/back-end
- Use links for **navigation**
  - Shouldn't affect front-/back-end...

### `<button></button>`

- Button
  - Actually under form elements
  - But can be used outside form elements
- Can accept HTML
  - Label is a _text content_
  - Thus, any other HTML can be nested within this element
- Has a `type` attribute
  - Defaults to `"submit"`
  - If unspecified, button will always make requests to server, which may be undesirable
  - Thus, as best practice, `type` must always be specified, _e.g._ to `"button"` for a generic button
  - Unlike `<input>` element in which `type` must be explicitly stated, making such behavior unlikely

> [MDN recommends this over `<input type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)

> Let's use this **_outside_** of `<form>` elements?

### `<input type="button">`

- Button
- Can NOT accept HTML
  - Label is an _attribute_
  - Self-enclosed element
  - Cannot nest anything within

> Let's use this **_inside_** of `<form>` elements?

### `<a></a>`

- Link
- Used for **navigation**, not action, e.g.
  - _Hyperlinks_ to external sources
  - _Jumps_ to on-page sections

## Knowledge Check

- Explain what the form element is for and what two attributes it should always include.

  - Specifies a section of HTML in which users / page visitors can input data
  - Required attributes
    - `action` URL to which form data will be submitted
    - `method` for HTTP request used in interacting with the `action` URL

- Explain what form controls are at a high level.

  - The elements on which data of various forms will be entered

- What is the `name` attribute for?

  - Used as identifiers for form data on submission
  - Used by radio buttons for "grouping"
    - Only one radio button in a "group" may be selected

- What are the three most common form controls you can use for allowing users to select predefined options?

  - Radio buttons
    - `<input type="radio">`
  - Checkboxes
    - `<input type="checkbox">`
  - Dropdown menu
    - `<select>` with several `<option>` children

- What are the three types of buttons in HTML?

  |    Type     |      As `<button>`       |      As `<input>`       |
  | :---------: | :----------------------: | :---------------------: |
  | **Submit**  | `<button type="submit">` | `<input type="submit">` |
  |  **Reset**  | `<button type="reset">`  | `<input type="reset">`  |
  | **Generic** | `<button type="button">` | `<input type="button">` |

- What are the two most challenging aspects of styling forms?

  - Default browser styles
    - _i.e._ user agent stylesheets
    - Alleviate with resetting or normalizing stylesheet(s)
  - Tricky-/Impossible-to-style form elements, _e.g._
    - Radio buttons
    - Checkboxes
    - Color pickers

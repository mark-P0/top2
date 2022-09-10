# Form Validation

> Notes on this lesson has been applied to the `./index.html` file at this directory.

## Regular Expression

The following resources has been, or I expect would be, immensely helpful to me:

- https://regex101.com/
  - Live regex tester and documentation
- https://www.html5pattern.com/
  - Collection of common regex patterns
- https://towardsdatascience.com/regular-expressions-clearly-explained-with-examples-822d76b037b4
  - Nice practice
- https://stackoverflow.com/questions/11898998/how-can-i-write-a-regex-which-matches-non-greedy
  - Make a greedy selector non-greedy
  - e.g. `.*?`
  - `.*` would exhaust _everything_; adding `?` will try to finish as soon as possible, depending on the remainder of the pattern
  - _Lazy quantifier_
  - Matches as few characters as possible

## Knowledge Check

- What does the `required` validation do?

  - Marks the input field as required
  - Prevents the form from being submitted until the field has been filled

- What validations can you use for checking text length?

  - `minlength`
  - `maxlength`
  - Applicable on both `<textarea>` and various `<input>` types

- How can you validate the minimum and maximum of numeric inputs?

  - `min`
  - `max`

- What can you use the pattern validation for?

  - For limiting inputs to a particular structure
  - Ensures that the input to be received is valid as much as possible starting from the client-side
  - _e.g._ [tele]phone numbers, zip codes

- What pseudo CSS selectors are available for styling valid and invalid inputs?

  - `:valid`
  - `:invalid`

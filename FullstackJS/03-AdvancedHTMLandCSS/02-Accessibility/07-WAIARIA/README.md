# WAI-ARIA

> _Web Accessibility Initiative's_ **Accessible Rich Internet Applications** _specification_

- Extension of regular HTML standards
- For modifying the _semantics_ or _context_ of elements
  - Nothing else!

## Five (5) Rules of ARIA

> No ARIA is better than Bad ARIA!

1. Always use native HTML elements and attributes over ARIA when possible.
2. Never change native semantics, unless you have no other choice.
3. All interactive ARIA controls must be usable with a keyboard.
4. Never use `role='presentation'` or `aria-hidden='true'` on focusable elements.
5. All interactive elements must have an accessible name.

## ARIA Labels

HTML attributes for ARIA

### `aria-label`

- Labels elements for screen readers
- Does not work for every element
- Works best if element is not already described by another, e.g. the `<label>` element

### `aria-labelledby`

- Overrides native labels and the `aria-label` attribute
- Refers to the `id` of another element used as the label
- Can use multiple IDs, even the element itself that is using it
- Can reference hidden elements

### `aria-describedby`

- Refers to the `id` of another element used as the description
- Used by assistive technologies when the element it is on receives focus

## Hiding

### `aria-hidden`

- Hides element from assistive technologies

## Knowledge Check

- What purpose does WAI-ARIA serve?

  - To fill in the leftover gaps not covered by the HTML standard in terms of accessibility

- What are the four things ARIA can’t do?

  - Styling
  - Interactivity
  - Focus
  - Event handling

- What are the five rules of ARIA?

  - Prefer native elements over ARIA
  - Do not override native semantics unless absolutely necessary
  - ARIA controls must be keyboard-usable
  - Do not hide focusable elements
  - Interactive elements must have an accessible name

- What is the accessibility tree?

  - Similar to the DOM
  - But only contains information used by assistive technologies, e.g.
    - Name of an element
    - Description of an element

- What are the differences between the three ARIA labels?

  - `aria-label` receives the actual label string itself, used as the name of the element
  - `aria-labelledby` receives an ID of another element, to which the name labelling is deferred
  - `aria-describedby` is similar to `aria-labelledby` but "labels" the description instead of the name

- What does the `aria-hidden` attribute do?

  - Hides the element from assistive technologies
  - Does not do anything to the element's ability to be focused on

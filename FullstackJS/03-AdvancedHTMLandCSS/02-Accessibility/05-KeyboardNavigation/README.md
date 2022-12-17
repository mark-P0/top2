# Keyboard Navigation

- The proper elements for a purpose (e.g. semantically, for interaction) likely has built-in _focus_ properties and _event_ handling

  - When improper elements are used, focus and event handling must be added **manually** to boost accessibility (_It is as tedious as it sounds_ :))
  - Without these users whose preferred navigation method rely on these will suffer greatly, and hurt the accessibility of the site

- Do not _completely_ remove focus styles; either...

  - leave them as is
  - _replace_ them

- Be mindful of the tab order of the site elements

  - Use the `tabindex` HTML property to explicitly set this
  - Or just remember that the default tab order is the top-down sequence of elements in the HTML

- Properly hide elements meant to be hidden from assistive technologies

  - These parse the underlying source, and so visually hiding elements is not enough
  - Via HTML
    <!-- prettier-ignore -->
    ```html
    <p tabindex="-1">
      Hidden via the <code>tabindex="-1"</code> property <br>
      This is still focusable via JS though <br>
      (using the <code>focus()</code> method)
    </p>
    ```
  - Via CSS

    ```css
    .hide-via-display {
      display: none;
    }

    .hide-via-visibility {
      visibility: hidden;
    }
    ```

## Knowledge Check

- What are two things that interactive elements must have for keyboard users?

  - Able to be focused
  - Event handling

- What are focus styles?

  - Visual properties that indicate when an element is currently in focus

- Why should you never completely remove focus styles from an element?

  - Because users will not be able to determine what element currently has focus
  - Some users prefer to navigate sites and interactive elements via focus toggling

- What is the tab order?

  - The sequence by which elements receive focus
  - This is done via the `Tab` key, hence the name

- What is the best way to hide hidden content from assistive technologies?

  - Via CSS rules
    `display: none;` or `visibility: hidden;`

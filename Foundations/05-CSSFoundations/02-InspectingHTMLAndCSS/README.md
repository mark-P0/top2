# Inspecting HTML and CSS

- Not much files generated in this section
- Assignment links to Chrome documentation for DevTools, but I use Firefox which has a very similar tool

## DevTools differences between Firefox and Chrome

- Can't edit element attributes directly?
- **Edit as HTML** does not auto-complete, auto-close tags
- Context menu **Force State** is **Change Pseudo-class** instead
- `$0` outputs the object itself in verbose, not a rendered version
- **Store as global variable** does not exist in the context menu
- **Copy > Copy JS Path** does not exist

## Knowledge Check

- How do you select a specific element on your page with your browser’s developer tools?
  - Right-click the element and select **Inspect**
- What does a strikethrough in a CSS element mean in your browser’s developer tools?
  - The rule is being overriden, or at the very least not applied
- How do you change CSS in real time on specific elements of a web page with your browser’s developer tools?
  - Add styles to the element itself using the CSS panel (will be converted to inline CSS)
  - Modify the rules that select a particular element

# Accessibility Auditing

## Built-in

- **Accessibility Tree** in Chrome DevTools
  - `Elements` tab
  - `Accessibility` sub-tab (along with e.g. `Styles`, `Computed`, `Layout`)
  - View a stripped-down version of the DOM with only the accessibility-related information
  - _Optionally_, tick `Enable full-page accessibility tree` to show a toggle between the DOM and Accessibility Tree in the main DOM viewer itself

## Third Party

- Lighthouse
  - Chrome's auditing tool
  - Classified as third-party because [it started as a Chrome extension](https://github.com/GoogleChrome/lighthouse#using-the-chrome-extension)
    - Albeit one that is developed by Google itself
    - Is now built-in on modern Chrome
  - `Lighthouse` tab (along e.g. `Elements`, `Console`)
  - Also very useful for PWA, performance auditing, SEO, and best practices
- [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
  - Chrome extension
  - [Underlying technology for Chrome's Lighthouse](https://developer.chrome.com/docs/devtools/accessibility/reference/#axe)
- [WebAIM WAVE](https://wave.webaim.org/)
  - Web app

## Knowledge Check

- What are some of the various accessibility features available in your browser’s DevTools?

  - Accessibility tree
  - Color contrast ratio
  - Viewing parsed ARIA attributes

- Which third party accessibility auditing tool is available in the Chrome DevTools by default?

  - Lighthouse

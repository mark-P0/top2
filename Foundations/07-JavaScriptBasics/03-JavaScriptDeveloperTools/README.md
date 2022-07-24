# JavaScript Developer Tools

## Opening Dev Tools

- Chrome menu → **More Tools** → **Developer Tools**
- `RMB` → **Inspect**
- Shortcut: `F12`
- Shortcut: `Ctrl` + `Shift` + `C`

## Assignment

### Chrome DevTools Documentation

#### CSS

- [x] ~~View and Change CSS~~
  - _Already went through in CSS section_
- [x] CSS features reference

#### DOM

- [x] ~~Viewing and changing the DOM~~
  - _Already went through in CSS section_

#### Console

- [x] Overview

  - `console.table()` may come in handy...
  - View source `.js` file in DevTools
  - Filtering console outputs
  - Have to get used to using different `console` methods...
  - `document.querySelector(selector)` One function to ~~rule them all~~ select any HTML element
    - Use CSS selectors syntax?
    - Shorthand `$(selector)` inspired by jQuery
  - `debug(functionName)` on the REPL will break `functionName` on its next execution for debugging
    - Effectively adds a breakpoint on the first line of the function

#### Mobile Simulation

- [x] Device Mode
  - Override device specifications
    - CPU
    - Network type / speed
  - Override sensor data
    - Location (GPS)
    - Orientation (Gyroscope)

#### JavaScript

- [x] Debugging
  - Breakpoints
  - Source editing

## Knowledge Check

- How do you open developer tools?

  - `F12`
  - `Ctrl` + `Shift` + `C`
  - `RMB` → **Inspect Element**

- How do you change screen size of a website using developer tools?

  - Activate **Device Mode** on DevTools and manipulate responsive viewport

- What is a breakpoint?

  - A _point_ or line of code at which execution will be _broken_, i.e. interrupted for inspection and debugging

- How do you set a breakpoint?

  - On the DevTools

    - Line breakpoints
    - Event listener breakpoints
    - Exception breakpoints (caught or uncaught)
    - Function breakpoints

      ```js
      debug(functionToDebug);
      ```

      - Can be called on script itself

    - Changes on the DOM
    - `fetch()` breakpoints

# What is NodeJS?

## _"A JavaScript runtime"_

- JS normally runs in the browser
- JS code was exclusive for websites
- A runtime, e.g. Node, allows JS to be run outside of browsers, e.g. like regular programs

## JavaScript runtimes

- Node
  - The _de-facto_ standard
  - Almost synonymous with "JS runtime"
- Deno
  - Different enough from Node
  - TypeScript-first
  - Has Windows support
  - Has its own way of managing packages
- Bun
  - Drop-in replacement for Node
  - TypeScript-first
  - Has no Windows support (so far)
  - Compatible with `npm`

## Knowledge Check

- What is Node?
  - A JavaScript runtime
  - Uses Google Chrome's V8 engine
  - Allows JS code to be executed outside of a browser
  - JS code without routing through an HTML file
  - Can be treated like Python's interpreter
    <!-- prettier-ignore -->
    ```bash
    python main.py  # Run Python file
    node main.js    # Run JS file
    ```
  - Adds functionality for local file access, as well as either initiate or receive network connections (via HTTP)
  - _Asynchronous_
    - JS uses single thread
    - Concurrency is achieved via [delayed] callbacks, `Promise`s
  - _Event-driven_
    - Callbacks are executed (as promised) when a particularly event has occurred or is true

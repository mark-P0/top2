# What is NodeJS?

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

# Async and Await

> `async`-`await` is, put simply, a "syntactic sugar" over the Promises API to write async code in a sync manner
>
> I am already quite familiar with the language feature through videos like:
>
> - [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
> - [Async Await try-catch hell](https://www.youtube.com/watch?v=ITogH7lJTyE)

- `async` functions return Promises
  - `return` resolves the promise
  - Throwing errors rejects the promise
- `await` can only be used inside `async` functions
  - Some runtimes (e.g. Node, Deno) allow top-level `await` without `async` functions
  - In browsers, module scripts also allow top-level `await`
- `await` can be used on Promises (which also includes `async` functions)

## Knowledge Check

- How do you declare an async function?

  ```js
  async function name() {
    /* ... */
  }

  (async function () {});

  async () => {};
  ```

- What does the async keyword do?

  - Declare a function as asynchronous
  - Set it to return a Promise instead of a regular value

- What does the await keyword do?

  - Encapsulate the `.then()` functionality of Promises
  - So that Promises may be written in a declarative top-bottom structure

- What is returned from an async function?

  - A Promise

- What happens when an error is thrown inside an async function?

  - The return Promise is rejected

- How can you handle errors inside an async function?

  - Using the `try`-`catch` block

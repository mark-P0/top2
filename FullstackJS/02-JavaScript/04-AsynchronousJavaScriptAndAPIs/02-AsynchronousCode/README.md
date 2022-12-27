# Asynchronous Code

> I already know a fair bit about these through Fireship's videos
>
> - [JavaScript Promise in 100 Seconds](https://www.youtube.com/watch?v=RvYYCGs45L4)
> - [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
> - [Async Await try-catch hell](https://www.youtube.com/watch?v=ITogH7lJTyE)

## Knowledge Check

- What is a callback?

  - A callback is a regular function that is "called back" at a later point in time
  - A reference to a function is passed to another process (e.g. another function) which might perform time-intensive
  - After finishing, it will invoke the function passed to it, maybe passing the results of its operation

- What is a promise?

  - A promise is an object which serves as a representation of a value which may or may not exist in the future

- When should you use promises over callbacks?

  - Promises allow for a somewhat declarative style of writing asynchronous code
    - Flatter / shallower
    - Not deeply nested (callback hell)
  - Allows for easier error-handling
    - Each promise will either evaluate to a proper value, or error out
    - Each potential error can be handled out
    - Or a single error catcher can be used for the whole promise chain

- What does the `.then()` function do?

  - Assigns a callback to a promise, which the promise will call once it resolves to a proper value
  - This assigned callback often receives at least 1 argument, which is the resolved value

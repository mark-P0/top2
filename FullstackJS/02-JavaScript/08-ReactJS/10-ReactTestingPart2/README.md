# React Testing Part 2

## Knowledge Check

- How can you mock a callback handler?

  - Component must be given the callback somehow, e.g. via
    - Props
    - Context
  - Provide a callback that is created from a mocking method, e.g.
    - [`jest.fn()`](https://jestjs.io/docs/mock-functions)
  - Create assertions around the mocked function as tests, e.g.
    - How many times was the function called?
    - What arguments were given to it?

- How can you mock a child component?
  - Implement a barebones blueprint of the component to be mocked
  - Declare only the props that is necessary for validation

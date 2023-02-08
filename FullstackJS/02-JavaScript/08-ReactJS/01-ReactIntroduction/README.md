# React Introduction

> I am already a bit familiar with React and JSX.
>
> I used functional components before though.

## `create-react-app` Alternatives

> CRA hides a LOT of things and is rather slow

> [7 better ways to create a React app](https://www.youtube.com/watch?v=2OTq15A5s0Y) by **Fireship**
>
> 1. _Instant development environment_, e.g.
>    - StackBlitz
>    - CodeSandbox
> 2. Vite
>    - Webpack
> 3. Nx
> 4. NextJS (_metaframework_)
> 5. Remix
> 6. Gatsby
> 7. Astro

- Manual
  - Webpack + React
- Vite
- Astro

## Knowledge Check

- Why should you learn React?

  - React has been the de-facto standard for websites and web applications in the recent years
    - Very popular, has lots of examples, userbase, and codebase
  - Relatively gentle learning curve, as its essentially just a "library" for creating reactive components, as opposed to full-fledge framework alternatives

- What is JSX?

  - Extended JavaScript
  - Allows HTML within JS files

- What is a React Component?

  - Building blocks of a React application
  - A small reusable section of the site/app, written via React
    - The concept is not exclusive to React!
    - Can write components without React!

- What is the difference between a functional and a class component?

  |         | Functional | Class                              |
  | ------: | :--------- | :--------------------------------- |
  |  Syntax | `function` | `class` block                      |
  |   State | Hooks      | Methods (existing from base class) |
  | Imports | Lean       | Heavy                              |
  |    Code | Concise    | Verbose                            |

- How should you structure your application into components?

  - Break the design out into several parts
  - Write a JSX file for each part
  - Each component will be a class (or functional) React component
  - Write the HTML for the component in the `render()` method

- What does create-react-app do?

  - Initializes a React application from which development may begin

- Instead of the DOM tree, what is displayed when you inspect an element using the Components tab provided by React Developer Tools

  - React components

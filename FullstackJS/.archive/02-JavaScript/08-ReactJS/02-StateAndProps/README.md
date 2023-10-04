# State and Props

## Knowledge Check

- How do you pass functions, state, or other values between components?

  - As "props" (properties) of the other component

- What is the purpose of state in a React component?

  - State allows React components to "react" to changes and update itself accordingly

- Explain the importance of using setState() instead of mutating state directly?

  - `.setState()` must be called because this has an extra mechanism which allows "other components" dependent upon it to update as well

- What is the difference between functional and class components and how does their syntax for handling props differ?

  - Functional components have a much more concise syntax and avoids the intricacies of `this`
  - Functional components receive props as arguments, whereas classical components receive them via the constructor
  - Functional components maintain state using hooks, whereas classical components set them as a property

- How do you attach event listeners to elements in React components?

  - React components do not use event listeners
  - Listeners are instead assigned directly to the event properties of elements, e.g. `onclick`
    - Not to be confused with the `'click'` event

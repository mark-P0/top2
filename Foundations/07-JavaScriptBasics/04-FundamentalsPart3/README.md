# Fundamentals Part 3

All about **functions**!

- Reusable blocks of code
- Behavior can be changed with arguments

## Built-ins & Methods

### Built-in functions

- e.g. `parseInt()`
- Global _functions_ are increasingly being scoped into global _objects_ as of ES6
  - See this [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) on e.g. `Number.parseInt()`
    > This method has the same functionality as the global `parseInt()` function ... and is part of ECMAScript 2015 (its purpose is modularization of globals).

### Methods

- Functions within objects
- Some examples:
  ```js
  Number.parseInt();
  Number.parseFloat();
  Math.random();
  Math.floor();
  ```

## Creation

### Function declaration

```js
function myFunctionName(parameters) {
  /* Reusable statements */
}
```

- Regular JS functions
- Hoisted

### Anonymous functions

```js
const myAnonFunction = function (parameters) {
  /* Reusable statements */
};

// Wrap in parentheses to evaluate without a name
(function (parameters) {
  /* Reusable statements */
});
```

- Functions without names
- **NOT** hoisted, i.e. _inline_
- Technically considered as **function expressions**
- Requires a name, assignment to a variable
  - Wrap in parentheses to evaluate without a name
  - Usually used in an **IIFE** pattern

### Arrow functions

```js
(parameters) => {
  /* Reusable statements */
};

(parameters) => (
  /* Single expression */
);
```

- Truly anonymous function
  - Can stand without a name
- Shorthand function expression
  - Also means it is not hoisted
- Usually used with only a _single-expression body_
  - Also referred to as an **implicit return**
- Think **lambda functions** in Python
- Has subtle differences with regular functions, e.g. with `this` bindings

## Invocation

```js
function myFunction() {
  /* Do something... */
}

myFunction(); // Invocation, i.e. actual execution
```

- Append `()` on function name
- Invocation is fancy word for "calling", "execute", or "run"

### Immediately-invoked function expressions (IIFEs)

```js
// As anonymous function
(function (parameters) {
  /* Statements that are called executed immediately */
})(args);

// As arrow function
((parameters) => {
  /* Statements that are called executed immediately */
})(args);
```

- Run function expression immediately after creation
- Useful for scoping
- Was very prevalent in old JavaScript
- Is not as common in modern JavaScript, maybe even discouraged

## Parameters

```js
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

/*  'Mark' is the parameter/argument
 *  It is passed to the `sayHello` body as `name`
 */
sayHello('Mark'); // 'Hello, Mark!'
```

- Also known as arguments, properties, or attributes.
  - **Parameters**. Names defined on the function blueprint.
  - **Arguments**. Actual values passed to function when called according to their parameters.
- Changes the behavior of the function.

### Optional parameters

<!-- prettier-ignore -->
```js
/*  Parameter `name` has a default value of '[ANONYMOUS]'
 *  Calling `sayHello` does not require an argument for `name`
 */
function sayHello(name = '[ANONYMOUS]') {
  console.log(`Hello, ${name}!`);
}

sayHello();       // 'Hello, [ANONYMOUS]!'
sayHello('Mark'); // 'Hello, Mark!'; still works fine even with an argument
```

- Function parameters with default values
- Calling functions with optional parameters does not require arguments
  - Still can be done though
- Some built-in methods have optional parameters
  - `Array.join()` joins array elements with `','` by default

## Scoping

- JS code linked using `<script>` elements are put into the **global scope** by default
- Possible solution are **ES6 modules**
  - Limits exposed names to those explicitly exported by a module
  - Top-level names within files are scoped only within the file itself

## Returns

```js
function sayHello(name) {
  return `Hello, ${name}!`;
}

let result = sayHello('Mark');
console.log(result); // 'Hello, Mark!'
```

- A value that functions evaluate to
- i.e. **final value** of functions

## Naming

<!-- prettier-ignore -->
```js
showMessage(...)     // shows a message
getAge(...)          // returns the age (gets it somehow)
calcSum(...)         // calculates a sum and returns the result
createForm(...)      // creates a form (and usually returns it)
checkPermission(...) // checks a permission, returns true/false
```

- Must be concise and descriptive
- Start with a verb
- Common prefixes:
  - `get…` – return a value
  - `calc…` – calculate something
  - `create…` – create something
  - `check…` – check something and return a boolean, etc.
- One function, one action
- If you describe a function and you find yourself using "and", it's usually a sign that the function does too many things
  > This function does something **and** another thing
  - Break this function down into even smaller functions!

## Callbacks

```js
function showResults(isCorrect, callbackCorrect, callbackIncorrect) {
  if (isCorrect) {
    callbackCorrect();
  } else {
    callbackIncorrect();
  }
}

function showRight() {
  console.log('You are correct!');
}

function showWrong() {
  console.log('That is wrong.');
}

showResults(true, showRight, showWrong);
showResults(false, showRight, showWrong);
```

- Functions are _first-class citizens_
- They can be passed around into _other functions_ just like variables
- i.e. they are also "values"
  - **Variables** represent data
  - **Functions** represent actions

## Knowledge Check

- What are functions useful for?

  - Functions are useful for bundling repeatable lines of code together
  - It is also useful for bundling lines of code whose behavior can be modified by an identifiable set of common fields

- How do you invoke a function?

  <!-- prettier-ignore -->
  ```js
  function myFunction() {
    console.log('This is my function!');
  }

  myFunction;   // Gives the specifications of the function itself;
  myFunction(); // 'This is my function!'
  ```

  - By appending parentheses `()` on the function name

- What are anonymous functions?

  - Anonymous functions are function blocks with **no name**
  - They were traditionally used as defining callback behavior

- What is function scope?

  - The block of the function definition
  - The function body
  - Enclosed by braces `{}`
  - The area in which the function lines are defined

- What are return values?

  - The final value to which functions evaluate to
  - After invoking / calling / running a function, the invocation expression will essentially be replaced by its return value

- What are arrow functions?

  ```js
  (parameters) => {
    /* function statements */
  };

  (parameters) => (
    /* single expression body */
  );
  ```

  - Function expressions (like anonymous functions)
  - Essentially a shorthand for anonymous functions
  - More concise function definition; only requires the parameter list, the function block (or single expression), and an arrow `=>` separating them
  - Arguably a more readable function syntax
  - May be referred to as _lambda functions_ in other languages (C#, Python), which is specifically synonymous to _anonymous functions_

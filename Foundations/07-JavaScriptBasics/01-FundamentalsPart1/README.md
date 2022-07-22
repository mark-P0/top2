# Fundamentals Part 1

## How to run JavaScript code

Generally ran within a browser, via an HTML file, using a `<script>` element

- Also possible outside of a browser using Node, but this will be covered in later lessons

### Internal JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
  </head>

  <body>
    <script>
      /* Add JavaScript code here */
      console.log('Hello, World!');
    </script>
  </body>
</html>
```

- Create an HTML file
- Add the snippet above
- Open the HTML file on a browser
  - VSCode's **Live Server** extension would also work
- Open the dev tools
  - i.e. "Inspect Element"
- Go to the Console tab
- See the JavaScript output

### External JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
  </head>

  <body>
    <!-- Add JavaScript file here -->
    <script src="javascript.js"></script>
  </body>
</html>
```

- Uses the same procedure as above
- Must have a file `javascript.js` in the same directory as the HTML file
- Can have any other filename, e.g. `index.js`, `script.js`

### `<script>` placement

https://www.youtube.com/shorts/cXwnJKflxas

- Usually placed at the end of HTML `<body>`
  - So that it can have access to the HTML elements
- Can also be placed in `<head>`
  - Will run at the start
  - No access to `<body>` elements
- `defer` attribute
  ```html
  <html>
    <head>
      ...
      <!-- Deferred JavaScript -->
      <script src="./script.js" defer></script>
      ...
    </head>
    <body>
      ...
    </body>
  </html>
  ```
  - Load the script after all the HTML elements has loaded
  - Provides access to HTML elements
  - Executes code only **after** the HTML and CSS
  - Will be treated as if the `<script>` element is placed at the end of `<body>` even if it is actually on the `<head>`
- `async` attribute
  ```html
  <html>
    <head>
      ...
      <!-- Async JavaScript -->
      <script src="./script.js" async></script>
      ...
    </head>
    <body>
      ...
    </body>
  </html>
  ```
  - Also loads the script after all the HTML elements
  - Also provides access to HTML elements
  - Executes code **as soon** as they are loaded, in parallel with HTML and CSS loading

<!--
  JavaScript `<script>` tags
  `async` vs `defer` vs end-of-`body`
  -->

## Variables

Variables are declared using one of three methods:

- `let`
  - Variables whose values can change
  - Kind of like math, e.g. "_Let x be the sum of 1 and 2..._"
    ```js
    let x = 1 + 2;
    ```
  - However, `x` can have a different value later in the code, e.g.
    ```js
    let x = 1 + 2;
    x = 3 * 4;
    ```
  - Declaration of the same variable name can only happen once
    ```js
    let x = 1 + 2;
    x = 3 * 4;
    let x = 10 / 5; // Error; `x` is already declared
    ```
- `const`

  - _<strong>Const</strong>ant_ variables
  - Variables whose values **CANNOT** change
  - In the following example, the value of `x` can only be the one that it is initialized with
    ```js
    const x = 1 + 2;
    x = 3 * 4; // Would error out; `x` cannot change
    const x = 10 / 5; // Cannot be re-declared either
    ```
  - Use `UPPER_CASE` names for "hard-coded" constant values, and regular `camelCase` ones for calculated / derived "constant" values, e.g.

    ```js
    const BIRTHDAY = '18.04.1982'; // Hard-coded

    const ageCalculated = getAgeFromBirthday(BIRTHDAY); // Derived
    ```

- ~~`var`~~
  - **HIGHLY DISCOURAGED**
  - Used to be the only way to declare JavaScript variables
    - Most tutorials use `var`, but that has started to change recently
  - Has some hoisting shenanigans going on, which adds to the cognitive load of coding
    - `var` variables are declared at the top of the code, i.e. hoisted
    - `let` and `const` are also technically hoisted to the top, but they are not **initialized**
    - `var` variables are initialized as `undefined`
  - `let` and `const` are preferred, and has functionally replaced `var`

## Numbers

### Operations

| Operation                  | Operator | Example           |
| :------------------------- | :------: | :---------------- |
| Addition                   |   `+`    | `let x = 1 + 2;`  |
| Subtraction                |   `-`    | `let x = 3 - 4;`  |
| Multiplication             |   `*`    | `let x = 5 * 6;`  |
| Division<sup>1</sup>       |   `/`    | `let x = 7 / 8;`  |
| Remainder<sup>2</sup>      |   `%`    | `let x = 9 % 10;` |
| Increment                  |   `++`   | `x++;` `++x;`     |
| Decrement                  |   `--`   | `x--;` `--x;`     |
| Exponentiation<sup>3</sup> |   `**`   | `let x = 2 ** 8;` |

<sup>1</sup> Performs _integer division_ whenever possible, i.e. automatically casts into a rounded result if there are no decimal part, unlike for example in Python in which division always results in a floating number.

<sup>2</sup> `%` is also known as the _modulo_ operator, but does not perform actual modulo in JavaScript, and is better referred to as _remainder_. More information available in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description).

<sup>3</sup> Introduced in ES2016 (ES6). Replaces traditional `Math.pow(b, e)` method.

&nbsp;

There are also corresponding assignment shorthands for each operators, e.g.

```js
let x = 12;

x += 34; // Shorthand for `x = x + 34;`
```

Most operators are **binary**, meaning they need two operands

```js
/*  1234 : Operand 1
 *  +    : Operator
 *  5678 : Operand 2
 */
let x = 1234 + 5678;
```

Some operators can be **unary**, operating only on one operand

```js
/*  -   : Unary "subtraction" (Negation)
 *  123 : Operand
 */
let x = -123;

/*  +   : Unary "addition" (Plus)
 *  456 : Operand
 */
let y = +456;

/*  Unary operations is a convenient way to convert numeric strings to actual numbers
 */
let z1 = +'1234'; //  1234 (number)
let z2 = -'1234'; // -1234 (number)
```

### Precedence

- _A bit too long to note all down..._
- Essentially PEMDAS, strictly left to right
  - Parentheses
  - Exponents
  - Multiplication
  - Division
  - Addition
  - Subtraction
- Best practice is to **always group with parentheses**! For clarity and intent!

### "Types"

JavaScript _technically_ only has one (1) number type, `number`, unlike other languages, e.g. Python, which has `int` and `float`

| Form                   | Example           |
| :--------------------- | :---------------- |
| Without decimals       | `let x = 12345;`  |
| With decimals          | `let x = 123.45;` |
| In scientific notation | `let x = 123e5;`  |

### Precision

- JS numbers are **64-bit** floating point

  - IEEE 754 standard
  - `0 - 51` value bits (fraction | mantissa)
  - `52 - 62` exponent bits
  - `63` sign bit

- Integer precision

  - Accurate up to 15 digits
  - Maximum of 17 digits

  ```js
  let x = 1234567890123456789; // Will be 1234567890123456700

  Number.MAX_SAFE_INTEGER; // 9007199254740991 (2^53 - 1)
  ```

- Float precision

  - Decimal numbers are susceptible to [rounding errors](https://en.wikipedia.org/wiki/Round-off_error)

  ```js
  let x;

  x = 0.1 + 0.2; // Will be 0.30000000000000004

  x = (0.2 * 10 + 0.1 * 10) / 10; // Possible fix, but clunky

  Number.MAX_VALUE; // 1.7976931348623157e+308
  ```

### Addition, strings, and concatenation

- `+` for _numbers_ is **addition**, i.e. proper arithmetic
- `+` for _strings_ is **concatenation**, i.e. appending to the end

```js
let x;

/* Number + Number = Number (Addition) */
x = 1 + 2; // 3

/* Number + String = String (Concatenation) */
x = '123' + 456; // '123456'

/* String + String = String (Concatenation) */
x = '123' + '456'; // '123456'
```

- With other operators, numeric strings are _implicitly_ converted to actual numbers, and proper arithmetic is performed

<!-- prettier-ignore -->
```js
/* Subtraction */
12 - 34;      // -22
'12' - 34;    // -22
'12' - '34';  // -22

/* Multiplication */
12 * 34;     // 408
'12' * 34;   // 408
'12' * '34'; // 408

/* Division */
12 / 34;     // 0.35294117647058826
'12' / 34;   // 0.35294117647058826
'12' / '34'; // 0.35294117647058826
```

### Special Numbers

- `NaN`

  ```js
  typeof NaN; // 'number'
  ```

  - Result of invalid arithmetic operations, e.g. with non-numeric operands
    ```js
    123 + 'string'; // '123string'  // Concatenation
    123 - 'string'; // NaN
    123 * 'string'; // NaN
    123 / 'string'; // NaN
    ```
  - Arithmetic operations with `NaN` as an operand will also result in `NaN`
    ```js
    NaN + 456; // NaN
    NaN - 456; // NaN
    NaN * 456; // NaN
    NaN / 456; // NaN
    NaN + '456'; // 'NaN456'  // Concatenation
    NaN - '456'; // NaN
    NaN * '456'; // NaN
    NaN / '456'; // NaN
    ```

- `Infinity`

  ```js
  typeof Infinity; // 'number'

  1234567890123456789 ** 1234567890123456789; // Infinity
  ```

  - Arbitrarily larger numbers
  - Values larger than `Number.MAX_VALUE` (largest possible number?)
  - Division by 0 also results to `Infinity`
    ```js
    123456789 / 0; // Infinity
    ```

- Hexadecimal numbers

  - Prefixed with `0x`
    ```js
    0xff; // 255
    ```
  - Base-16 numbers
    - Regular JS numbers are Base-10 (decimal)
  - Use `.toString()` method of numbers to convert from decimal to other bases
    <!-- prettier-ignore -->
    ```js
    (1234).toString(2)   // '10011010010' | Binary
    (1234).toString(8)   // '2322'        | Octal
    (1234).toString(10)  // '1234'        | Decimal
    (1234).toString(16)  // '4d2'         | Hexadecimal
    (1234).toString(32)  // '16i'         | Base-32
    (1234).toString(36)  // 'ya'          | Base-36; maximum supported
    (1234).toString(37)  // error
    ```

- ~~`Number` objects~~

  ```js
  let x;

  /* Primitive values (Normal) */
  x = 1234;

  /* Objects */
  x = new Number(1234);
  ```

  - **Discouraged!**
  - Primitives are much better than objects

### `Number` methods

- `Number.toFixed()`

  ```js
  (123.456).toFixed(2); // '123.45'
  ```

  - Alternative to traditional `Math.round()` procedure
  - Returns a `string`

- `Number.parseInt()`

  ```js
  Number.parseInt('1234');
  +'1234';
  ```

  - Commonly used to convert numeric strings to actual numbers
  - Modularized counterpart of the global `parseInt()` function
  - Alternative is unary `+`

- `Number.parseFloat()`
  - Just like `Number.parseInt()` but for decimals

## Knowledge Check

- Name the three ways to declare a variable

  - `let`
  - `const`
  - `var`

- Which of the three variable declarations should you avoid and why?

  - `var`. Initializes to `undefined`, hoists to the top of the execution context

- What rules should you follow when naming variables?

  - Descriptive names / nouns
  - At most three (3) words if possible
  - First character must NOT be a digit
  - Alphanumeric (either case), `$`, and `_`
  - `camelCase`

- What should you look out for when using the `+` operator with numbers and strings?

  - `+` with numbers result to numbers
  - `+` with strings result to strings
  - `+` with both numbers and strings result to strings

- How does the `%` operator work?

  - Divides the operands as much as possible and returns the remainder

- Explain the difference between `==` and `===`.

  - `==`. Loose equality. Compares values. Attempts to convert operands to comparable types.
  - `===`. Strict equality. Compares types as well. Does not convert operands.

- When would you receive a `NaN` result?

  - When performing invalid arithmetic operations

- How do you increment and decrement a number?

  - Either with a postfix or prefix operator
  - `c++`, `++c`. Increment
  - `c--`, `--c`. Decrement

- Explain the difference between prefixing and post-fixing increment/decrement operators.

  - **Prefix**. Performs operation on value, modifying it before returning.
  - **Postfix**. Returns [original] value then performs operation on it to modify the original.

- What is operator precedence and how is it handled in JS?

  - Kind of like PEMDAS
  - There's a lot of rules to follow

- How do you access developer tools and the console?

  - `F12`, or _Inspect Element_
  - Then select the **Console** tab

- How do you log information to the console?

  - `console.log()`
  - Or enter expressions in the browser console

- What does unary plus operator do to string representations of integers?

  - Convert them to an actual `number` type

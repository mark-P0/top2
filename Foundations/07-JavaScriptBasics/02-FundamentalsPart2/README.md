# Fundamentals Part 2

## Strings

### Creating strings

#### Primitives

- With single `''` or double `""` quotes

  ```js
  const stringSingles = 'I am a string!';
  const stringDoubles = 'I am also string!';
  ```

- With backticks `` ` ` ``, i.e. **template literals**

  ```js
  const stringLiteral = `String!`;

  const stringLiteralQuotes = `I've got no problem with 'single' or "double" quotes within!`;

  let variables = someValue();
  const stringLiteralVars = `I can take ${variables} too!`;
  ```

  - Used for templating

    - Think _f-strings_ in Python
    - Or `printf()` in C, C++, or Bash

  - Alternative to concatenation, which can be unreadable

    <!-- prettier-ignore -->
    ```js
    let value = anotherValue();
    const stringConcat = 'Concatenate variable (' + value + ') to a string.';

    const stringConcatExpr = 'Concat expression result: [' + (1 + 2 - 3 * 4 / 5) + '] to the string';
    ```

  - Variable interpolation can be _primitive_ values or _objects_

    - **Primitives**. Numbers, Booleans, etc.
    - **Objects**. Invokes object's `.toString()` method

  - Can also be used to create **multiline** strings

    <!-- prettier-ignore -->
    ```js
    const stringMultiline = `
    I am a string
      I will be indented if the multiline string contents are also indented
    This is problematic if the string is inside a block
    `

    function stringMultilineBlocked() {
      return `
        This multiline string will be indented several times
      `
    }

    const stringJoinedArray = [
      'This approach might be more preferable',
      "It's a bit more readable for me",
      "Indention is not an issue",
      'Multiline strings are essentially several string lines joined with an `\n`'
      "Empty lines are just empty strings",
      '',
      'Variables can be inserted as is:',
      someValue(),
      `Or inline with a string literal! ${anotherValue()}`,
      'Array creation may be costly though',
    ].join('\n)
    ```

    - `'''This is a multiline string in Python'''`

- With `String()`

  ```js
  const stringPrimitiveWrapped = String('Hello, world!');
  ```

  - Still a primitive, like regular quoted strings
  - Should be unnecessary other than in extreme cases
  - Method calls on quoted primitive strings are automatically wrapped in `String()` before the methods are called

- ~~With `new String()`~~

  - **Discouraged!**
  - Creates an object!
  - Not primitive, non-performant

### Properties and methods

#### Length

`String.length`

- `len(str)` in Python
- Returns number of characters in the string, i.e. its length

#### Extracting parts

Methods for extracting a "substring".

All takes two (2) arguments, but has subtle differences.

Arguments are mostly index-based.

- `String.slice(start, end)`

  - `start` Index of character on which substring will begin
  - `end` Index of "boundary" character; it is **excluded** from the substring
    - If omitted, will slice string from `start` to last string character
  - **Can take negative indices**
    - Will start from the end

- `String.substring(start, end)`

  - Mostly the same as `.slice()`
  - **Does NOT take negative indices**
    - Treated as 0, i.e. string start

- ~~`String.substr(start, length)`~~

  - **DEPRECATED**
    - See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)
  - Second parameter is **length** of substring, instead of index end
  - Ending index on source string will be `start + length`, exclusive

<!-- cSpell: disable -->

<!-- prettier-ignore -->
```js
// Indices 0123456789 321
let str = 'I am a string!';

str.slice(7)        // 'string!'         // From index-7 to end
str.slice(2, 9)     // 'am a st'         // Excludes index-9 'r'
str.slice(-3)       // 'ng!'             // From 3rd-to-last character

str.substring(7)    // 'string!'
str.substring(2, 9) // 'am a st'
str.substring(-3)   // 'I am a string!'  // Negatives treated as 0, i.e. string start

str.substr(7)       // 'string!'
str.substr(2, 9)    // 'am a stri'       // Length is 9
str.substr(-3)      // 'ng!'
```

<!-- cSpell: enable -->

#### Replacing parts

`String.replace()`

<!-- prettier-ignore -->
```js
const strExample = 'comma,separated,values,csv',

strExample.replace(',', '\t')      // 'comma\tseparated,values,csv'
                                   //       ✅        ❌    ❌

strExample.replace('CSV', '.csv')  // 'comma,separated,values,csv'
                                   //                         ❌

/* Global flag */
'comma,separated,values,csv'.replace(/,/g, '\t')      // 'comma\tseparated\tvalues\tcsv'

/* Case-Insensitive flag */
'comma,separated,values,csv'.replace(/CSV/i, '.csv')  // 'comma,separated,values,.csv'
```

- Only replaces first instance
- Case-insensitive
- Use **regular expressions** to for these cases
  - Like strings, but enclosed with backslashes `/ /`

#### Converting cases

`String.toUpperCase()` • `String.toLowerCase()`

```js
const strExample = 'I am a String!';

strExample.toUpperCase(); // 'I AM A STRING!'
strExample.toLowerCase(); // 'i am a string!'
```

#### Concatenation

~~`String.concat`~~

- **`+` `+=` operators are preferable than this method**
  - See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat#performance) note
- String literals `` `My string with ${variable}` `` may also be more readable
- Takes in an arbitrary number of arguments to append to source string

#### Removing whitespaces

`String.trim()` • `String.trimStart()` • `String.trimEnd()`

- `str.strip()` in Python
- Removes leading and trailing whitespaces (paddings)
- Includes all whitespace characters, e.g. spaces, tabs, nbsp
- Also includes line terminators, e.g. LF, CR

<!-- prettier-ignore -->
```js
const strExample = '    This is a padded string    ';

strExample.trim();      // 'This is a padded string'
strExample.trimStart(); // 'This is a padded string    '
strExample.trimEnd();   // '    This is a padded string'
```

#### Adding whitespaces

`String.padStart(length, str)` • `String.padEnd(length, str)`

- No catch-all ~~`String.pad()`~~ method

<!-- prettier-ignore -->
```js
const strExample = 'This will be padded';

strExample.padStart(32, ' ')  // '             This will be padded'
strExample.padEnd(32, '*')    // 'This will be padded*************'
```

#### Extracting characters

- `String.charAt(idx)`

  - Gets string character at index `idx`
  - Out-of-bounds indices return an empty string `''`

- `String.charCodeAt(idx)`

  - Gets Unicode (UTF-16) number of character at index `idx`
  - Out-of-bounds indices return `NaN`

- `String[idx]` (indexing)

  - Preferred way
  - Not the same as array indexing
  - Cannot perform assignments
  - Out-of-bounds indices return `undefined`

<!-- prettier-ignore -->
```js
let strExample = 'Hello, world!'

strExample.charAt(0)      // 'H'
strExample.charCodeAt(0)  // 72
strExample[0]             // 'H'

strExample[0] = 'h'       // Does not work, but also does not throw an error
console.log(strExample)   // 'Hello, world!'
```

#### String arrays

- `String.split(char)`

  - Separates string into an array at every `char` instance

- `Array.join(char)`

  - Combines array elements into a single string delimited with `char`

<!-- prettier-ignore -->
```js
'I am a string!'.split(' ')  // [ 'I', 'am', 'a', 'string!' ]

['Separated', 'by', 'spaces'].join(' ') // 'Separated by spaces'
```

#### Comparisons

- Inequalities

  <!-- prettier-ignore -->
  ```js
   'a' < 'b'   // true
  'aa' < 'aa'  // false
  'aa' < 'ab'  // true
  ```

  - "Alphabetical", "lexicographical", or "dictionary" order
  - More accurately, **Unicode** order (encoding table)

- Equality

  ```js
  'Hello, World!' === 'Hello, World!'; // true
  'Hello, World!' === 'hello, world!'; // false
  'My Name'.toUpperCase() === 'my name'.toUpperCase(); // true
  ```

  - Same string or not
  - Case sensitive
  - Convert to same cases for case-insensitive checking
    - Uppercase best due to UTF-8 conversion issues
    - Check [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#comparing_strings)

## Conditionals

### Relational operators

- `<`
  - Less than
- `>`
  - Greater than
- `<=`
  - Less than or equal to
- `=>`
  - Greater than or equal to
- `==`
  - Is _loosely_ equal to
- `===`
  - Is _strictly_ equal to

All has implicit type conversions except strict equality

### Comparisons

- Numbers

  <!-- prettier-ignore -->
  ```js
  1 < 2;       // true
  32 > 64;     // false
  100 === 100; // true
  ```

- Strings (letters)

  <!-- cSpell: disable -->

  <!-- prettier-ignore -->
  ```js
  'a' < 'b';           // true
  'abcd' > 'aabc';     // true
  'hello' === 'hello'; // true
  ```

  <!-- cSpell: enable -->

- Different types

  <!-- prettier-ignore -->
  ```js
  '2' > 1;   // true  // '2' implicitly converted to number
  '01' == 1; // true  // '01' converted to 1
  ```

  - Numeric strings are implicitly converted to actual numbers

- Strict equality `===`

  - Compares without type conversions

- `null` and `undefined`

  - Non-intuitive behavior
  - They loosely equal `==` each other
  - Do not use other comparisons with values that may be `null` or `undefined`
    - Check if they are `null` or `undefined` first
    - Nullish coalescing?

### Keywords • Blocks

The following keywords are case-sensitive

- `if`

  ```js
  if (condition) {
    /* Statements for when `condition` is `true` */
  }
  ```

  - ...

- `if`-`else`

  ```js
  if (condition) {
    /* Statements for when `condition` is `true` */
  } else {
    /* Statements for when `condition` is `false` */
  }
  ```

  - ...

- `if`-`else if`-`else`

  ```js
  if (condition1) {
    /* Statements for when `condition1` is `true` */
  } else if (condition2) {
    /* Statements for when `condition2` is `true` */
  } else if (condition3) {
    /* Statements for when `condition3` is `true` */
  } ... {
    /*  Can have as many `else if` blocks as desired
        Might not be very readable though
     */
  } else {
    /*  Statements for when none of the conditions are `true`
        Optional
        aka "default", "fallback"
     */
  }

  ```

  - ...

- `switch`

  ```js

  ```

  - ...

### Logical operators

The following are used to chain relational comparisons together, for conditionals

- `||` • OR

  <!-- prettier-ignore -->
  ```js
  false || false  // false
  false || true   // true
   true || false  // true
   true || true   // true
  ```

  - Uses two (2) operands
  - Returns `true` if **at least one** of its operands are true
  - In a chain of `||`, the first **truth-y** value is produced, defaulting to the last

    ```js
    /* Default to 0 (last value in chain) */
    undefined || null || 0;

    /* Default to 'Anonymous' if vars are not defined (nullish) */
    firstName || lastName || nickName || 'Anonymous';
    ```

  - Short-circuits

    <!-- prettier-ignore -->
    ```js
     true || alert('not printed');
    false || alert('printed');
    ```

    - Will not execute or evaluate expressions in the remainder of the chain if a truthy value has been found

- `&&` • AND

  <!-- prettier-ignore -->
  ```js
  false && false  // false
  false && true   // false
   true && false  // false
   true && true   // true
  ```

  - Uses two (2) operands
  - Returns `true` if **all / both** of its operands are true
  - In a chain of `&&`, the first **false-y** value is produced, defaulting to the last

    <!-- prettier-ignore -->
    ```js
       1 && 5               // 5
    null && 5               // null
       0 && 'truthy string' // 0
       1 && 2 && null && 4  // null
       1 && 2 && 3          // 3
    ```

- `!` • NOT

  <!-- prettier-ignore -->
  ```js
  !false  // true
  !true   // false
  ```

  - Uses one (1) operands
  - Returns the **inverse** of its operand, i.e. `true` if operand is `false` and vice versa
  - Double negation `!!` often used to convert values to `Boolean`

    - First `!` implicitly converts to _inverse_ boolean value
    - Second `!` inverts this back to the "original" boolean value
    - _i.e._ what the source value would be equivalent to if it is a boolean

    <!-- prettier-ignore -->
    ```js
    !!'truthy string'        // true
    !!null                   // false
    Boolean('truthy string') // true
    Boolean(null)            // false
    ```

- `??` • Nullish coalescing

  <!-- prettier-ignore -->
  ```js
          x ?? y          // x
          x ?? y          // x
  undefined ?? x          // x
       null ?? x          // x
  undefined ?? undefined  // undefined
       null ?? undefined  // undefined
  undefined ?? null       // null
       null ?? null       // null
  ```

  - Uses two (2) operands
  - Takes the left operand if it is not `null` or `undefined`
  - Otherwise, defaults to right operand
    - Even if it is `null` or `undefined` as well
  - `||` gives the first _truth-y_ value, whereas `??` gives the first _defined_
    - `0`, `''` (empty string), and `false` are all false-y, but may have actual meaning in different contexts
    - e.g. 0 units, blank inputs, non-selection

### Conditional operator

<!-- prettier-ignore -->
```js
/* `if`-`else` */
let result = condition ? trueResult : falseResult;

/* `if`-`else if`-`else` chain */
let anotherResult =
  condition1 ? result1
  : condition2 ? result2
  : condition3 ? result3
  : resultDefault;
```

- AKA **ternary operator** `?`
- Alternative to `if`-`else` blocks
- Cannot have blocks!
- Must resolve to a single expression only

## Assignments

Replit links

1. [`troubleshooting.js`](https://replit.com/@markP0/troubleshooting#troubleshooting.js=)
2. [`script.js`](https://replit.com/@markP0/enter-a-number#script.js)
3. [`math.js`](https://replit.com/@markP0/lets-do-some-math#math.js)
4. [`follow.js`](https://replit.com/@markP0/direction-follow#follow.js)

## Additional Resources

**Regular Expressions tutorial**, by NetNinja ([YouTube](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD))

## Knowledge Check

- What are the eight data types in JavaScript?

  1. `number`
  2. `boolean`
  3. `null`
  4. `undefined`
  5. `object`
  6. `string`
  7. `bigint`
  8. `symbol`

- Which data type is NOT primitive?

  - Objects

- What is the relationship between `null` and `undefined`?

  - Loosely equal

    ```js
    null == undefined; // true

    /* But are of different types */
    null === undefined; // false
    ```

  - Nullish types

- What is the difference between single, double, and backtick quotes for strings?

  - Essentially no difference between single and double quotes, except for characters that must be escaped

    - Called **string literals**
    - `''` would use escaped `\'` within it, e.g. apostrophes
    - `""` would use escaped `\"` within it, e.g. actual quotations

  - ` `` ` called **template literals**
    - Better method of concatenating and building strings
    - Allows for templating, variable interpolation
    - i.e. injects variables into strings
    - Would use escaped backticks `` \` ``

- What is the term for embedding variables/expressions in a string?

  - Templating?
  - Interpolation?

- Which type of quote lets you embed variables/expressions in a string?

  - Template literals
  - Assuming "quote" means the enclosing characters: **backticks**, ` `` `

- How do you embed variables/expressions in a string?

  - By using `${}` as placeholder and placing the variable or expression within the braces

  ```js
  let variable = someValue();
  const stringWithEmbeddedValue = `Result is: ${variable}`;
  ```

- How do you escape characters in a string?

  - By prefixing a `\` to the character to be escaped

  ```js
  const stringEscapedSingle = "It's a string!";
  const stringEscapedDouble = '"Don\'t worry!", they said...';
  const stringEscapedBacktick = `Actual backtick: \``;
  ```

- What is the difference between the `slice`/`substring`/`substr` string methods?

  - `slice`
    - Allows negative indices
    - Goes from `start` index to `end` index
  - `substring`
    - Basically the same as `slice`
    - Does not allow negative indices
    - Will set `end` as `start` if it is "smaller"
  - `substr`
    - Old, clunky, deprecated way
    - Must be forgotten
    - Second parameter is `length` instead of `end`
    - Will slice source string from `start` index up to but excluding `start + length` index character

- What are the three logical operators and what do they stand for?

  - `||` • OR
  - `&&` • AND
  - `!` • NOT

- What are the comparison operators?

  - `<` • Less than
  - `>` • Greater than
  - `<=` • Less than or equal to
  - `>=` • Greater than or equal to
  - `==` • Loosely equal to
  - `===` • Strictly equal to
    - Without implicit type conversions

- What are truthy and falsy values?

  - False-y
    - Values that are treated as boolean `false`
  - Truth-y
    - Values that are treated as boolean `true`
    - Every other primitive values

- What are the falsy values in JavaScript?

  - `false`
  - `0`
  - `''` (empty string)
  - `null`
  - `undefined`
  - `NaN` as well (I forgot)

- What are conditionals?

  - Blocks of code that only execute when a particular condition has been met

- What is the syntax for an `if`/`else` conditional?

  ```js
  if (condition) {
    /* Statements for when `condition` is `true` */
  } else {
    /* Statements for when `condition` is `false` */
  }
  ```

- What is the syntax for a `switch` statement?

  <!-- prettier-ignore -->
  ```js
  switch (value) {
    case condition1:
      /* Statements for when `condition1` is true  */
      break;  // Needed so that the next conditions will not be checked

    case condition2:
      /* Statements for when `condition2` is true  */
      break;

    case condition3:
      /* Statements for when `condition3` is true  */
      break;

    case conditionX:
      /* There can be an arbitrary amount of cases as desired  */
      break;

    default:
      /* Statements for when none of the conditions are met  */
  }
  ```

- What is the syntax for a ternary operator?

  ```js
  const result = condition ? trueResult : falseResult;
  ```

- What is nesting?

  - When blocks or expressions are present within themselves
  - Nested conditionals

    ```js
    if (condition) {
      if (anotherCondition) {
        if (moreNestedCondition) {
          /* Statements */
        }
      }
    }
    ```

  - Nested ternaries

    <!-- prettier-ignore -->
    ```js
    let result =
      (condition1) ? result1
        : (condition2) ? result2
        : (condition3) ? result3
        : (condition4) ? result4
        : resultDefault;
    ```

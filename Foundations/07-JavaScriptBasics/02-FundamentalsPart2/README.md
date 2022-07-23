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

  - **DEPCRECATED**
    - See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)
  - Second parameter is **length** of substring, instead of index end
  - Ending index on source string will be `start + length`, exclusive

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

  - Alphabetical order

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

## Assignments

## Additional Resources

## Knowledge Check

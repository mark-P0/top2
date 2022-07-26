# Fundamentals Part 4

## Arrays

- Collection of closely related values
- Avoids creating separate variables for each value

### Creation

- **Literal** syntax

  ```js
  const newArray = [1, 2, 3, 4, 5];

  /* Manual insertion */
  const newArrayManual = [];
  newArrayManual[0] = 'First item';
  newArrayManual[1] = 'Second item';
  newArrayManual[2] = 'Third item';
  ```

  - Use braces (square brackets) `[]`

- ~~**Object** syntax~~

  <!-- prettier-ignore -->
  ```js
  const newArray = new Array(1, 2, 3, 4, 5);

  /* Not the same */
  const literalArray = [40]      // [40]               (Array with a single element 40)
  const newArray = new Array(40) // [<40 empty slots>] (Array with 40 pre-allocated elements)
  ```

  - **DISCOURAGED**
  - `new` keyword is [generally frowned upon](https://stackoverflow.com/questions/383402/is-javascripts-new-keyword-considered-harmful)
  - Like a _function call_; provide array elements as arguments
  - Cannot create single-element arrays this way however

### Accessing & Modifying elements

```js
const numberArray = [1, 2, 3, 4, 5];

/* Accessing */
console.log(numberArray[0]); // 1
console.log(numberArray[3]); // 4
console.log(numberArray[4]); // 5

/* Modifying */
numberArray[0] = 100;
numberArray[2] = 256;
console.log(numberArray); // [100, 2, 256, 4, 5]
```

- Also uses braces `[]`
- i.e. **indexing**
- The array itself can be treated just like a regular variable

### Relationship with objects

<!-- prettier-ignore -->
```js
const anArray = ['John', 'Doe', 46];
console.log(anArray[0]);  // 'John'
console.log(anArray[1]);  // 'Doe'
console.log(anArray[2]);  // 46

const anObject = {
  firstName: 'John',
  lastName: 'Doe',
  age: 46,
};
console.log(anObject.firstName);  // 'John'
console.log(anObject.lastName);   // 'Doe'
console.log(anObject.age);        // 46
```

#### A JS array is an `object`

<!-- cspell:disable -->

```js
typeof [1, 2, 3, 4, 5]; // 'object'
```

<!-- cspell:enable -->

- JS arrays are a special type of `object`
- Has properties / fields / attributes like an `object`
  - Specifically `.length` which denotes the number of elements within the array

#### JS arrays can contain `object`s

<!-- prettier-ignore -->
```js
/* Straightforward example */
const objectArray = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Mary', lastName: 'Sue' },
  { firstName: 'Gary', lastName: 'Stu' },
];

/* Can contain any other values, mixed or not */
const objectArrayMixed = [
  Date.now,
  myFunction,
  myCarArray,
  myObjectData,
]
```

#### ~~A JS array can be turned into an `object`~~

- **HEAVILY DISCOURAGED**
- Called _associative arrays_
  - i.e. arrays whose elements are _associated_ with a particular key
- JS arrays always use numbered indexes
- Using a "named" index will turn JS arrays into associative arrays, i.e. an `object`

<!-- prettier-ignore -->
```js
const person = [];  // An array
person['firstName'] = 'John';
person['lastName'] = 'Doe';
person['age'] = 46;

person.length; // Will return 0
person[0];     // Will return undefined
```

This is essentially the same as:

```js
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 46,
};
```

---

- **Arrays**: _Numbered_ indices
- **Objects**: _Named_ indices

### Identifying

- `Array.isArray()`

  <!-- prettier-ignore -->
  ```js
  Array.isArray([1, 2, 3]);         // true
  Array.isArray(4);                 // false
  Array.isArray(undefined);         // false
  Array.isArray('string');          // false
  Array.isArray({ prop: 'prop' });  // false
  ```

- `instanceof` <!-- cspell:disable-line -->

  <!-- cspell:disable -->

  <!-- prettier-ignore -->
  ```js
  [1, 2, 3] instanceof Array         // true
  4 instanceof Array                 // false
  undefined instanceof Array         // false
  'string' instanceof Array          // false
  { prop: 'prop' } instanceof Array  // false
  ```

  <!-- cspell:enable -->

  - Check value if it is an instance of a type, e.g. `Array`
  - Use like an **operator**, e.g. `+` `-` `*` `/`
    - Not a function / method unlike e.g. Python's `isinstance()` <!-- cspell:disable-line -->

### Properties

- `.length`

  - Keeps track of the number of elements within the array

    ```js
    const numberArray = [1, 2, 3, 4, 5];

    console.log(numberArray.length); // 5
    ```

  - Use in getting last element

    ```js
    const stringArray = ['string1', 'string2', 'string3'];

    console.log(stringArray[stringArray.length - 1]); // 'string3'
    ```

  - Use in loop

    ```js
    const stringArray = ['string1', 'string2', 'string3'];

    for (let idx = 0; idx < stringArray.length; idx++) {
      console.log(stringArray[idx]); // 'string1' | 'string2' | 'string3'
    }
    ```

  - Use in creating ranges

    ```js
    Array.from({ length: n }, (_, idx) => idx + 1);
    ```

    - `Array.from()` takes an `object`-like value to base an array on
    - Any `object` that has a `length` property can be considered as array-like
    - Even trivial objects like `{length: n}` whose sole property is `length`

### Methods

#### `.forEach()`

```js
const stringArray = ['string1', 'string2', 'string3'];

stringArray.forEach((string) => {
  console.log(string); // 'string1' | 'string2' | 'string3'
});
```

- Alternative to traditional `for` loop for iterating through each array elements

#### `.push()`

<!-- prettier-ignore -->
```js
const stringArray = ['string1', 'string2', 'string3'];
stringArray.push('string4');
console.log(stringArray); // ['string1', 'string2', 'string3', 'string4']


/* Similar, but discouraged way of doing */
stringArray[stringArray.length] = 'string5';
console.log(stringArray); // ['string1', 'string2', 'string3', 'string4', 'string5']


/* Indices greater than array length will create "empty slots" */
stringArray[10] = 'string-extra';
console.log(stringArray); // ['string1', 'string2', 'string3', 'string4', <5 empty slots>, 'string5']

/* Popping, opposite of pushing */
stringArray.pop(); // 'string-extra'
console.log(stringArray); // ['string1', 'string2', 'string3', 'string4', <5 empty slots>]
```

- **Adds** new element at the **end** of the array
- Similar concept to **stack** pushing and popping
  - Has polar `.pop()` method that **removes** the last element of the array
- Use this instead of `.length`-based indexing
- Both `.push()` and `.pop()` are in-place operations
  - They modify the underlying array, but does not return it

#### `.shift()`

<!-- cspell:disable -->

<!-- prettier-ignore -->
```js
const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];

fruits.shift();           // 'Banana'
console.log(fruits);      // ['Orange', 'Apple', 'Mango']

fruits.unshift('Papaya'); // Does not return anything
console.log(fruits);      // ['Papaya', 'Orange', 'Apple', 'Mango']
```

- **Removes** element from the **start** of the array
- Similar concept to **queue** queueing and dequeueing
  - Has polar `.unshift()` method that **adds** element at the start of the array
- Both `.shift()` and `.unshift()` are also in-place operations

<!-- cspell:enable -->

#### `.join()`

```js
const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];

fruits.join(', '); // 'Banana, Orange, Apple, Mango'
fruits.toString(); // 'Banana,Orange,Apple,Mango'
```

- Joins array elements into a single string
- Needs to specify a separator string / character between each array element
- Arrays also has `.toString()` which behaves similarly but can only use `','` as separator
  - All objects has this method
  - A JS array is an `object`

#### `.concat()`

<!-- prettier-ignore -->
```js
const childGirls = ['Cecile', 'Lone'];
const childBoys = ['Emil', 'Tobias', 'Linus'];
const childExtra = ['Robin', 'Morgan'];

console.log(
  childGirls.concat(childBoys, childExtra)
); // [ 'Cecile', 'Lone', 'Emil', 'Tobias', 'Linus', 'Robin', 'Morgan' ]
console.log(childGirls); // ['Cecile', 'Lone']
console.log(childBoys);  // ['Emil', 'Tobias', 'Linus']
console.log(childExtra); // ['Robin', 'Morgan']

console.log(
  childExtra.concat('Peter')
); // ['Robin', 'Morgan', 'Peter']
```

- Merges arrays together, i.e. "concatenates" them
- Not an in-place operation

#### `.splice()`

- Inserts elements into an array
- Think Python's `list.insert()` method
- Kind of clunky...

#### `.slice()`

<!-- prettier-ignore -->
```js
const fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];

/*  2 arguments
 *  Up to, but not including, the second index
 */
fruits.slice(1, 3);  // [ 'Orange', 'Lemon' ]

/*  1 argument
 *  From given index, to the end
 */
fruits.slice(2);     // [ 'Lemon', 'Apple', 'Mango' ]

/*  Negative slice
 *  Starts counting from last element
 */
fruits.slice(-1);    // [ 'Mango' ]
fruits.slice(-2);    // [ 'Apple', 'Mango' ]

/* Slicing does not remove elements */
console.log(fruits); // [ 'Banana', 'Orange', 'Lemon', 'Apple', 'Mango' ]
```

- Gets a selection of elements from an array based on provided indices
- Not an in-place operation
- Does not remove elements
- Produces a new array

#### `.sort()`

<!-- prettier-ignore -->
```js
const points = [40, 100, 1, 5, 25, 10];

points.sort();                // [ 1, 10, 100, 25, 40, 5 ]
console.log(points);          // [ 1, 10, 100, 25, 40, 5 ]

points.sort((a, b) => a - b); // [ 1, 5, 10, 25, 40, 100 ]
console.log(points);          // [ 1, 5, 10, 25, 40, 100 ]

points.sort((a, b) => b - a); // [ 100, 40, 25, 10, 5, 1 ]
console.log(points);          // [ 100, 40, 25, 10, 5, 1 ]

/*  Note how `points` is not reassigned
 *  `.sort()` is in-place
 */
```

- In-place operation
- Sorts array elements **as a string** by _default_
  - "Alphabetical" / "Lexicographical" / "Dictionary" order
  - Technically, **Unicode** order
- Provide a comparing callback function to properly sort numbers
  - Can customize behavior
- Given comparing function with parameters `a` and `b`...
  - If function return is `> 0`, `a` will come **after** `b`
  - If function return is `< 0`, `a` will come **before** `b`
  - If function return is `=== 0`, retain order of `a` and `b`
- Some quick compare functions:
  - `(a, b) => a - b`
    - Ascending order
  - `(a, b) => b - a`
    - Descending order

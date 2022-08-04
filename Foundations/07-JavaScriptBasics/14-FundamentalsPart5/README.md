# Fundamentals Part 5

## Objects

- `{}`
- `key`-`value` collections
  - A key-value pair is called an **entry** and/or **property**
  - An object is a collection of several entries or properties
  - An entry key is called the **property name**
  - An entry value can be anything, e.g. primitives, arrays, even another object
- Mapping
  - Think of Python's `dict` data type
- Almost everything is an object in JavaScript
  - Two (2) categories of data types are **primitives** and **objects**
  - Arrays are also objects
    - Recall the `array.length` property
  - Functions are also objects
  - They're just syntactic sugar

### Creation

#### ~~Constructor syntax~~

```js
const objectViaConstructor = new Object();
objectViaConstructor.property1 = value1;
objectViaConstructor['property 2'] = value2;
objectViaConstructor[property3] = value3;
```

- Rather clunky

#### Literal syntax

<!-- prettier-ignore -->
```js
const objectViaLiteral = {
  property1: value1,
  'property 2': value2, // Multiple-word property name
  [property3]: value3,  // Variable property name (Computed properties)
};
```

- Preferred way
- Short and sweet
- Trailing comma on the last entry is optional, but preferred to have
  - Keeps entries uniform in appearance
  - Simplifies addition of new entries
  - Ordering entries is straightforward

### Property Names

```js
const objectPropertyNames = {
  /* Normally reserved keywords */
  for: 1,
  let: 2,
  return: 3,

  /* Invalid variable names */
  '12leadingNumbers': '12',

  /* Numerics */
  0: 'zero', // Accessed as objectPropertyNames['0']
};
```

- Can be `string`s or `symbol`s
- Mostly implicitly converted into strings
- Can technically be _anything_

  - Unlike variable names where they must be valid identifier
  - Property names with special characters or reserved keywords can just be quoted as strings

- Numerics must be defined **AFTER** word identifiers

### Getting & Setting

- Either method can be mixed

#### Via **dot notation**

- Akin to treating objects as their own **namespace**

```js
const person = {
  name: 'John',
  age: 23,
};

console.log(person.name); // 'John'

person.age = 30;
console.log(person); // { name: 'John', age: 30 }
```

#### Via bracket notation ("indexing")

Required for spaced-out property names

- Can also be used for non-spaced-out property names, but those can be simplified to dot notation

<!-- prettier-ignore -->
```js
const person = {
  'First Name': 'John',
  'Current Age': 23,
  'Hometown': 'Texas',
};

console.log(person['First Name']); // 'John'

person['Current Age'] = 30;
console.log(person); // { 'First Name': 'John', 'Current Age': 30, Hometown: 'Texas' }

console.log(person['Hometown']); // 'Texas'
console.log(person.Hometown);    // 'Texas'
```

Also needed for variable property access

- Need to stringify even single-word property names

```js
const person = {
  'First Name': 'John',
  age: 23,
};
let propertyToAccess;

propertyToAccess = 'First Name';
console.log(person[propertyToAccess]); // 'John'

propertyToAccess = 'age'; // Needs to stringify property name
console.log(person[propertyToAccess]); // 23
```

#### Chaining

<!-- prettier-ignore -->
```js
const person = {
  name: {
    first: 'John',
    last: 'Smith',
  },
  age: {
    year: 23,
    month: 3,
    days: 11,
  },
};

/* Dot notation */
person.name.first       // 'John'
person.age.year         // 23

/* Bracket notation */
person['name']['last']  // 'Smith'
person['age']['month']  // 3

/* Mixed notations */
person.name['first']    // 'John'
person['age'].days      // 11
```

### Deletion

- Using the `delete` keyword
- Rather uncommon

```js
const person = {
  'First Name': 'John',
  age: 23,
};

console.log(person); // { 'First Name': 'John', age: 23 }

delete person['First Name'];
console.log(person); // { age: 23 }

delete person.age;
console.log(person); // {  }
```

### Property Initialization

#### Computed properties

```js
const objectWithComputedProperties = {
  [key1]: value1,
  [key2 + 'someSuffix']: value2,
  ['prefix' + key3]: value3,
  [key4()]: value4,
};
```

- Bracket notation is more powerful than dot notation, at the expense of brevity
- Dot notation is simpler and more concise, at the expense of flexibility

#### Property shorthands

<!-- prettier-ignore -->
```js
const property1 = 'somePropertyValue';
const property2 = anotherValue();

const objectWithShorthands = {
  /* Property shorthands */
  property1,
  // property1: 'somePropertyValue',  // Equivalent (assuming `property1` is defined beforehand)

  property2,
  // property2: anotherValue(),       // Equivalent (assuming `property2` is defined beforehand)

  /* Method shorthands */
  method1() { /* ... */ },
  // method1: function() { /* ... */ },  // Equivalent
  // method1: () => { /* ... */ },       // Equivalent (with some nuances)
};
```

### Property Existence

- No errors will be thrown for accessing properties that do not exist; they will simply be returned as `undefined`

  ```js
  const emptyObject = {};

  console.log(emptyObject.someProperty); // undefined
  ```

- There are ways to assert property existence

#### `in` operator

```js
const emptyObject = {};

console.log('someProperty' in emptyObject); // false

if ('someProperty' in emptyObject) {
  /* Will not run */
  console.log('Property exists!');
}
```

- Property name to check for must be stringified, or stored in a variable as a stringified value
- `in` is an operator, e.g. `+` `-` `*` `/`
- Left operand must be the property name to check for
- Right operand must be the object on which the property will be checked
- `in` checks for property existence on the object itself as well as on any inherited properties

<!-- prettier-ignore -->
```js
const anotherObject = {
  /*  Might be initialized later,
   *  but the property `undefinedProperty`
   *  definitely exists in this object.
   */
  undefinedProperty: undefined,
};

  anotherObject.undefinedProperty === undefined; // true; but `undefinedProperty` exists
anotherObject.nonexistentProperty === undefined; // true; but `nonexistentProperty` does NOT exist

  'undefinedProperty' in anotherObject; //  true;   `undefinedProperty` is indeed in the object
'nonexistentProperty' in anotherObject; // false; `nonexistentProperty` is indeed NOT in the object
```

- Not the same as simple checking against `undefined`

#### `object.hasOwnProperty()`

```js
const anotherObject = {
  undefinedProperty: undefined,
};

anotherObject.hasOwnProperty('undefinedProperty'); // true
```

- Method of objects themselves
- More specific than the `in` operator
- `.hasOwnProperty()` checks for property existence ONLY on the object itself
  - Does not check any inherited properties

#### `Object.hasOwn()`

```js
const anotherObject = {
  undefinedProperty: undefined,
};

Object.hasOwn(anotherObject, 'undefinedProperty'); // true
```

- Static method of the `Object` class
- Replacement for `.hasOwnProperty()`
  - Works for created using `Object.create(null)`
  - Works on objects that has overridden the `.hasOwnProperty()` method
  - More intuitive syntax than the potential workaround `Object.prototype.hasOwnProperty()`

### Iteration

#### `for`-`in` loop

- Special variant of `for` loop
- Iterates through each **object**'s property names (or keys)
  - `for`-`of` iterates through a **collection**'s members (e.g. arrays, iterables)
- Includes properties in the **prototype chain**

```js
for (const key in object) {
  /*  */
}
```

#### `Object.keys()`

- **`for`-`of` approach**
- Creates a collection of an object's OWN properties' names
- Does **NOT** include properties in the **prototype chain**
- Behaves more like `.hasOwnProperty()` or `Object.hasOwn()`

```js
for (const key of Object.keys(object)) {
  /*  */
}
```

#### `Object.entries()`

- **`for`-`of` approach**
- Creates a collection of an object's property entries as a two-item array
- Treat as a 2-dimensional array
- Has the same caveats as `Object.keys()`

```js
const object = {
  key1: value1,
  key2: value2,
  key3: value3,
};

Object.entries(object);
// [ [key1, value1],
//   [key2, value2],
//   [key3, value3],
//   ...            ]
```

```js
for (const pair of Object.entries(object)) {
  const [key, value] = pair;

  /*  */
}
```

#### `Object.values()`

- **`for`-`of` approach**
- Has more limited use than the `Object.entries()` approach
- Has the same caveats as `Object.keys()`

```js
for (const value of Object.values(object)) {
  /*  */
}
```

### Order

> The specifications are muddy.
>
> It would be best to assume that they objects do not keep order and thus not rely on this behavior.

```js
let codes = {
  49: 'Germany',
  41: 'Switzerland',
  44: 'Great Britain',
  1: 'USA',
};

/* Numeric order */
for (let code in codes) {
  console.log(code); // 1, 41, 44, 49
}
```

```js
let user = {
  name: 'John',
  surname: 'Smith',
};
user.age = 25; // add one more

/* Creation order */
for (let prop in user) {
  alert(prop); // name, surname, age
}
```

- Numeric property names are ordered as numbers
- Others are ordered by creation order

### `this` keyword

- Reference to the object within the object itself
- More useful when using **constructors** to instantiate several objects from a single object definition

### Constructors

- Define the _shape_ of an object, and create many objects of that shape

#### Regular function

- Does indeed construct a new object...
- Not a _true_ constructor, as it is referred to in the context of JS

```js
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };
  return obj;
}

const john = createPerson('John');
john.name;
john.introduceSelf();

const frankie = createPerson('Frankie');
frankie.name;
frankie.introduceSelf();
```

#### Constructor function

- Constructor syntax implicitly creates and returns an object
- Binds `this` to the behind-the-scenes object

<!-- prettier-ignore -->
```js
function Person(name) {
  // this = {};    // implicit; due to the `new` keyword

  this.name = name;
  this.introduceSelf = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };

  // return this;  // implicit
}

const john = new Person('John');
john.name;
john.introduceSelf();

const frankie = new Person('Frankie');
frankie.name;
frankie.introduceSelf();

/*  Calling it as a function returns `undefined`,
    but actually modifies a `this` reference,
    e.g. the global `window` object
 */
const raw = Person('Mark');
raw        // undefined
raw.name   // TypeError
this.name  // 'Mark'; on the global `this` reference (`window`?)
```

- Possibly safeguard by checking the `this` reference?

<!-- prettier-ignore -->
```js
function Person(name) {
  /*  Check if `this` is an empty object
      https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
   */
  if (!(
    this
    && Object.keys(this).length === 0
    // && Object.getPrototypeOf(this) === Object.prototype
  )) {
    /*  Mimic class constructor methods throwing `TypeError`
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
     */
    throw new TypeError(
      'Inappropriate call to constructor function. Is the `new` keyword present?'
    );
  }

  this.name = name;
  this.introduceSelf = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };
}

new Person('Mark') // Object
Person('Mark')     // TypeError
```

#### Constructor method

> To be discussed in classes(?)

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}.`);
  }
}

new Person('Mark'); // Object
Person('Mark'); // TypeError
```

### Methods

- [Almost] everything in JavaScript is an object
- _a la_ Python

<!-- prettier-ignore -->
```js
/* `String` objects */
const myString = 'Hello, world!'  // `String` object
myString.split(',')               // `String.split()` method

/*  `Document` object
 *  `document` (lowercase) is a global object
 *  instantiated from `Document` (uppercase)
 */
const myDiv = document.createElement('div')      //
const myVideo = document.querySelector('video')  //
```

- Primitive values have _implied_ methods
- Whenever their methods are accessed, they are silently wrapped in a proper corresponding object, and that method is called

```js
const myString = 'Hello, world!';
myString.split(',');

/* When `.split()` is called, what happens behind-the-scenes is that... */

/* ...the value of `myString` is wrapped in a `String` object... */
// stringObject = new String('Hello, world!')

/* ...which actually possesses the `.split()` method, invoked... */
// result = stringObject.split(',')

/* ...after which the created object is discarded... */
// delete stringObject

/* ...and the method results is produced. */
// return result
```

### ~~Function `arguments`~~

```js
function noParameters() {
  console.log(arguments);
}

/* Note the braces `{...}`, signifying an object */

noParameters(1, 2, 3);
// Arguments { 0: 1, 1: 2, 2: 3 }
noParameters(1, 2, 3, 'a', 'b', 'c');
// Arguments { 0: 1, 1: 2, 2: 3,
//             3: "a", 4: "b", 5: "c" }
noParameters(1, -2, null, undefined, NaN, Infinity, 'string');
// Arguments { 0: 1, 1: -2, 2: null, 3: undefined,
//             4: NaN, 5: Infinity, 6: "string" }
```

- `arguments` is a special object available within functions
- It is **array-like**, but not an actual array, and does not have most conventional array methods
- Can be indexed _like_ arrays
  - Its "indices" are more like numeric property names
- **Rest/Spread syntax should be preferred**
  - Provides arguments in an **actual array**
  - Modern, explicit way of supporting variable amount of arguments

```js
function restParameters(...args) {
  console.log(args);
}

restParameters(1, 2, 3);
// [ 1, 2, 3 ]
restParameters(1, 2, 3, 'a', 'b', 'c');
// [ 1, 2, 3, 'a', 'b', 'c' ]
restParameters(1, -2, null, undefined, NaN, Infinity, 'string');
// [ 1, -2, null, undefined, NaN, Infinity, 'string' ]
```

## Intermediate/Advanced Array Magic

- Useful array methods
- Uses callback functions to be executed on each array item

### `.map()`

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numberStrings = numbers.map((number) => `Number ${number}`);
// [ "Number 1", "Number 2", "Number 3", "Number 4", "Number 5",
//   "Number 6", "Number 7", "Number 8", "Number 9", "Number 10" ]
```

- Produce another array where each item may be transformed into another form
- Takes each item in an array and may produce another value based from it
- Result length is same as source array
  - Given array of `n` items, its map will also produce `n` items

### `.filter()`

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter((number) => number % 2 === 0);
// [ 2, 4, 6, 8, 10 ]
```

- Produce another array where some items may be removed
- Considers each item in an array and decides whether to keep it or not
- Result length can be equal or less than the source array
  - Given array of `n` items, filtering will produce `<= n` items

### `.reduce()`

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = numbers.reduce((runningSum, number) => runningSum + number, 0);
// 55
```

- Produce a single value based from an array
- _Reduces_ the array to a single value (the _running value_)
- Iterates through each item in an array and can perform operations on it together with a _running value_
- Result is only a single value
  - Given array of `n` items, it will be reduced to `1` item/value
- Initial running value depends on **second argument**

<!-- prettier-ignore -->
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/*  2nd argument ABSENT
 *  Running value starts with first array item
 *  Current value starts with second array item
 *
 *  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *   ┃  ┗━ Current value
 *   ┗━━━━ Running value
 */
numbers.reduce((running, current) => {/* ... */})

/*  2nd argument PRESENT
 *  Running value starts with 2nd argument
 *  Current value starts with first array item
 *
 *   0   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *   ┃    ┗━ Current value
 *   ┗━━━━━━ Running value
 */
numbers.reduce((running, current) => {/* ... */}, 0)
```

- Derive an object from an array

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.reduce(
  (object, number) => {
    const key = number % 2 === 0 ? 'even' : 'odd';
    object[key].push(number);
  },
  { odd: [], even: [] }
);
// { odd:  [ 1, 3, 5, 7,  9],
//   even: [ 2, 4, 6, 8, 10] }
```

```js
const grades = [90, 87, 89, 90, 90, 90, 90, 90, 87, 89, 90, 87];

grades.reduce((counter, grade) => {
  counter[grade] = (counter[grade] ?? 0) + 1;
  return counter;
}, {});
// { 87: 3,
//   89: 2,
//   90: 7 }
```

- Derive another array from an array
  - Use `.map()`!

### `.sort()`

- Uses callback function to determine how values are sorted
- Sorts **in-place**
- Returns a reference to the same array

<!-- prettier-ignore -->
```js
const numbers = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]

/*  Default behavior (No comparing callback)
 *
 *  Sort array items as a string
 *  Technically by Unicode order
 *  Effectively also by lexicographical (dictionary) order
 */
numbers.sort()
// [ 1, 1, 13, 144, 2, 21, 3, 34, 5, 55, 8, 89 ]


/*  With comparing callback
 *  Sorting behavior customized
 *  Callback given `a` (previous) and `b` (current),
 *  return value <0 if `a` comes before `b` (negative)
 *               >0 if `a` comes  after `b` (positive)
 *               >0 if `b` comes before `a` (positive)
 *               =0 if `a` and `b` are in order
 */
numbers.sort((before, current) => before > current ? -1 : 1)
// [ 144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 1 ]
//  before > current
// greater > lesser
// largest > smallest
numbers.sort((before, current) => before < current ? -1 : 1)
// [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]
//   before < current
//   lesser < greater
// smallest < greatest


/*  Shorthands
 *  Perform subtraction
 *  Goal is to simply produce positive or negative values
 */
numbers.sort((before, current) => before - current)
// [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]
// Is negative only if `before` is less than `current`
// Is negative only if     left is less than right
//                            least to greatest
numbers.sort((before, current) => current - before)
// [ 144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 1 ]
// Is negative only if `before` is greater than `current`
// Is negative only if     left is greater than right
//                             greatest to least
```

### `.some()`

<!-- prettier-ignore -->
```js
const grades = [90, 87, 89, 90, 90, 90, 90, 90, 87, 89, 90, 87];

grades.some((grade) => grade === 89); //  true; Received an 89 in a subject
grades.some((grade) => grade > 95);   // false; No remarkably high grade
```

- Uses callback function to map array values to a Boolean value
- Evaluates to `true` as soon as a callback returns `true`
  - Meaning, _some_ array item satisfies the given condition
  - i.e. one of the array items
- Evaluates to `false` if none of the callbacks return `true`
- Think Python `any()`

### `.every()`

<!-- prettier-ignore -->
```js
const grades = [90, 87, 89, 90, 90, 90, 90, 90, 87, 89, 90, 87];

grades.every((grade) => grade > 70);  // true; All grades are passing
grades.every((grade) => grade != 80); // true; No barely satisfactory grade
```

- Uses callback function to map array values to a Boolean value
- Evaluates to `false` as soon as a callback returns `false`
- Evaluates to `true` if none of the callbacks return `false`
  - Meaning, _every_ array item satisfies the given condition
  - i.e. all array items
- Think Python `all()`

### `.find()`

```js
const inventors = [
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
];

/* Born in the 1500's */
inventors.find(({ year }) => 1500 <= year && year < 1600);
// { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 }
```

- Find first array item that satisfies a condition and return it
- i.e. `.some()` with an extra return step
- Particularly useful in object arrays, or multidimensional arrays
  - When the array items are passed by reference (`object`-ish)
- If none satisfies the condition, evaluates to `undefined`

### `.findIndex()`

```js
const numbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const foundIndex = numbers.findIndex((digits) => digits[1] % 2 !== 0);
// 1

numbers[foundIndex];
// [4, 5, 6]
```

- `.find()` but returns the index of the array item instead of the item itself
- If none satisfies the condition, evaluates to `-1`

## Knowledge Check

- What is the difference between objects and arrays?

  |             |     Objects     |   Arrays   |
  | :---------: | :-------------: | :--------: |
  | Identifiers |    Keywords     |  Indices   |
  |  Literals   |     `{...}`     |  `[...]`   |
  |   Members   | Key-Value pairs |   Values   |
  |  Accessing  |  Bracket, Dot   |  Bracket   |
  |  Iteration  |   `for`-`in`    | `for`-`of` |
  |   Methods   |       OOP       |     FP     |

- How do you access object properties?

  - **Dot notation**. For single-word property names.
  - **Bracket notation**. For multi-word or irregular identifier property names.

- What is `Array.prototype.map()` useful for?

  - Deriving a new array from a source array of the same length
  - Transforming the items of an array into a new form

- What is `Array.prototype.reduce()` useful for?

  - Reducing an array into a single value
  - Creating an object of custom definition from an array

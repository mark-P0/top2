# Objects and Object Constructors

## Object Property Accessing

- Dot notation
- Bracket notation (_a la_ indexing)

> I prefer the _destructuring_ notation, which is essentially the "dot notation" 😂
>
> ```js
> const myObject = {
>   property: 'Value!',
>   otherProperty: 77,
>   'obnoxious property': function () {
>     // do stuff!
>   },
> };
>
> const {
>   property,
>   otherProperty,
>   'obnoxious property': obnoxiousProperty,
> } = myObject;
>
> console.log({
>   property,
>   otherProperty,
>   obnoxiousProperty,
> });
> ```

## Constructors

## _Constructor_ vs _Factory_ Functions

> I kind of like the **factory approach** more (_used it on the Admin Dashboard project_ 😅)
>
> I use it, and think of it, as a **wrapper** for JS' _object literal syntax_.

### Constructor

```js
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
```

```js
const player1 = new Player(...)
const player2 = new Player(...)

const players = [
  new Player(...),
  new Player(...),
  new Player(...),
]
```

### Factory

- Conforms with how I **personally** perceive functions
  - They "do" something
  - Having them act like a blueprint (or a _class_), to me, is very sacrilegious
- Does not need the `new` keyword
  - Has some subtle caveats exclusive to constructor use case
  - Very reminiscent of hardcore OOP languages, which JS shouldn't be

```js
function createPlayer(name, marker) {
  return { name, marker };
}

/* or, more succinctly... */
const createPlayer = (name, marker) => ({ name, marker });

/*  or even the following...
 *  Kind of displays the "signature" of the object to be instantiated
 *  e.g. schema, outline, layout
 */
const Player = (name, marker) => ({ name, marker });
```

```js
const player1 = createPlayer(...)
const player2 = createPlayer(...)

const players = [
  createPlayer(...),
  createPlayer(...),
  createPlayer(...),
]
```

## Prototype

### Creating

#### `.prototype`

- Property of a **constructor function**
- Automatically used to set the prototype of a newly created object

```js
function Player(...) {
  ...
}
Player.prototype = {...}
```

#### `Object.create()`

> Recommended for use

- Used to create an object with a specific prototype
  - Otherwise, plain objects (e.g. those created with the object literal syntax) use the built-in `Object.prototype`
- Strongly related with the factory approach of instantiating objects
  - Can be considered as a factory approach itself

```js
const Player = Object.create({...}) // The prototype
Player.<prop> = ... // Manually set properties
```

#### `.__proto__`

> Some sources discourage `__proto__` (who knows what they are referring to specifically...). MDN does not seem averse to it, as it is standardized (in contrast with what some others claim...)
>
> I personally like it, and will cite MDN whenever I use it.

- A property of ALL objects
- Denotes the prototype of an object
- Appears on the dev tools as `<prototype>`
- A getter/setter?
- Special "magic" / pseudo property?
- Only works with a proper "colon notation" in object literals

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#syntax

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto

https://javascript.info/prototype-methods

```js
const Player = {
  ...,
  __proto__: {...}
}
```

#### `Object.setPrototypeOf()`

- Can be a way of setting the prototype of object literals
- Takes two (2) objects: a _base_ object, and a _prototype_ object
- This sets the prototype of the _base_ to that of the given new _prototype_
- It returns the given _base_ object, with its prototype set to the given _prototype_

```js
const Player = Object.setPrototypeOf(
  {...}, // The object whose prototype will be set
  {...}, // The new prototype
);
```

## Attribute vs. Property

<!-- prettier-ignore -->
```js
/* This... */
let sampleObject = {
  id: 0,
  name: 'object name',
}

/* ...is _apparently_ equivalent to this, behind the scenes */
let sampleObject = {
  class:      someValue,      // Attribute
  prototype:  someValue,      // Attribute
  extensible: someValue,      // Attribute
  id:         0,              // Property
  name:       'object name',  // Property
};
```

https://stackoverflow.com/questions/38017119/what-is-the-difference-between-object-properties-and-object-attributes-in-javasc

http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/

### Attributes

#### `prototype`

#### `class`

#### `extensible`

### Properties

- Everything that we define
- The key-value pairs

## `this`-related Methods

These are methods of a function

- JS functions are first-class objects,
  - i.e. they are objects as well, and can have properties and methods

### `.call()`

```js
fn.call(object, ...args);
```

- Invoke `fn`, passing `...args` as a arguments, and `object` as the context
- This means that, the `this` references inside `fn` will all refer to the given `object`

### `.apply()`

```js
fn.call(object, args);
```

- Invoke `fn`, passing `args` as a arguments, and `object` as the context
- The difference is that `args` must be an array
- `this` still refers to the given `object`

### `.bind()`

```js
const newFn = fn.bind(object);
```

- **Return** a copy of `fn` whose `this` refers to the given `object`
- Produces a value (object; a version of `fn`)

```js
const newFn = fn.bind(object, ...args);
```

- The function can also have a number of arguments, which will be pre-applied
- This has rare use cases though, as `newFn` can simply invoked with the arguments, e.g. `newFn(...args)`
  - Useful when _currying_ the function

## Knowledge Check

- Write an object constructor and instantiate the object.

  ```js
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {
    greet() {
      return `Hello! I am ${this.name}!`;
    },
  };

  const me = new Person('Mark');
  me.greet(); // "Hello! I am Mark!"
  ```

- Describe what a prototype is and how it can be used.

  - A prototype serves as the "base" object for new objects (that it is the prototype of)
  - This creates a "single source of truth" for all objects of a particular type
  - This was also the traditional implementation of inheritance in JS

- Explain prototypal inheritance.

  - Objects may be have a prototype which in turn also has a prototype, and so on
  - This is referred to as the _prototype chain_
  - This goes on until there are no more prototypes, e.g. the built-in `Object.prototype`
  - An object has access to all of the properties and methods of the prototypes in the chain
    - Unless they are overridden by a property definition somewhere earlier in the chain
    - Property accesses travel this chain to find a property

- Understand the basic do’s and don’t’s of prototypical inheritance.

  - Use `Object.create`
    - I kind of like using `__proto__` in an object literal syntax...
  - Do not _directly_ set a prototype of an object to the prototype of another
    - Make a copy with `Object.create`

- Explain what `Object.create` does

  - Creates an object whose prototype is the given object
  - Normally, objects (e.g. `{}`) have the `Object.prototype` built-in as the oldest ancestor

- How does `this` behave in different situations?

  - Depends on how the function is invoked
  - With a regular function, `this` is the global object
  - With an object method, `this` is the object itself
    - Provided the method is defined within the object
  - With arrow functions, `this` is the enclosing context
  - With binding methods, `this` is the given object
  - With constructors, `this` is a new object
    - Provided the constructor is properly invoked with `new`
    - Otherwise, it behaves like a regular function

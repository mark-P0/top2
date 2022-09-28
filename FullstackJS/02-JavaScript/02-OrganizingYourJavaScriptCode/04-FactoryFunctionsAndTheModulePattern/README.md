# Factory Functions and the Module Pattern

> I actually kind of like the _factory_ approach more than the _constructor_ approach...

## Factory Functions

```js
function FactoryOfSomething(..attrs) {
  return {
    ...attrs,
    func1() {},
    func2() {},
    func3() {},
  }
}

/* or */

const FactoryOfAnotherThing = (...attrs) => {
  return {
    ...attrs,
    func1() {},
    func2() {},
    func3() {},
  }
}
```

- A function that produces an object
- Kind of like a _factory of_, or something that _makes_ objects
- Especially handy with the **object shorthand** notation

## Closures

```js
function SomeFunction(params) {
  function Closure(params) {
    /* ... */
  }
}
```

- _i.e._ nested functions
- A function that is enclosed within some other function (block)
- Think Python _decorators_

## _"Private"_ Variables

```js
function SomeFactory(params) {
  /* "Private" values */
  const someDerivedValue = someExpression;
  const anotherValue = anotherExpression;
  const aMethod = () => {
    doSomething;
  };

  /* Choose what to expose from these values */
  return { anotherValue, aMethod };
}

const NewInstance = SomeFactory(itsParams);
newInstance.someDerivedValue; // NOT accessible
newInstance.anotherValue; // Accessible
newInstance.aMethod; // Accessible
```

- Hide variables within functions
- Minimizes name collisions
- Very similar to namespacing
  - "Privatizing" variables disallows access to it, unless explicitly exposed

## Inheritance | Prototypes

### Manual

```js
function SomeBaseObjectFactory(...attrs) {
  return { ...attrs };
}

function DerivativeObjectFactory(...attrs) {
  /* Instantiate the base factory, then manually retrieve the properties to be inherited */
  const { attr1, attr2, attr3 } = SomeBaseObjectFactory(...attrs);

  return {
    newAttr1,
    newAttr2,
    attr1,
    attr2,
    attr3,
  };
}

function AnotherDerivativeFactory(...attrs) {
  /* Or inherit it completely */
  return {
    ...newAttrs,
    ...SomeBaseObjectFactory(...attrs),
  };
}

function EvenMoreDerivative(...attrs) {
  /* Can even have multiple bases */
  const { base1Attr1, base1Attr2 } = DerivativeObjectFactory(...attrs);
  const { base2Attr1, base2Attr2 } = AnotherDerivativeFactory(...attrs);

  /* You can also do other stuff here, which will be "private" to this scope */
  const someValue = someExpression;
  const anotherValue = anotherExpression;

  return {
    base1Attr1,
    base2Attr2,
    newValue: newExpression,
    anotherValue,
  };
}
```

### `Object.assign()`

- Add properties to an object from other objects

```js
function SomeBaseObjectFactory(...attrs) {
  return { ...attrs };
}

function DerivativeObjectFactory(...attrs) {
  const { attr1, attr2, attr3 } = SomeBaseObjectFactory(...attrs);

  return Object.assign(
    /* Attributes specific to this object; will be the "destination" */
    {
      newAttr1,
      newAttr2,
    },
    /* Attributes inherited from another */
    {
      attr1,
      attr2,
      attr3,
    }
  );
}

function AnotherDerivativeFactory(...attrs) {
  return Object.assign(
    { ...newAttrs },
    /* Most useful when inheriting completely */
    SomeBaseObjectFactory(...attrs)
  );
}

function EvenMoreDerivative(...attrs) {
  return Object.assign(
    {
      newValue: newExpression,
      anotherValue,
    },
    /* Can inherit from multiple objects */
    DerivativeObjectFactory(...attrs),
    AnotherDerivativeFactory(...attrs)
  );
}
```

### `Object.assign()` with `Object.create()`

- Useful when the base is just a single object

```js
const SomePrototype = {};

function SomeDerivative(...attrs) {
  /*  Create a new object base from another (prototype)
   *  Will set `baseObject`'s prototype to `SomePrototype`
   */
  const baseObject = Object.create(SomePrototype);

  /* Assign values exclusive to this object */
  const newObject = Object.assign(baseObject, {
    ...newAttrs,
  });

  /* Return it as the produced object */
  return newObject;
}

function AnotherDerivative(...attrs) {
  /* Or, more succinctly... */
  return Object.assign(Object.create(SomePrototype), {
    ...newAttrs,
  });
}
```

## Module Pattern

- JS modules are essentially a factory function but for only one object
- The factory is created, immediately used, then "discarded"

### IIFE

<!-- prettier-ignore -->
```js
/* IIFE */
(function (...attrs) {
  /* Do something within the private scope of this function */

  /* [Factory] produce an object */
  return { ...attrs };
})(...attrs);

/* To better illustrate: */
(
  /* This function expression is within parentheses, which evaluates to a callable value */
  function (...attrs) {
    /* Do something within the private scope of this function */

    /* [Factory] produce an object */
    return { ...attrs };
  }
  /* This callable value is then called here */
)(...attrs);

/* Give the function expression a name to see what happens */
const FunctionExpression = function (...attrs) {
  /* Do something within the private scope of this function */

  /* [Factory] produce an object */
  return { ...attrs };
}
(FunctionExpression)();
```

- _Immediately-invoked function expression_
- Primary method for implementing the module pattern
- The factory function is anonymous (has no declared name) and enclosed in parentheses, which makes it an expression
  - Arrow functions are more synonymous to being "anonymous" and can also be used for this purpose
- This expression is then _called immediately_, i.e. a calling notation `()` is appended right next to it

### ES6 Modules

- The IIFE approach, while handy, is already dated
- There's a proper module structure now in modern JS

#### An IIFE module

```js
const calculator = (() => {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return {
    add,
    sub,
    mul,
    div,
  };
})();

/* Use the `calculator` object */
calculator.add(3, 5); // 8
calculator.sub(6, 2); // 4
calculator.mul(14, 5534); // 77476
```

#### Converted into ES6 module

- In this approach, each module can be separated into their own files

```js
/* calculator.js */

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

export { add, sub, mul, div };
```

```js
/* app.js */

import { add, sub, mul, div } from './calculator.js';

calculator.add(3, 5); // 8
calculator.sub(6, 2); // 4
calculator.mul(14, 5534); // 77476
```

#### A single object?

The calculator IIFE can just be converted to an object literal syntax

```js
const calculator = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
};
```

Where it excels however, or factory functions in general, is in the ease of having "private" variables

```js
/* IIFE module (factory) */
const calculatorIIFE = (() => {
  let useCount = 0;
  const ctHelper = (opn) => {
    useCount++;
    return opn;
  };

  const add = ctHelper((a, b) => a + b);
  const sub = ctHelper((a, b) => a - b);
  const mul = ctHelper((a, b) => a * b);
  const div = ctHelper((a, b) => a / b);

  return { add, sub, mul, div, useCount };
})();

calculatorIIFE.ctHelper; // NOT accessible

/* Regular object literal */
const calculatorLiteral = {
  useCount: 0,
  ctHelper(opn) {
    useCount++;
    return opn;
  },
  get add() {
    return this.ctHelper((a, b) => a + b);
  },
  get sub() {
    return this.ctHelper((a, b) => a - b);
  },
  get mul() {
    return this.ctHelper((a, b) => a * b);
  },
  get div() {
    return this.ctHelper((a, b) => a / b);
  },
};

/*  There are ways to make this inaccessible,
 *  but it's largely not worth the hassle,
 *  especially since the module/factory approach is just much easier
 */
calculatorLiteral.ctHelper; // ACCESSIBLE
```

## Knowledge Check

- Describe common bugs you might run into using constructors.

  - Accidentally forget the `new` keyword
    - By itself, already weird in JS
  - Have trouble keeping track of `this` references

- Write a factory method that returns an object.

  ```js
  const Element = (tag, attrs, content, children) => ({
    tag,
    attrs,
    content,
    children,
  });
  ```

- Explain how scope works in JavaScript (bonus points if you can point out what ES6 changed!).

  - Scoping determines where and how a variable can be accessed, if at all
  - Depends on how it is declared
  - Variables with `let` and `const` are block-scoped
    - They can only be accessed within the enclosing block, i.e. within braces `{}`, or globally if not present
  - Variables with `var` are function-scoped
    - They can be accessed within the enclosing function, e.g. within `function () {}` (or another function syntax), or globally if not present
  - A function is also a block, but not all blocks are functions (e.g. `if` bodies are blocks)
  - ES6 was what introduced the `let` and `const` block scoping approaches
    - Prior to it, there was only `var`, thus all values are function scoped
    - Only functions can have their own "spaces", thus techniques such as factory functions and IIFE's were born
  - There are also other similar concepts, such as function hoisting

- Explain what Closure is and how it impacts private functions & variables.

  - A closure is a function that is nested within a function that accesses variables within that function and is also exposed outside that function
    - Variables may be a proper value, object, or yet another another function
  - Variables inside functions are effectively "private"
    - Functions have their own scope/space, outside of the global namespace
  - Closures allow a way of accessing and modifying these "private" variables without polluting the global namespace

- Describe how private functions & variables are useful.

  - Private variables minimize the possibility of name collision
    - This is especially frustrating when two or more values could meaningfully have a name but they'd have to share it
      - Technically possible
      - Invites disasters
  - Privatizing variables also mean that we are only exposing what is important
    - If it must be accessed from another, then it will be explicitly made so
    - Minimizes bugs, and greatly eases debugging when it happens

- Use inheritance in objects using the factory pattern.

  > I prefer the `Object.assign()`-`Object.create()` approach

  <!-- prettier-ignore -->
  ```js
  /* Properties and/or methods common to all `Person` objects */
  const PersonPrototype = {
    get introduction() {
      return `Hello! I am ${this.name}, ${this.age} years old.`;
    },
  };
  const Person = (name, age) => {
    const base = Object.create(PersonPrototype);
    return Object.assign(base, { name, age });
  };

  /* A `Student` is also a `Person` */
  const Student = (name, age, id) => {
    const base = Object.create(Person(name, age));
    return Object.assign(base, { id });
  };

  const me = Student('Mark', 4, 202200000);

  console.log(me);
  console.log(me.name);          // 'Mark'
  console.log(me.age);           // 4
  console.log(me.id);            // 202200000
  console.log(me.introduction);  // 'Hello! I am Mark, 4 years old.'
  ```

- Explain the module pattern.

  - Strictly speaking, the module pattern encloses a group of closely related lines of code into its own space, then exposes a specific portion of these for use by another entity, or even another module
  - In JS, this is implemented by taking advantage of function scoping
    - It is essentially a factory function but the is used only once, immediately after definition
    - The modern way is to treat separate source files as modules themselves
    - Modules can be created within them as well!

- Describe IIFE. What does it stand for?

  - Immediately-invoked function expression
  - It was the primary way of implementing the module pattern in JS
  - Create a function as anonymous, enclose it in parentheses, then call it right away

- Briefly explain namespacing and how it’s useful.

  - Putting variables of the same name within other objects or modules
  - Minimizes the possibility of renaming other already-used variables

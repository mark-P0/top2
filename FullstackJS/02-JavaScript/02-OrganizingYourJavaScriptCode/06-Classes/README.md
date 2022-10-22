# Classes

## Knowledge Check

- Describe the pros and cons of using classes in JavaScript.

  - Pros

    - Supports beginners that are taught about classes in introductory lessons
    - Feature is opt-in; meaning, those that want the `class` syntax can use it, without compromising those that do not want it
    - Frameworks can use classes as a way to enforce conventions and software architecture

  - Cons

    - Objects can be created on-the-fly without class instantiation
    - JavaScript uses prototypal inheritance as opposed to class-based inheritance
    - There are no "true" classes in JavaScript
      - The modern `class` syntax is essentially a wrapper over the native prototypal mechanisms, with some implicit additions

- How does JavaScript’s object creation differ from a language like Java or Ruby?

  - JavaScript can create objects directly without the need for class blueprints
  - Notation looks like map or dictionary syntax in other languages

- Explain the differences between object constructors and classes.

  - Traditional constructors

    - Defined with the `function` syntax, having implicit behavior triggered with the `new` keyword
    - Prototype information, that is, properties and methods shared across instances, must be explicitly assigned
    - Can be invoked without the `new` keyword, executing like a function, which is an extremely vague behavior
    - Private properties and methods must be enclosed inside closures

  - Classes

    - Syntax "looks" like it creates an enclosing block for all class-related properties and methods
    - Has a `constructor` method, which more or less functions like a traditional constructor function
      - Creates an implicit `this` with the `new` keyword
    - "Prototype" properties and methods can all be defined within the enclosing block
    - Cannot be invoked without the `new` keyword; thus, always returns object instances
    - Provides syntax for "top-level" private properties and methods (`#` prefix)

- What are “getters” & “setters”?

  - Think...
    - "computed properties"
      - The term "computed property" actually refers to another concept in JS, where variable values can be used as a property name in the object literal syntax
      - In this context, it is used to refer to its behavior of "computing" property values on-the-fly
    - "property accessors that can have side effects"
  - Functions that act like regular properties
  - Useful for limiting access to private properties, or attaching side effects

- Describe computed names and class fields.

  - Computed names

    ```js
    const propertyName = 'someValue';
    const anObject = {
      [propertyName]: 'someProperty',
    };

    const fieldName = 'class-' + propertyName;
    class AClass {
      [fieldName] = 'classValue';
    }
    ```

    - Variable or expression results used as a property or field name

  - Class fields
    <!-- prettier-ignore -->
    ```js
    class User {
      name = "John";
    }

    let user = new User();
    user.name;            // John
    User.prototype.name;  // undefined
    ```

    - Properties assigned to object instances, not to the "class" (or the underlying prototype)

- Describe function binding.

  - The enclosing class block creates a new `this` context, referring to new object instances
  - Methods defined using the function expression syntax has a `this` that is initially set to the new object instance
  - However, when passed directly to another code section, the `this` will be reassigned
  - A solution (or workaround really) is to use arrow functions for the method, whose `this` will always refer to the new object instance, even if passed around
  - This behavior is not exclusive to the class syntax!
    - The `this` reference of arrow functions are permanent, which allows this behavior
    - https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/#7-arrow-function

- Describe static properties.

  - Static properties and methods belong to the class itself
  - These are not visible from the instances nor their prototype
  - The class syntax returns an object with a function, which is essentially the same as the traditional object constructor function
  - "Calling" this "object" routes the call towards this constructor function
  - Static properties and methods are added to this same object
  - Regular methods inside the class block are added to the constructor prototype
  - Regular properties inside the class block are added to new object instances

- How is inheritance used with classes?

  - With the `extends` keyword

  ```js
  class Parent {
    /* ... */
  }

  class Child extends Parent {
    /* ... */
  }
  ```

- Why is favoring Composition over Inheritance suggested?

  - Leads to less coupled code
  - Parts that are composed into an object is easier to develop and troubleshoot as opposed to tracing the hierarchy of inheritance
  - Easier to define objects based on what they "can do" than on what they "are"

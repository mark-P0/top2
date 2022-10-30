# OOP Principles

> Abstract functionalities as much as possible!

## Knowledge Check

- Explain the “Single Responsibility Principle”.

  - Objects / Functions / Modules must have one role
  - All related functionalities must be grouped together in an object or module
  - Modifications to a behavior will happen on the location closest to those that need it

- Briefly explain the additional SOLID principles.

  - **Open-Close**
    - Must be open for extension
    - Must be closed for modification
  - **Liskov Substitution**
    - Closely related to polymorphism
  - **Interface Segregation**
    - Derivations must not be required to implement methods of its parent if not needed
    - Composition over inheritance
  - **Dependency Inversion**
    - "_Write a wrapper for everything\*!_"
    - Function use must not depend on how it is implemented; its implementation must depend on how it is used

- Explain what “tightly coupled” objects are and why we want to avoid them.

  - Objects are "tightly coupled" if they are directly dependent upon each other
    - One object knows the implementation details of another
    - One object directly uses the functionalities of another
  - They must be avoided because changing an object in a tightly-coupled relationship likely means a change in the other object (and all the other objects coupled into it)

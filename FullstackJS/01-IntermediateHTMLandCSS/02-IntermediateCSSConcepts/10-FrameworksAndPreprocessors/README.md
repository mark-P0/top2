# Frameworks and Preprocessors

## Frameworks

[Inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control)

- In plain CSS, you _form_ style rules according to your will
  - You _craft_ plain CSS
  - Everything is up to you
  - Along the process, you can possibly create a _framework_ tailored to your app
- With CSS frameworks, you _conform_ to the will of the [developers of the] framework
  - You _use_ frameworks
  - You fill-in-the-blanks
  - [Nearly] everything is templated
  - You complete the template
  - There are some things that you may not, or are incredibly difficult to change

Disadvantages

- Use of popular frameworks tend to make sites very similar to one another
- Use of frameworks dampens the importance of vanilla CSS
  - It is important in the off-chance that some styles in the framework need to be overridden, or reverse-engineered
  - Related to "frameworks make sites look the same"

### [Bootstrap](https://getbootstrap.com/)

- Grid-based
- Provides _component styles_
  - Whole elements

### [Tailwind](https://tailwindcss.com/)

- Provides _utility styles_
  - Composed together to create a _component style_
  - Can be collated in a JS framework, or with the `@apply` CSS
    - Was going to be a native part of CSS, but was abandoned
    - Tailwind has its own "implementation" of `@apply`

### [Bulma](https://bulma.io/)

- Alternative to Bootstrap

### [Foundation](https://get.foundation/)

- More complex
- More customizable

## Preprocessors

> aka _precompilers_

Makes CSS more like a general programming / scripting language

- Loops
- Combine stylesheets
- Nest classes
- Reuse classes

Extends plain CSS with...

- Nesting
- Mixins
- Variables (more powerful)

Preprocessors have their own little syntax, which are then compiled into regular CSS for use

### [SASS](https://sass-lang.com/)

> Syntactically Awesome Style Sheets

- Written in Ruby
- Used by Bootstrap
- Uses `$` prefix for variables
- Formats
  - `.sass`
    - Original
    - Indention-based
      - Think Python
    - Not recommended, as it is quite different from regular CSS
  - `.scss`
    - Newer
    - Block-based
      - Just like regular CSS
    - Recommended

### [LESS](https://lesscss.org/)

> Leaner Style Sheets

- Written in JavaScript
- Used by Bootstrap 3
- Uses `@` prefix for variables
  - Can be confused with things like `@import` or `@media`
- Format
  - `.less`

### [Stylus](https://stylus-lang.com/)

- Written in Node.js
- Has powerful built-in functions
- Can handle heavy computing
- Format
  - `.styl`

## Knowledge Check

- What are some advantages of using a CSS framework?

  > I am not a designer!
  >
  > I'm a frustrated designer!

  - Removes the tedious part of handcrafting styles
  - Reduces the time between development and launch

- What are some disadvantages of using a CSS framework?

  - Makes the application and developer dependent on the framework
  - Hard to debug, override

- What are some advantages of using a CSS preprocessor?

  - Turns CSS into more of a programming language
  - Lessens code repetition
  - Applies general software design principles

- What are some disadvantages of using a CSS preprocessor?

  - Have to learn syntax, nuances as an extension to plain CSS
  - Syntax can be different between preprocessors
  - Compiling time may be undesirable
  - Generated CSS can be very large
  - Debugging is severely limited, as the source files can be wildly different in the effective CSS files

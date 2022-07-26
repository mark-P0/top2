# Clean Code

> Just use [Prettier](https://prettier.io/) LOL

## Writing Clean Code

- Spacing
- Indention
- Descriptive, but concise variable names
- As much as possible, one expression per line

## Rules of Thumb

### Indention

- [ ] Tabs
  - Smaller file size, as it is a single character only
- [x] Spaces
  - Flexible

> I prefer spaces, as `Tab` can mean different things in different contexts
>
> - Spaces are pretty straightforward, i.e. single "space"
> - Tabs can have different widths on different editors
>
> However, I see the benefits of tabs especially with file size, and I am strongly considering their use

### Semicolons

- Actually optional in JavaScript
- JS can be written without semicolons like Python
- "Compiler" automatically adds semicolons
- Semicolons make boundaries between expressions explicit though

> Prettier has a toggle for semicolons, but I feel like it's part of JS' "identity" so I usually leave them on
>
> Except when I use `/* prettier-ignore */` 😅

### Line length

- Generally 80 characters
- Editors and IDEs usually have a setting for showing wrap boundaries (rulers)
- Break expressions after operators or commas
  > I prefer breaking _before_ operators though, because [I thought] I can comment out operands neatly.
  >
  > That was how Python [Black](https://github.com/psf/black) was enforcing it
  >
  > Now that I've thought about it though, Prettier's way might be more preferable

<!-- prettier-ignore -->
```js
const longExpression =
  operand1 +
  operand2 +
  operand3 +
  operand4;

const longArrays = [
  element1,
  element2,
  element3,
  element4,
];

const longFunctionCalls = someFunction(
  arg1,
  arg2,
  arg3,
  arg4,
)

const longExpressionMyPreference =
  operand1
  + operand2
  // + operand3  // Operands can be commented out neatly
  + operand4;

```

> Sometimes I prefer expressions to be as long as possible,
>
> Especially if it's a string, or like a two-element array, or two-argument function call
>
> Prettier enforces 80 characters, so `/* prettier-ignore */` to the rescue!

### Naming

- Use [`camelCase`](https://en.wikipedia.org/wiki/Camel_case)
- Names must be descriptive
- _Variables_ should start with a **noun** (data)
- _Functions_ should start with a **verb** (action)
- **Single-character variables** are OK in the context of loops or callback functions
  - But not anywhere else

## [10 Principles for Keeping Your Programming Code Clean](https://onextrapixel.com/10-principles-for-keeping-your-programming-code-clean/)

1. Revise Your Logic Before Coding

   - Use flow diagrams (flowcharts)
   - Write pseudocode
   - Also an important step for **problem-solving**

2. Clearly Expose the Structure of the Page

   - Use container elements with representative / descriptive IDs
   - Outline the sections of the page (or code)

   <!-- prettier-ignore -->
   ```html
   <div id="main-container">

     <div id="header">
       <div id="logo">...</div>
       <div id="main-menu">...</div>
     </div>

     <div id="content">
       <div id="left-column">...</div>
       <div id="center-column">...</div>
       <div id="right-column">...</div>
     </div>

     <div id="footer">
       <div id="footer-menu">...</div>
       <div id="disclaimer">...</div>
     </div>

   </div>
   ```

3. Use the Correct Indentation

   > I think this is not an issue of correctness as much as _**consistency**_.

   - Indent blocks and parentheses groupings appropriately and consistently
   - If an indention level is 1 tab or 2 spaces, use as much of that as needed
   - e.g. if the line is within two code blocks, use two indention levels

4. Write Explanatory Comments

   - Use comments especially on "magic" code lines
   - Or on relatively complex expressions
   - Or on deeply nested function compositions

5. Avoid Abusing Comments

   - Bad comments

     - Explanatory "note-to-self"s
     - Blaming other people
     - Making vague statements

   - Good comments

     - Authoring specifications / details
     - Detailed statements on what a method, function, or procedure does
     - Labels on change locations

6. Avoid Extremely Large Functions

   - Break down into smaller functions!
   - Try to describe functions. If it is described as "_It does this thing **and** another thing..._" it most likely can be broken down into several functions
   - Small functions can be tested easily

7. Use Naming Standards for Functions and Variables

   - Companies may have their own naming standards

8. Treat Changes with Caution

   - When something will be added or changed, be sure to keep **consistency** with the code so far
   - Keep the correct or same **indention**
   - Add a **comment** on new additions or modifications
   - Expand existing comments whenever applicable
   - Respect **standards** used

9. Avoid Indiscriminate Mixing of Coding Languages

   - As much as possible, avoid inline styles in HTML
   - As much as possible, avoid embedded `<script>` elements in HTML
   - As much as possible, prefer linking of external files

   &nbsp;

   > HTML is for webpage structure
   >
   > CSS is for webpage appearance
   >
   > JS is for webpage logic (supercharging it)

10. Summarize Your Imports

    - Do not import / link too many external files
    - Some files may be combined into one

## [Coding Without Comments](https://blog.codinghorror.com/coding-without-comments/)

- Write code as if there are no comments
- Use good variable and function names that are self-descriptive of what they represent

## Knowledge Check

- Why is it important to write clean code?

  - Readability
  - Future-proofing

- Name 5 clean code principles previously mentioned

  - Consistent indentions
  - Appropriate explanatory comments
  - Small-as-possible functions
  - Follow common naming standards
  - Don't mix languages

- What is the difference between good comments and bad comments?

  - Bad comments has no substance
  - Good comments are reasonably detailed

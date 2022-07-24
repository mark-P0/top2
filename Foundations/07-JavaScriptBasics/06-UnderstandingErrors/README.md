# Understanding Errors

## Anatomy of an error

- Error type

  - The general type of error
  - Gives an immediate idea of what has happened
  - Errors are actually implemented in the language itself, and this differentiates between them
  - Think of them as objects, or instances built in to the language

- Message

  - A somewhat specific description of what has happened
  - Helps narrow down the initial error type provided
  - May or may not be present

- Source (file & line number)

  - The name of the file in which the error happened
  - The specific line number from which the error has occurred
  - Helps in identifying what has gone wrong and where to possibly implement a fix

- Stack trace

  - The lead-up to the error
  - What functions, lines of codes were executed that produced the error
  - Helps in tracking down what the program has been doing
  - Also aids in reproducing the error for diagnosis

## Types of errors

Some of the most common types of errors include:

- **Syntax** errors

  - The code is not in correct "grammar"
  - The programming language has several rigid rules for writing, and some of these may not have been followed
  - Examples include:
    - Forgotten closing parenthesis, brackets, braces
    - Non-existent blocks
    - Confusion between blocks and objects
    - Confusion between expressions and statements
    - Improperly used language-reserved keywords, e.g. `if`, `for`

- **Reference** errors

  - Variables are used in expressions but has not been declared or initialized!
  - Variable names are mistyped!

- **Type** errors

  - Performing an operation on values or variables which is not implemented for their types
  - Modifying constant values
  - Using values inappropriately

## Resolving errors

1. **Read and understand** the error message _carefully_
   - If necessary, split it out to its parts according to its anatomy
   - An error is also essentially a "problem"
   - The same problem solving procedures apply
2. **Search** about the error
   - This is the reason why it is often said that "_Google is a developer's best friend_".
   - StackOverflow is a popular site for referencing error solutions
3. Use a **debugger**
   - This is what the browser devtools are for
   - Set breakpoints, inspect values in the REPL
4. `console.log()`
   - A debugger is often a better way than manual logging
   - This is the absolute baseline
   - If all else fails, you can still follow the code at every step of the way and log values at different sections
   - Hopefully, if the problem lies with the code, you will be able to identify at what exact step did things go awry

## Errors vs. Warnings

|                    | Errors  | Warnings                      |
| :----------------- | :------ | :---------------------------- |
| **Code execution** | Stops   | Continues                     |
| **Highlight**      | Red     | Yellow                        |
| **Urgency**        | Maximum | High; fixing would be helpful |

## Knowledge Check

- What are three reasons why you may see a TypeError?

  - One or more operand of an operation is of an unsupported or unexpected type

- What is the key difference between an error and a warning?

  - An error halts code execution
  - A warning simply logs a message, but should also be given addressed at the earliest convenience
  - Errors should be prioritized first, and then the warnings

- What is one method you can use to resolve an error?

  - "Method", as in an object method...?
  - `console.log()`...?

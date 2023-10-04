# More Testing

## Pure Functions

- Depends ONLY on input parameters
- Always produces the same output for a given input
- Pure functions are easy to test
- TDD encourages pure functions

## Mocking

- Making external dependencies (often functions) as _parameters_ to the function being tested
- These can then be _mocked_ to a new function that always behave as expected
- Functions are mocked for a variety of reasons, mostly because they are expensive, e.g. in terms of
  - Time
  - Money
  - Computing power

## What To Test?

https://www.youtube.com/watch?v=URSWYvyc42M

|      Message |    _Query_    |      _Command_      |
| -----------: | :-----------: | :-----------------: |
| **Incoming** | Assert result | Assert side effects |
|     **Self** |      ❌       |         ❌          |
| **Outgoing** |      ❌       |   Expect changes    |

---

_Types of messages_: Query and Command

- Inputs and Outputs to a function

|             | _Returns..._ | _Changes..._ |
| ----------: | :----------: | :----------: |
|   **Query** |      ✅      |      ❌      |
| **Command** |      ❌      |      ✅      |

---

> Ensure that functions being mocked are actually implemented!

## Knowledge Check

- What is tightly coupled code?

  - Code whose parts (e.g. functions, classes) are directly dependent on other parts
  - Impure functions / classes / methods

- What are the two requirements for a function to be pure?

  - Always produces the same output for a given input
    - Only depends on the input parameters
  - Has no side effects

- What are side effects and why is it important to identify them when testing a function?

  - Interactions from within the function with those outside the function

- What are two solutions to the tightly coupled code problem?

  - Remove outside dependencies
  - Mocking
    - Dependency injection?

- What is mocking?

  - Writing a function to be used in place of another
  - The mocked function is often used inside a function that is [unit] tested

- When would you use a mock function?

  - When a process that the function depends on is costly, requires user interaction, etc.
    - Arguably, the user interaction should NOT be inside a function to be tested at all
    - The result of the interaction should be used as an input to the testable function

- How should you test incoming query messages?

  - Assert their results

- Why should you not test implementation?

  - Because implementation is internal, private to the function
  - Implementation may be fluid, changed in favor of a more performant one, while still remaining the same input-output relationships
  - We only care about the inputs and the outputs, not the process

- Should you test private methods?

  - No
  - Unless there is a very good reason to do so!
    - e.g. the private method is a helper method that is sufficiently complex enough, but has no reason to be publicly accessible

- Why should you not test messages with no side effects?

  - Because they have no observable outputs
  - They should be dealt with in the unit tests for the class / function that receives those messages
  - Ideally, the unit being tested should not even send messages at all
    - At which point, it is not pure anymore
    - Functions must be as pure as possible
    - This is the reason why: because impurity is hard to test
    - Testing should help, not make things more complicated!

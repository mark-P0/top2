# Recursive Methods

## Recursion

Often applied on...

- Situations composed of smaller versions of the situation itself
- Certain data structures

## Knowledge Check

- How would you briefly define a recursive function?

  - A function that calls itself
  - A function whose result relies on calling itself

- What is the point of recursion? Is it more efficient than using a plain loop?

  - Recursive functions are often short and succinct than
  - It can be efficient than the iterative approach in certain cases
    - Often though, iterative approach can be made more efficient than the recursive
  - Needs to satisfy a strict set of limitations
    - e.g. uniform data types
    - not too deep

- What are the 2 essential parts in a recursive function?

  - Recursion call
    - Line that calls the function within the function
    - Is what classifies the function as a recursion
  - Base case
    - A terminating case to allow the recursion to end
    - Otherwise, the function would keep calling itself again and again until either...
      - the recursion limit is reached, or
      - the call stack is filled

- Why is “stack overflow” relevant to a recursive problem?

  - Function calls are stored in a "stack" data structure
  - It is a "first-in, last-out" (FILO) structure
  - It is stored in the memory in this particular fashion
  - Each function call is "pushed" into the stack
  - Each function return is "popped" from the stack
  - A recursive function that calls itself repeatedly also pushes repeatedly onto the call stack
  - The stack is not of indefinite "height"; given long enough time, it will be filled
  - Once this is filled, there are no more space on the stack (and memory), and there are no more space for another call
  - Therefore, further calls will "overflow" from the stack (as they are not contained anymore)
  - At which point the program will most likely fail/crash
  - It is for this particular reason that a base case is necessary
  - So that items in the call stack may be allowed to be popped off, i.e "return" a value

# Space Complexity

How much memory is used by the algorithm as the inputs increase

- Inputs need to be stored in memory
- If the input is very large (e.g. a dataset), the required memory will also be large!

## Notations

> Largely the same as Time Complexity

- `O(1)` Constant space
- `O(log N)` Logarithmic space
- `O(N)` Linear space
- `O(N log N)`
- `O(n²)` Quadratic space
- `O(n³)` Cubic space
- `O(2ⁿ)` Exponential space
- `O(N!)` Factorial space

## Analysis scope

- Err on the side of caution
- If an algorithm accesses something, consider the memory of that "something" to be part of the Space Complexity of the algorithm
- Whenever possible, do not create a local copy of anything!

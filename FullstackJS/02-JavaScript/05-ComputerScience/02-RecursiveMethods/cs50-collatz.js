function collatz(n) {
  /* Validation */
  if (n < 1) return Number.isNaN;

  /* Base case */
  if (n === 1) return 0;

  /* Recursion */

  // if (n % 2 === 0) return 1 + collatz(n / 2);
  // return 1 + collatz(3 * n + 1);

  return 1 + (n % 2 === 0 ? collatz(n / 2) : collatz(3 * n + 1));
}

/* prettier-ignore */
console.log([
    collatz(12) /* === 10 - 1 */,
    collatz( 1) /* ===   0 */,
    collatz( 2) /* ===   1 */,
    collatz( 3) /* ===   7 */,
    collatz( 4) /* ===   2 */,
    collatz( 5) /* ===   5 */,
    collatz( 6) /* ===   8 */,
    collatz( 7) /* ===  16 */,
    collatz( 8) /* ===   3 */,
    collatz(15) /* ===  17 */,
    collatz(27) /* === 111 */,
    collatz(50) /* ===  24 */,
  ]
  // .filter((isTrue) => !isTrue)
)

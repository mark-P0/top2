/*  https://javascript.info/recursion#tasks
 */

const Tasks = {
  SumAllNumbersUntilOne() {
    function sumToLoop(n) {
      // /* prettier-ignore */
      // if (
      //   !Number.isInteger(n) ||
      //   n <= 0 ||
      //   false
      // ) return Number.NaN;

      let sum = 0;
      for (; n > 0; n--) sum += n;
      return sum;
    }

    function sumToRecursive(n) {
      // /* prettier-ignore */
      // if (
      //   !Number.isInteger(n) ||
      //   n <= 0 ||
      //   false
      // ) return Number.NaN;

      if (n === 1) return 1;
      return n + sumToRecursive(n - 1);
    }

    function sumToFormula(n) {
      // /* prettier-ignore */
      // if (
      //   !Number.isInteger(n) ||
      //   n <= 0 ||
      //   false
      // ) return Number.NaN;

      return (n * (n + 1)) / 2;
    }

    function helper(value) {
      return [sumToLoop, sumToRecursive, sumToFormula].map((fn) => {
        const start = performance.now();

        let res = Number.NaN;
        let isSuccess = false;
        try {
          res = fn(value);
          isSuccess = true;
        } catch {}

        console.log({ value, isSuccess, elapsed: performance.now() - start });
        return res;
      });
    }

    /* prettier-ignore */
    let _ = [
      // helper({}),
      // helper('string'),
      // helper(-5),
      // helper(-1),
      // helper(0),
      helper(1),
      helper(2),
      helper(3),
      helper(42),
      helper(123),
      helper(100000),  // recursion fails
    ]
    _;
  },

  CalculateFactorial() {
    function factorial(n) {
      if (n === 1) return 1;
      return n * factorial(n - 1);
    }

    const factorialExpr = (n) => (n === 1 ? 1 : n * factorial(n - 1));

    factorial = factorialExpr;

    console.log(factorial(1)); // 1! =                       1
    console.log(factorial(2)); // 2! =             2 * 1 =   2
    console.log(factorial(3)); // 3! =         3 * 2 * 1 =   6
    console.log(factorial(4)); // 4! =     4 * 3 * 2 * 1 =  24
    console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
  },

  FibonacciNumbers() {
    // function fib(n, seed = [1, 1]) {
    //   /* prettier-ignore */
    //   if (
    //     n === 1 ||
    //     n === 2 ||
    //     false
    //   ) return seed[n - 1]
    //
    //   return fib(n - 1) + fib(n - 2);
    // }

    /* Slowest... */

    // function fib(n, seed = [1, 1]) {
    //   if (n < 1) return Number.NaN;
    //
    //   const _m = seed.slice();
    //   function __recurse(n) {
    //     if (n === 1) return _m[0];
    //     _m[1] = _m[1] + _m[0];
    //     _m[0] = _m[1] - _m[0];
    //     return __recurse(n - 1);
    //   }
    //   return __recurse(n);
    // }

    /* Fastest; stolen lol */

    // function fib(n, n1 = 1, n2 = 1) {
    //   /*   n1  n2
    //    *    1,  1, ( 2,  3) ...
    //    *    1,  2, ( 3,  5) ...
    //    *    2,  3, ( 5,  8) ...
    //    *    3,  5, ( 8, 13) ...
    //    *  ...etc.
    //    */
    //   if (n < 1) return Number.NaN;
    //   if (n === 1) return n1;
    //   return fib(n - 1, n2, n1 + n2);
    // }

    /* Second fastest */

    function fib(n, mem = [1, 1]) {
      /*  [ 1,  1, ( 2,  3)]
       *  [ 1,  2, ( 3,  5)]
       *  [ 2,  3, ( 5,  8)]
       *  [ 3,  5, ( 8, 13)]
       *  ...etc.
       */
      if (n < 1) return Number.NaN;
      if (n === 1) return mem[0];
      return fib(n - 1, [mem[1], mem[0] + mem[1]]);
    }

    let start = performance.now();
    console.log(fib(3)); // 2
    console.log(fib(7)); // 13
    console.log(fib(77)); // 5527939700884757
    console.log(performance.now() - start);
  },

  OutputSingleLinkedList() {
    function timer(callback) {
      const start = performance.now();
      callback();
      return performance.now() - start;
    }

    function printListIterative(list) {
      let node = list;

      while (node !== null) {
        console.log(node.value);
        node = node.next;
      }
    }

    function printListRecursive(list) {
      let node = list;

      if (node === null) return;
      console.log(node.value);
      printListRecursive(node.next);
    }

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };

    /* prettier-ignore */
    let _ = [
      timer(() => printListIterative(list)),
      timer(() => printListRecursive(list)),
    ]
    _;
  },

  OutputSingleLinkedListReversed() {
    function timer(callback) {
      const start = performance.now();
      callback();
      return performance.now() - start;
    }

    function printListIterative(list) {
      let node = list;

      const listRep = [];
      while (node !== null) {
        listRep.unshift(node);
        node = node.next;
      }

      for (const node of listRep) {
        console.log(node.value);
      }
    }

    function printListRecursive(list) {
      let node = list;

      if (node === null) return;
      printListRecursive(node.next);
      console.log(node.value);
    }

    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };

    /* prettier-ignore */
    let _ = [
      timer(() => printListIterative(list)),
      timer(() => printListRecursive(list)),
    ]
    _;
  },

  _() {},
};

for (const t in Tasks) Tasks[t]();

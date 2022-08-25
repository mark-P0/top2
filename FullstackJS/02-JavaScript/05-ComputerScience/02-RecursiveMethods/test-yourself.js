/*  https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion
 */

const Questions = {
  Question1() {
    /*  Question 1: Sum all numbers
     *  Write a function called sumRange. It will take a number and
     *  return the sum of all numbers from 1 up to the number passed in.
     */

    function sumRange(n) {
      /*  Goal:
       *  n + (n - 1) + (n - 2) + ... + 1
       */

      if (n < 1) return 0;
      if (n === 1) return 1;
      return n + sumRange(n - 1);
    }

    /* prettier-ignore */
    let _ = [
      sumRange(3),
    ];
    _;
  },

  Question2() {
    /*  Question 2: Power function
     *  Write a function called power which takes in a base and an exponent.
     *  If the exponent is 0, return 1.
     */

    function power(base, exponent) {
      /*  Goal:
       *  base * base * base * ... * base * 1
       */

      if (exponent < 0) return Number.NaN;
      if (exponent === 0) return 1;
      return base * power(base, exponent - 1);
    }

    /* prettier-ignore */
    let _ = [
      // [power(2, 4), 16, power(2, 4) === 16],
      // [power(2, 3),  8, power(2, 3) ===  8],
      // [power(2, 2),  4, power(2, 2) ===  4],
      // [power(2, 1),  2, power(2, 1) ===  2],
      // [power(2, 0),  1, power(2, 0) ===  1],
      power(-2, -1),
    ];
    _;

    console.log(power(2, 4)); // 16
    console.log(power(2, 3)); //  8
    console.log(power(2, 2)); //  4
    console.log(power(2, 1)); //  2
    console.log(power(2, 0)); //  1
  },

  Question3() {
    /*  Question 3: Calculate factorial
     *  Write a function that returns the factorial of a number. As a quick refresher,
     *  a factorial of a number is the result of that number multiplied by the number
     *  before it, and the number before that number, and so on, until you reach 1.
     *  The factorial of 1 is just 1.
     */

    function factorial(n) {
      /*  Goal:
       *  n * (n - 1) * (n - 2) * ... * 1
       */

      if (n < 0) return 0;
      if (n === 0) return 1; // !0 = 1
      if (n === 1) return 1;
      return n * factorial(n - 1);
    }

    /* prettier-ignore */
    let _ = [
      factorial(5) // 5 * 4 * 3 * 2 * 1 === 120
    ];
    _;

    console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 === 120
  },

  Question4() {
    /*  Question 4: Check all values in an array
     *  Write a function called all which accepts an array and a callback and
     *  returns true if every value in the array returns true when passed as
     *  parameter to the callback function
     */

    function all(array, callback) {
      /*  Goal:
       *  f(arr[0]) && f(arr[0 + 1]) && f(arr[0 + 2]) && ... && f(arr[arr.length - 1])
       */

      /*  Would be optimized if index-based instead of creating array copies...
       *  Can add idx property to array itself but is JS-specific...
       *  Can track idx outside function but would be impure...
       *  Can use .shift()-based logic but would modify passed array...
       *  && operator short-circuits if left operand is false
       *
       *  Write a wrapper/closure?
       */

      /* prettier-ignore */
      if (
        !Array.isArray(array) ||
        array.length === 0 ||
        false
      )
        return false;

      if (array.length === 1) return callback(array[0]);
      return callback(array[0]) && all(array.slice(1), callback);
      // return callback(array.shift()) && all(array, callback);
    }

    /* prettier-ignore */
    let _ = [
      all([1,2,9], (num) => num < 7),
      all([1,2,3], (num) => num < 7),
      all([10, 11, 12, 13], (num) => num < 7),
      all([10], (num) => num < 7),
      all([7], (num) => num < 7),
      all([], (num) => num < 7),
      all('', (num) => num < 7),
    ];
    _;
  },

  Question5() {
    /*  Question 5: Product of an array
     *  Write a function called productOfArray which takes in
     *  an array of numbers and returns the product of them all
     */

    function productOfArray(array) {
      /* Recursion closure */

      /* prettier-ignore */
      if (
        !Array.isArray(array) ||
        array.length === 0 ||
        false
      )
        return false;

      array = array.slice(); // Create mutatable copy

      function __recurse() {
        if (array.length === 1) return array.shift();
        return array.shift() * __recurse(array);
      }

      return __recurse();
    }

    /* prettier-ignore */
    let _ = [
      productOfArray([1,2,3]), // 6
      productOfArray([1,2,3,10]), // 60
    ];
    _;

    console.log(productOfArray([1, 2, 3])); // 6
    console.log(productOfArray([1, 2, 3, 10])); // 60
  },

  Question6() {
    /*  Question 6: Search JS object
     *  Write a function called contains that searches for a value in a nested object.
     *  It returns true if the object contains that value.
     */

    function isObjectLiteral(object) {
      /*  https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
       */

      return Object.getPrototypeOf(object) === Object.prototype;
    }

    function contains(object, value) {
      /* prettier-ignore */
      if (
        !isObjectLiteral(object) ||
        ((typeof value) === 'object') ||
        false
      ) return false

      let result = false;
      for (const objVal of Object.values(object)) {
        console.log({ result, value, objVal });

        if (isObjectLiteral(objVal)) result ||= contains(objVal, value);
        result ||= value === objVal;
        if (result) break;
      }

      return result;
    }

    // function contains(object, value) {
    //   /* prettier-ignore */
    //   if (
    //     !isObjectLiteral(object) ||
    //     ((typeof value) === 'object') ||
    //     false
    //   ) return false
    //
    //   for (const objVal of Object.values(object)) {
    //     if (isObjectLiteral(objVal)) return contains(objVal, value);
    //     if (value === objVal) return true;
    //   }
    //   return false;
    // }

    const nestedObject = {
      data: {
        info: {
          stuff: {
            thing: {
              moreStuff: {
                magicNumber: 44,
                something: 'foo2',
              },
              moreValue: 789,
            },
          },
          anotherValue: 456,
        },
      },
      value: 123,
    };

    // const nestedObject = {
    //   foo: {
    //     fizz: 3,
    //     buzz: 5,
    //   },
    //   bar: 'string',
    //   baz: 123,
    // };
    //
    // console.log(contains(nestedObject, 5));

    // /* prettier-ignore */
    // let _ = [
    //   contains(nestedObject, 44), // true
    //   contains(nestedObject, "foo"), // false
    // ]
    // _;

    console.log(contains(nestedObject, 44)); // true
    console.log(contains(nestedObject, 'foo')); // false
    console.log(contains(nestedObject, 'foo2')); // true
    console.log(contains(nestedObject, 123)); // true
    console.log(contains(nestedObject, 456)); // true
    console.log(contains(nestedObject, 789)); // true
  },

  Question7() {
    /*  Question 7: Parse a multi-dimensional array
     *  Given a multi-dimensional integer array,
     *  return the total number of integers stored inside this array
     */

    // function totalIntegers(array) {
    //   if (!Array.isArray(array)) return Number.NaN;
    //
    //   let ct = 0;
    //   for (const item of array) {
    //     if (Array.isArray(item)) ct += totalIntegers(item);
    //     if (Number.isInteger(item)) ct += 1;
    //   }
    //   return ct;
    // }

    function totalIntegers(array) {
      if (!Array.isArray(array)) return Number.NaN;

      /* Create copy */
      // array = JSON.parse(JSON.stringify(array));
      array = structuredClone(array);

      function __recurse(array) {
        if (array.length === 0) return 0;

        let ct = 0;
        const item = array.shift();
        if (Array.isArray(item)) ct += __recurse(item);
        if (Number.isInteger(item)) ct += 1;
        return ct + __recurse(array);
      }

      return __recurse(array);
    }

    const mdArray = [
      /*  */
      [[5], 3],
      0,
      2,
      ['foo'],
      [],
      [4, [5, 6]],
    ];

    let _ = [
      /*  */
      totalIntegers(mdArray),
    ];
    _;
  },

  Question8() {
    /*  Question 8:
     *  Write a function that sums squares of numbers in list that may contain more lists
     */

    function sumSquares(array) {
      if (!Array.isArray(array)) return Number.NaN;

      let sum = 0;
      for (const item of array) {
        if (Array.isArray(item)) sum += sumSquares(item);
        if (Number.isInteger(item)) sum += item ** 2;
      }
      return sum;
    }

    let l = [1, 2, 3];
    console.log(sumSquares(l)); // 1 + 4 + 9 = 14

    l = [[1, 2], 3];
    console.log(sumSquares(l)); // 1 + 4 + 9 = 14

    l = [[[[[[[[[1]]]]]]]]];
    console.log(sumSquares(l)); // 1 = 1

    l = [10, [[10], 10], [10]];
    console.log(sumSquares(l)); // 100 + 100 + 100 + 100 = 400
  },

  Question9() {
    /*  Question 9:
     *  The function should return an array containing repetitions of the number argument.
     *  For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative,
     *  return an empty array.
     */

    function replicate(ct, num) {
      /* prettier-ignore */
      if (
        !Number.isInteger(ct) ||
        !Number.isInteger(num) ||
        ct < 1 ||
        false
      ) return []

      // return [num, ...replicate(ct - 1, num)];
      return [num].concat(replicate(ct - 1, num)); // Provided answer; I forgot about `.concat()`...
    }

    console.log(replicate(3, 5)); // [5, 5, 5]
    console.log(replicate(1, 69)); // [69]
    console.log(replicate(-2, 6)); // []
  },

  QuestionX() {
    /*  ...
     *  ...
     *  ...
     */
  },
};

for (const q in Questions) Questions[q]();

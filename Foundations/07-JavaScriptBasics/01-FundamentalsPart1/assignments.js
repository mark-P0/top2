/* Try the following exercises (and don’t forget to use console.log()!): */

/*  1. Add 2 numbers together! (just type console.log(23 + 97) into your html file)
 */
console.log(23 + 97);

/*  2. Add a sequence of 6 different numbers together.
 */
console.log(1 + 2 + 3 + 5 + 8 + 13);

/*  3. Print the solution to the following equation: (4 + 6 + 9) / 77
 *      Answer should be approximately 0.24675
 */
console.log((4 + 6 + 9) / 77);

/*  4. Let’s use variables!
 *      Type the following at the top of the script tag: let a = 10
 *      In the console console.log(a) should print 10
 *      Try the following: 9 * a
 *      and this: let b = 7 * a (returns undefined *) and then console.log(b)
 *
 *      * As you might have noticed by running Javascript code in the console, the console prints the result of the code it executes (called a return statement). You will learn more about these in the next lessons, however for now it is good to remember that a declaration with an assignment (such as let b = 7 * a) returns undefined and so you cannot declare and assign a value to a variable and read its value in the same line.
 */
let a = 10;
console.log(a);
console.log(9 * a);
let b = 7 * a;
console.log(b);

/*  5. You should be getting the hang of this by now… try this sequence:
 *      Declare a constant variable `max` with the value `57`
 *      Set another variable `actual` to `max - 13`
 *      Set another variable `percentage` to `actual / max`
 *      If you type `percentage` in the console and press enter you should see a value like 0.7719
 */
const max = 57;
const actual = max - 13;
const percentage = actual / max;
console.log(percentage);

/*  6. Take a few minutes to keep playing around with various things
 *     in your script tag. Eventually, we will learn how to actually
 *     make those numbers and things show up on the webpage, but all of
 *     this logic will remain the same, so make sure you’re comfortable
 *     with it before moving on.
 */
// ...

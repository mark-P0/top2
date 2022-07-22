/*  Type conversions
 *  importance: 5
 *
 *  What are results of these expressions?
 *  Think well, write down and then compare with the answer.
 */

/* prettier-ignore */
{
  "" + 1 + 0     // '10'      // ✅
  "" - 1 + 0     // NaN       // ❌
  true + false   // 1         // ✅
  6 / "3"        // 2         // ✅
  "2" * "3"      // 6         // ✅
  4 + 5 + "px"   // '9px'     // ✅
  "$" + 4 + 5    // '$45'     // ✅
  "4" - 2        // 2         // ✅
  "4px" - 2      // '4px2'    // ❌
  "  -9  " + 5   // '  -9  5' // ✅
  "  -9  " - 5   // NaN       // ❌
  null + 1       // error     // ❌
  undefined + 1  // error     // ❌
  " \t \n" - 2   // NaN       // ❌
}

const _ = {
  '"" + 1 + 0': '' + 1 + 0,
  '"" - 1 + 0': '' - 1 + 0,
  'true + false': true + false,
  '6 / "3"': 6 / '3',
  '"2" * "3"': '2' * '3',
  '4 + 5 + "px"': 4 + 5 + 'px',
  '"$" + 4 + 5': '$' + 4 + 5,
  '"4" - 2': '4' - 2,
  '"4px" - 2': '4px' - 2,
  '"  -9  " + 5': '  -9  ' + 5,
  '"  -9  " - 5': '  -9  ' - 5,
  'null + 1': null + 1,
  'undefined + 1': undefined + 1,
  '" \t \n" - 2': ' \t \n' - 2,
};
console.log(Object.values(_));

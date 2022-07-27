/*  Copy the example above into files on your own computer. To make it work you’ll need to supply the rest of the HTML skeleton and either link your JavaScript file, or put the JavaScript into a script tag on the page. Make sure everything is working before moving on!
 *
 *  Add the following elements to the container using ONLY JavaScript and the DOM methods shown above.
 *
 *  1. a <p> with red text that says “Hey I’m red!”
 *  2. an <h3> with blue text that says “I’m a blue h3!”
 *  3. a <div> with a black border and pink background color with the following elements inside of it:
 *      a. another <h1> that says “I’m in a div”
 *      b. a <p> that says “ME TOO!”
 *      c. Hint for this one: after creating the <div> with createElement, append the <h1> and <p> to it before adding it to the container.
 */

const container = document.querySelector('#container');
const newElements = [];

/*  1. a <p> with red text that says “Hey I’m red!”
 */
const element1Para = document.createElement('p');
element1Para.id = 'element-1';
element1Para.style.color = 'red';
element1Para.textContent = "Hey I'm red!";
newElements.push(element1Para);

/*  2. an <h3> with blue text that says “I’m a blue h3!”
 */
const element2Header = document.createElement('h3');
element2Header.id = 'element-2';
element2Header.style.color = 'blue';
element2Header.textContent = "I'm a blue h3!";
newElements.push(element2Header);

/*  3.  a <div> with a black border and pink background color with the
 *      following elements inside of it:
 *
 *      a.  another <h1> that says “I’m in a div”
 *      b.  a <p> that says “ME TOO!”
 *      c.  Hint for this one: after creating the <div> with createElement,
 *          append the <h1> and <p> to it before adding it to the container.
 */
const element3Div = document.createElement('div');
element3Div.id = 'element-3';
element3Div.style.cssText = `
  border: 1px solid black;
  background-color: pink;
`;

const element3AHeader = document.createElement('h1');
element3AHeader.textContent = "I'm in a div";
const element3BPara = document.createElement('p');
element3BPara.textContent = 'ME TOO!';

for (const newChild of [element3AHeader, element3BPara])
  element3Div.appendChild(newChild);
newElements.push(element3Div);

/*  */

for (const element of newElements) container.appendChild(element);

// console.log({ container });

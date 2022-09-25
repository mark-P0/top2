/*  Exercise
 *  Write a constructor for making "Book" objects.
 *  We will revisit this in the project at the end of this lesson.
 *  Your book objects should have the book's `title`, `author`,
 *  the number of `pages`, and whether or not you have `read` the book.
 *
 *  Put a function into the constructor that can report the book info
 *  like so:
 *  ```js
 *  theHobbit.info() // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
 *  ```
 */

const BookPrototype = {
  title: undefined,
  author: undefined,
  pages: undefined,
  isRead: undefined,

  info() {
    const readMsg = this.isRead ? 'already read' : 'not read yet';

    const plurality = (word, count) => (count === 1 ? word : `${word}s`);
    const pageWord = plurality('page', this.pages);

    return `${this.title} by ${this.author}, ${this.pages} ${pageWord}, ${readMsg}`;
  },
};

/* Constructor approach */
function BookConstructor(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
BookConstructor.prototype = BookPrototype;

/* Factory approach */
const BookFactory = (title, author, pages, isRead) => {
  return {
    title,
    author,
    pages,
    isRead,
    __proto__: BookPrototype, // MDN mentions this as an alternative to `Object.create`
  };
};

const hobbits = [
  new BookConstructor('The Hobbit', 'J.R.R. Tolkien', 295, false),
  BookFactory('The Hobbit', 'J.R.R. Tolkien', 295, false),
];
for (const theHobbit of hobbits) {
  console.log(
    theHobbit.info() // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
  );
}

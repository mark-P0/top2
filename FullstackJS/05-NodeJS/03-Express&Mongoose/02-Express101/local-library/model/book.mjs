import { Schema, model } from "mongoose";
import "./_db-init.mjs";

const { ObjectId } = Schema.Types;

/** @typedef {import('./author.mjs').TAuthor} TAuthor */
/** @typedef {import("./genre.mjs").TGenre} TGenre */

/**
 * @typedef {import('mongoose').InferSchemaType<typeof BookSchema>} TBookValues
 * @typedef {import('mongoose').ObtainSchemaGeneric<typeof BookSchema, "TVirtuals">} TBookVirtuals
 * @typedef {TBookValues & TBookVirtuals} TBook
 */
const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: "Author", required: true }, // TODO - Multiple authors possible?
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: ObjectId, ref: "Genre" }], // Multiple genres possible
  },
  {
    virtuals: {
      url: {
        get() {
          const { _id } = this;
          return `/catalog/book/${_id}`;
        },
      },
    },
  },
);

export const Book = model("Book", BookSchema);

export async function countBooks() {
  const query = Book.countDocuments({});
  return await query.exec();
}

export async function getBookListData() {
  /** @typedef {Pick<TBook, "title" | "author" | "url">} BookTitleAndAuthor */

  /** @type {ReturnType<typeof Book.find<BookTitleAndAuthor>>} */
  const qFind = Book.find({}, { title: 1, author: 1 });
  /** @type {ReturnType<typeof qFind.populate<{ author: TAuthor }>>} */
  const qPopulate = qFind.populate("author");
  const query = qPopulate.sort({ title: 1 });

  const res = await query.exec();
  return res;
}

export async function getBooksByGenreId(/** @type {string} */ id) {
  const query = Book.find({ genre: id }).sort({ title: 1 });
  return await query.exec();
}

export async function getBookData(/** @type {string} */ id) {
  const qFind = Book.findById(id);
  /** @type {ReturnType<typeof qFind.populate<{ author: TAuthor, genre: TGenre[] }>>} */
  const qPopulate = qFind.populate(["author", "genre"]);

  const res = await qPopulate.exec();
  return res ?? null;
}

export async function getBooksByAuthor(/** @type {string} */ id) {
  const query = Book.find({ author: id }).sort({ title: 1 });
  return query.exec();
}

export async function createBook(
  /** @type {string} */ title,
  /** @type {string} */ authorId,
  /** @type {string} */ summary,
  /** @type {string} */ isbn,
  /** @type {string[]} */ genreIds,
) {
  const author = authorId;
  const genre = genreIds;
  return new Book({ title, author, summary, isbn, genre }).save();
}

export async function getBooks() {
  const query = Book.find({}).sort({ title: 1 }).lean();
  return await query.exec();
}

export async function deleteBook(/** @type {string} */ id) {
  await Book.findByIdAndRemove(id);
}

export async function updateBook(
  /** @type {string} */ id,
  /** @type {string} */ title,
  /** @type {string} */ authorId,
  /** @type {string} */ summary,
  /** @type {string} */ isbn,
  /** @type {string[]} */ genreIds,
) {
  const author = authorId;
  const genre = genreIds;
  return Book.findByIdAndUpdate(
    id,
    { title, author, summary, isbn, genre },
    {},
  );
}

import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getAuthorsListData } from "../model/author.mjs";
import { getBookCopies } from "../model/book-instance.mjs";
import {
  createBook,
  deleteBook,
  getBookData,
  updateBook,
} from "../model/book.mjs";
import { getGenresListData } from "../model/genre.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

/** @typedef {Parameters<import('express').RequestHandler>[1]} Response */

async function getGenreSelectionData(
  /** @type {string[] | null} */ selectedGenreIds,
) {
  const rawGenres = await getGenresListData();
  const genres = rawGenres.map(({ _id, name }) => ({
    id: _id.toString(),
    name,
    isChecked: selectedGenreIds?.includes(_id.toString()) ?? false,
  }));
  return genres;
}
async function getAuthorSelectionData(
  /** @type {string | null} */ selectedAuthorId,
) {
  const rawAuthors = await getAuthorsListData();
  const authors = rawAuthors.map(({ _id, name }) => ({
    id: _id.toString(),
    name,
    isSelected: _id.toString() === selectedAuthorId,
  }));
  return authors;
}

async function getBookDetails(/** @type {string} */ id) {
  if (!isValidId(id)) raise(`Book of id ${id} does not exist!`);

  const [data, copiesRaw] = await Promise.all([
    getBookData(id),
    getBookCopies(id),
  ]);
  if (data === null) raise(`Book of id ${id} does not exist!`);

  const { title, author, summary, isbn, genre } = data;
  const copies = copiesRaw.map(
    ({ status, imprint, url, due_back_formatted }) => ({
      status,
      imprint,
      url,
      due_back_formatted,
    }),
  );

  return { title, author, summary, isbn, genre, copies };
}

function getFormMiddlewares({ isUpdating }) {
  return [
    /** Pre-parse genre input to ensure it is an array */
    (req, res, next) => {
      const { genreIds } = req.body;
      if (typeof genreIds === "string") req.body.genreIds = [genreIds];
      else if (Array.isArray(genreIds)) null;
      else req.body.genreIds = [];
      next();
    },

    /** Validations and sanitization */
    body("title") // TODO Require minimum length?
      .trim()
      .isLength({ min: 1 })
      .withMessage("Book title was not provided")
      .escape(),
    body("authorId")
      .trim()
      .isLength({ min: 1 })
      .withMessage("No author was selected")
      .escape(),
    body("summary") // TODO Require minimum length?
      .trim()
      .isLength({ min: 1 })
      .withMessage("Summary was not provided")
      .escape(),
    body("isbn")
      .trim()
      .isNumeric()
      .withMessage("Given ISBN is invalid")
      .isLength({ min: 13, max: 13 })
      .withMessage("Code does not conform to ISBN13 standard")
      .escape(),
    body("genreIds.*").trim().escape(), // "For every entry under the `genreIds` array, trim and sanitize"

    /** Actual routing */
    withNextError(async (req, res, next) => {
      const { genreIds, authorId, title, summary, isbn } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const [genres, authors] = await Promise.all([
          getGenreSelectionData(genreIds),
          getAuthorSelectionData(authorId),
        ]);

        const defaultTitle = title;
        const defaultSummary = summary;
        const defaultISBN = isbn;

        res.status(400); // BAD REQUEST because posted data is invalid
        res.render("forms/book.ejs", {
          ...{ isUpdating, errors: errors.array().map(({ msg }) => msg) },
          ...{ genres, authors },
          ...{ defaultTitle, defaultSummary, defaultISBN },
        });
        return;
      }

      next();
    }),
  ];
}

export const BookRouter = Router();

BookRouter.get(
  "/catalog/book",
  withNextError(async (req, res, next) => {
    res.redirect("/catalog/book/create");
  }),
);

/** Create */
BookRouter.get(
  "/catalog/book/create",
  withNextError(async (req, res, next) => {
    const [genres, authors] = await Promise.all([
      getGenreSelectionData(null),
      getAuthorSelectionData(null),
    ]);

    res.render("forms/book.ejs", {
      ...{ isUpdating: false, errors: null },
      ...{ genres, authors },
      ...{ defaultTitle: "", defaultSummary: "", defaultISBN: "" },
    });
  }),
);
BookRouter.post(
  "/catalog/book/create",
  ...getFormMiddlewares({ isUpdating: false }),
  withNextError(async (req, res, next) => {
    const { genreIds, authorId, title, summary, isbn } = req.body;
    const book = await createBook(title, authorId, summary, isbn, genreIds);
    res.redirect(book.url);
  }),
);

/** Read */
BookRouter.get(
  "/catalog/book/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, summary, isbn, genre, copies } =
      await getBookDetails(id);

    res.render("details/book.ejs", {
      ...{ id, showDeleteButton: false, errors: null },
      ...{ title, author, summary, isbn, genre, copies },
    });
  }),
);

/** Update */
BookRouter.get(
  "/catalog/book/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, summary, isbn, genre } = await getBookDetails(id);

    const [genres, authors] = await Promise.all([
      getGenreSelectionData(genre.map(({ _id }) => _id.toString())),
      getAuthorSelectionData(author._id.toString()),
    ]);

    res.render("forms/book.ejs", {
      ...{ isUpdating: true, errors: null },
      ...{ genres, authors },
      ...{ defaultTitle: title, defaultSummary: summary, defaultISBN: isbn },
    });
  }),
);
BookRouter.post(
  "/catalog/book/:id/update",
  ...getFormMiddlewares({ isUpdating: true }),
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { genreIds, authorId, title, summary, isbn } = req.body;
    const book = await updateBook(id, title, authorId, summary, isbn, genreIds);
    res.redirect(book.url);
  }),
);

/** Delete */
BookRouter.get(
  "/catalog/book/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, summary, isbn, genre, copies } =
      await getBookDetails(id);

    const errors = [];
    if (copies.length > 0) {
      errors.push("This author is still associated with copy(ies)");
    }

    res.render("details/book.ejs", {
      ...{ id, showDeleteButton: true, errors },
      ...{ title, author, summary, isbn, genre, copies },
    });
  }),
);
BookRouter.post(
  "/catalog/book/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { copies } = await getBookDetails(id);

    if (copies.length > 0) {
      res.redirect(req.path);
      return;
    }

    await deleteBook(id);
    res.redirect("/catalog/books");
  }),
);

/** Error handling */
BookRouter.use(async (err, req, res, next) => {
  res.redirect("/catalog/books");
});

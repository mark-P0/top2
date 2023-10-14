import { Router } from "express";
import { getBookCopies } from "../model/book-instance.mjs";
import { getBookData } from "../model/book.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

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
    res.send("Form for adding new book");
  }),
);

/** Read */
BookRouter.get(
  "/catalog/book/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) raise(`Book of id ${id} does not exist!`);

    const data = await getBookData(id);
    if (data === null) raise(`Book of id ${id} does not exist!`);
    const { title, author, summary, isbn, genre } = data;

    const copiesRaw = await getBookCopies(id);
    const copies = copiesRaw.map(
      ({ status, imprint, url, due_back_formatted }) => ({
        status,
        imprint,
        url,
        due_back_formatted,
      }),
    );

    res.render("book", { title, author, summary, isbn, genre, copies });
  }),
);

/** Update */
BookRouter.get(
  "/catalog/book/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for updating details of book with id ${id}`);
  }),
);

/** Delete */
BookRouter.get(
  "/catalog/book/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for confirming deletion of book with id ${id}`);
  }),
);

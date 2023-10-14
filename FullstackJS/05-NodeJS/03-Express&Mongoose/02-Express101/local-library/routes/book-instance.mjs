import { Router } from "express";
import { getBookCopy } from "../model/book-instance.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

export const BookInstanceRouter = Router();

BookInstanceRouter.get(
  "/catalog/book-instance",
  withNextError(async (req, res, next) => {
    res.redirect("/catalog/book-instance/create");
  }),
);

/** Create */
BookInstanceRouter.get(
  "/catalog/book-instance/create",
  withNextError(async (req, res, next) => {
    res.send("Form for adding new book instance");
  }),
);

/** Read */
BookInstanceRouter.get(
  "/catalog/book-instance/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) raise(`Book copy of id ${id} does not exist!`);

    const data = await getBookCopy(id);
    if (data === null) raise(`Book copy of id ${id} does not exist!`);
    const {
      book: { title, url },
      imprint,
      status,
      due_back_formatted,
    } = data;

    res.render("book-instance", {
      title,
      bookUrl: url,
      imprint,
      status,
      due_back_formatted,
    });
  }),
);

/** Update */
BookInstanceRouter.get(
  "/catalog/book-instance/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for updating details of book instance with id ${id}`);
  }),
);

/** Delete */
BookInstanceRouter.get(
  "/catalog/book-instance/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for confirming deletion of book instance with id ${id}`);
  }),
);

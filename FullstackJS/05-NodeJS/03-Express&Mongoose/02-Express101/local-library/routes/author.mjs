import { Router } from "express";
import { getAuthorData } from "../model/author.mjs";
import { getBooksByAuthor } from "../model/book.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

export const AuthorRouter = Router();

AuthorRouter.get(
  "/catalog/author",
  withNextError(async (req, res, next) => {
    res.redirect("/catalog/author/create");
  }),
);

/** Create */
AuthorRouter.get(
  "/catalog/author/create",
  withNextError(async (req, res, next) => {
    res.send("Form for adding new author");
  }),
);

/** Read */
AuthorRouter.get(
  "/catalog/author/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) raise(`Author with id ${id} does not exist!`);

    const data = await getAuthorData(id);
    if (data === null) raise(`Author with id ${id} does not exist!`);
    const { name, lifespan } = data;

    const booksRaw = await getBooksByAuthor(id);
    const books = booksRaw.map(({ url, title, summary }) => ({
      url,
      title,
      summary,
    }));

    res.render("author", { name, lifespan, books });
  }),
);

/** Update */
AuthorRouter.get(
  "/catalog/author/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for updating details of author with id ${id}`);
  }),
);

/** Delete */
AuthorRouter.get(
  "/catalog/author/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for confirming deletion of author with id ${id}`);
  }),
);

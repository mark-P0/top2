import { Router } from "express";
import { getBooksByGenreId } from "../model/book.mjs";
import { getGenreName } from "../model/genre.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

export const GenreRouter = Router();

GenreRouter.get(
  "/catalog/genre",
  withNextError(async (req, res, next) => {
    res.redirect("/catalog/genre/create");
  }),
);

/** Create */
GenreRouter.get(
  "/catalog/genre/create",
  withNextError(async (req, res, next) => {
    res.send("Form for adding new genre");
  }),
);

/** Read */
GenreRouter.get(
  "/catalog/genre/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) raise(`Genre of id ${id} does not exist!`);

    const genreName = await getGenreName(id);
    if (genreName === null) raise(`Genre of id ${id} does not exist!`);

    const booksRaw = await getBooksByGenreId(id);
    const books = booksRaw.map(({ url, title, summary }) => ({
      url,
      title,
      summary,
    }));

    res.render("genre", { genreName, books });
  }),
);

/** Update */
GenreRouter.get(
  "/catalog/genre/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for updating details of genre with id ${id}`);
  }),
);

/** Delete */
GenreRouter.get(
  "/catalog/genre/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;

    res.send(`Form for confirming deletion of genre with id ${id}`);
  }),
);

import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getBooksByGenreId } from "../model/book.mjs";
import {
  createGenre,
  deleteGenre,
  getGenreByName,
  getGenreName,
  updateGenre,
} from "../model/genre.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

async function getGenreDetails(/** @type {string} */ id) {
  if (!isValidId(id)) raise(`Genre of id ${id} does not exist!`);

  const genreName = await getGenreName(id);
  if (genreName === null) raise(`Genre of id ${id} does not exist!`);

  const booksRaw = await getBooksByGenreId(id);
  const books = booksRaw.map(({ url, title, summary }) => ({
    url,
    title,
    summary,
  }));

  return { genreName, books };
}

function getFormMiddlewares({ isUpdating }) {
  return [
    /* Validate and sanitize the name field. */
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Genre name must contain at least 3 characters")
      .escape(),
    withNextError(async (req, res, next) => {
      const { name } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400); // BAD REQUEST because posted data is invalid

        res.render("forms/genre.ejs", {
          ...{ isUpdating, errors: errors.array().map(({ msg }) => msg) },
          defaultName: name,
        });
        return;
      }

      const data = await getGenreByName(name);
      if (data !== null) {
        res.status(409); // CONFLICT with database because data already exists
        res.render("forms/genre.ejs", {
          ...{ isUpdating, errors: [`Genre "${name}" already exists`] },
          defaultName: "",
        });
        return;
      }

      next();
    }),
  ];
}

export const GenreRouter = Router();

GenreRouter.get(
  "/catalog/genre",
  withNextError(async (req, res, next) => {
    res.redirect("./create");
  }),
);

/** Create */
GenreRouter.get(
  "/catalog/genre/create",
  withNextError(async (req, res, next) => {
    res.render("forms/genre.ejs", {
      ...{ isUpdating: false, errors: null },
      defaultName: "",
    });
  }),
);
GenreRouter.post(
  "/catalog/genre/create",
  ...getFormMiddlewares({ isUpdating: false }),
  withNextError(async (req, res, next) => {
    const { name } = req.body;
    const genre = await createGenre(name);
    res.redirect(genre.url);
  }),
);

/** Read */
GenreRouter.get(
  "/catalog/genre/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { genreName, books } = await getGenreDetails(id);

    res.render("details/genre.ejs", {
      ...{ id, showDeleteButton: false, errors: null },
      ...{ genreName, books },
    });
  }),
);

/** Update */
GenreRouter.get(
  "/catalog/genre/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { genreName } = await getGenreDetails(id);

    res.render("forms/genre.ejs", {
      ...{ isUpdating: true, errors: null },
      defaultName: genreName,
    });
  }),
);
GenreRouter.post(
  "/catalog/genre/:id/update",
  ...getFormMiddlewares({ isUpdating: true }),
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const genre = await updateGenre(id, name);
    res.redirect(genre.url);
  }),
);

/** Delete */
GenreRouter.get(
  "/catalog/genre/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { genreName, books } = await getGenreDetails(id);

    const errors = [];
    if (books.length > 0) {
      errors.push("This genre is still associated with book(s)");
    }

    res.render("details/genre.ejs", {
      ...{ id, showDeleteButton: true, errors },
      ...{ genreName, books },
    });
  }),
);
GenreRouter.post(
  "/catalog/genre/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { books } = await getGenreDetails(id);

    if (books.length > 0) {
      res.redirect(req.path);
      return;
    }

    await deleteGenre(id);
    res.redirect("/catalog/genres");
  }),
);

/** Error handling */
GenreRouter.use(async (err, req, res, next) => {
  res.redirect("/catalog/genres");
});

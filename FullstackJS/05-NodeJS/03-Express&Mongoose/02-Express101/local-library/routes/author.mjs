import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createAuthor,
  deleteAuthor,
  getAuthorData,
  updateAuthor,
} from "../model/author.mjs";
import { getBooksByAuthor } from "../model/book.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

/** @typedef {Parameters<import('express').RequestHandler>[1]} Response */

function getISO8601Date(/** @type {Date} */ date) {
  const [year, month, day] = [
    new Intl.DateTimeFormat("en-us", { year: "numeric" }).format(date),
    new Intl.DateTimeFormat("en-us", { month: "2-digit" }).format(date),
    new Intl.DateTimeFormat("en-us", { day: "2-digit" }).format(date),
  ];
  return `${year}-${month}-${day}`;
}

async function getAuthorDetails(/** @type {string} */ id) {
  if (!isValidId(id)) raise(`Author with id ${id} does not exist!`);

  const [data, booksRaw] = await Promise.all([
    getAuthorData(id),
    getBooksByAuthor(id),
  ]);
  if (data === null) raise(`Author with id ${id} does not exist!`);

  const { name, lifespan } = data;
  const { first_name, family_name, date_of_birth, date_of_death } = data;
  const books = booksRaw.map(({ url, title, summary }) => ({
    url,
    title,
    summary,
  }));

  return {
    ...{ first_name, family_name, date_of_birth, date_of_death },
    ...{ name, lifespan, books },
  };
}

function getFormMiddlewares({ isUpdating }) {
  return [
    body("givenName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Given name must be specified")
      .isAlphanumeric()
      .withMessage("Given name can only have alphanumeric characters")
      .escape(),
    body("familyName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Family name must be specified")
      .isAlphanumeric()
      .withMessage("Family name can only have alphanumeric characters")
      .escape(),
    body("birthDate")
      .optional({ values: "falsy" })
      .isISO8601()
      .withMessage("Invalid date of birth"),
    body("deathDate")
      .optional({ values: "falsy" })
      .isISO8601()
      .withMessage("Invalid date of death"),
    withNextError(async (req, res, next) => {
      const { givenName, familyName, birthDate, deathDate } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400); // BAD REQUEST because posted data is invalid
        res.render("forms/author.ejs", {
          ...{ isUpdating, errors: errors.array().map(({ msg }) => msg) },
          defaultGivenName: givenName,
          defaultFamilyName: familyName,
          defaultBirthDate: birthDate,
          defaultDeathDate: deathDate,
        });
        return;
      }

      /* TODO Check if death date comes after birth date? */

      /* No need to check if author exists; multiple people with the same name, birthdays, etc. can exist */

      next();
    }),
  ];
}

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
    res.render("forms/author.ejs", {
      ...{ isUpdating: false, errors: null },
      defaultGivenName: "",
      defaultFamilyName: "",
      defaultBirthDate: "",
      defaultDeathDate: "",
    });
  }),
);
AuthorRouter.post(
  "/catalog/author/create",
  ...getFormMiddlewares({ isUpdating: false }),
  withNextError(async (req, res, next) => {
    const { givenName, familyName, birthDate, deathDate } = req.body;
    const birthDateObj = birthDate === "" ? undefined : new Date(birthDate);
    const deathDateObj = deathDate === "" ? undefined : new Date(deathDate);
    const author = await createAuthor(
      givenName,
      familyName,
      birthDateObj,
      deathDateObj,
    );
    res.redirect(author.url);
  }),
);

/** Read */
AuthorRouter.get(
  "/catalog/author/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { name, lifespan, books } = await getAuthorDetails(id);

    res.render("details/author.ejs", {
      ...{ id, showDeleteButton: false, errors: null },
      ...{ name, lifespan, books },
    });
  }),
);

/** Update */
AuthorRouter.get(
  "/catalog/author/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { first_name, family_name, date_of_birth, date_of_death } =
      await getAuthorDetails(id);

    res.render("forms/author.ejs", {
      ...{ isUpdating: true, errors: null },
      defaultGivenName: first_name,
      defaultFamilyName: family_name,
      defaultBirthDate: getISO8601Date(date_of_birth),
      defaultDeathDate: getISO8601Date(date_of_death),
    });
  }),
);
AuthorRouter.post(
  "/catalog/author/:id/update",
  ...getFormMiddlewares({ isUpdating: true }),
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { givenName, familyName, birthDate, deathDate } = req.body;
    const birthDateObj = birthDate === "" ? undefined : new Date(birthDate);
    const deathDateObj = deathDate === "" ? undefined : new Date(deathDate);
    const author = await updateAuthor(
      id,
      givenName,
      familyName,
      birthDateObj,
      deathDateObj,
    );
    res.redirect(author.url);
  }),
);

/** Delete */
AuthorRouter.get(
  "/catalog/author/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { name, lifespan, books } = await getAuthorDetails(id);

    const errors = [];
    if (books.length > 0) {
      errors.push("This author is still associated with book(s)");
    }

    res.render("details/author.ejs", {
      ...{ id, showDeleteButton: true, errors },
      ...{ name, lifespan, books },
    });
  }),
);
AuthorRouter.post(
  "/catalog/author/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { books } = await getAuthorDetails(id);

    if (books.length > 0) {
      res.redirect(req.path);
      return;
    }

    await deleteAuthor(id);
    res.redirect("/catalog/authors");
  }),
);

/** Error handling */
AuthorRouter.use(async (err, req, res, next) => {
  res.redirect("/catalog/authors");
});

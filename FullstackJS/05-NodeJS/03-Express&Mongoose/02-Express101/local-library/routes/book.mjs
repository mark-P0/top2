import { Router } from "express";
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

    res.send(`Details of book with id ${id}`);
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

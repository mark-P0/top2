import { Router } from "express";
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

    res.send(`Details of book instance with id ${id}`);
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

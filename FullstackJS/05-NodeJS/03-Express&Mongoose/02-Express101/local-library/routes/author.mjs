import { Router } from "express";
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

    res.send(`Details of author with id ${id}`);
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

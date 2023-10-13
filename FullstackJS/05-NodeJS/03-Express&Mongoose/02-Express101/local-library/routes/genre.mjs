import { Router } from "express";
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

    res.send(`Details of genre with id ${id}`);
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

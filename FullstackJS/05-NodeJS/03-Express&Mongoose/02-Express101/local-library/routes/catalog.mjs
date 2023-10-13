import { Router } from "express";
import { withNextError } from "./utilities.mjs";

export const CatalogRouter = Router();

CatalogRouter.get(
  "/catalog",
  withNextError(async (req, res, next) => {
    res.send("catalog home page");
  }),
);

CatalogRouter.get(
  "/catalog/books",
  withNextError(async (req, res, next) => {
    res.send("list of books");
  }),
);

CatalogRouter.get(
  "/catalog/book-instances",
  withNextError(async (req, res, next) => {
    res.send("list of book-instances");
  }),
);

CatalogRouter.get(
  "/catalog/genres",
  withNextError(async (req, res, next) => {
    res.send("list of genres");
  }),
);

CatalogRouter.get(
  "/catalog/authors",
  withNextError(async (req, res, next) => {
    res.send("list of authors");
  }),
);

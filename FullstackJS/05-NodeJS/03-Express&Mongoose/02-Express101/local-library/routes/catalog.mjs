import { Router } from "express";
import { countAuthors, getAuthorsListData } from "../model/author.mjs";
import {
  countAvailableBookCopies,
  countBookCopies,
  getBookCopiesListData,
} from "../model/book-instance.mjs";
import { countBooks, getBookListData } from "../model/book.mjs";
import { countGenres, getGenresListData } from "../model/genre.mjs";
import { withNextError } from "./utilities.mjs";

export const CatalogRouter = Router();

CatalogRouter.get(
  "/catalog",
  withNextError(async (req, res, next) => {
    const [authorCt, bookCopyTotalCt, bookCopyAvailCt, bookCt, genreCt] =
      await Promise.all([
        countAuthors(),
        countBookCopies(),
        countAvailableBookCopies(),
        countBooks(),
        countGenres(),
      ]);

    res.render("index", {
      authorCt,
      bookCopyTotalCt,
      bookCopyAvailCt,
      bookCt,
      genreCt,
    });
  }),
);

CatalogRouter.get(
  "/catalog/books",
  withNextError(async (req, res, next) => {
    const raw = await getBookListData();
    const books = raw.map(({ title, author: { name }, url }) => ({
      title,
      name,
      url,
    }));

    res.render("lists/books", { books });
  }),
);

CatalogRouter.get(
  "/catalog/book-instances",
  withNextError(async (req, res, next) => {
    const raw = await getBookCopiesListData();
    const copies = raw
      .map(({ url, book: { title }, imprint, status, due_back_formatted }) => ({
        url,
        title,
        imprint,
        status,
        due_back_formatted,
      }))
      /* TODO - Do this on database query? There doesn't seem to be a way to sort nested fields? */
      .sort(({ title: a }, { title: b }) => (a < b ? -1 : 1));

    res.render("lists/book-instances", { copies });
  }),
);

CatalogRouter.get(
  "/catalog/genres",
  withNextError(async (req, res, next) => {
    const raw = await getGenresListData();
    const genres = raw.map(({ url, name }) => ({ url, name }));

    res.render("lists/genres", { genres });
  }),
);

CatalogRouter.get(
  "/catalog/authors",
  withNextError(async (req, res, next) => {
    const raw = await getAuthorsListData();
    const authors = raw.map(({ url, name, lifespan }) => ({
      url,
      name,
      lifespan,
    }));

    res.render("lists/authors", { authors });
  }),
);

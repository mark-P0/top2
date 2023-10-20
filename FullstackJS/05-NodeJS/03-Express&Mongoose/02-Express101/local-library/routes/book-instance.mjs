import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  AvailabilityStatus,
  createBookCopy,
  deleteBookCopy,
  getBookCopy,
  updateBookCopy,
} from "../model/book-instance.mjs";
import { getBooks } from "../model/book.mjs";
import { isValidId } from "../model/utilities.mjs";
import { raise } from "../utilities.mjs";
import { withNextError } from "./utilities.mjs";

async function getBookSelectionData(
  /** @type {string | null} */ selectedBookId,
) {
  const rawBooks = await getBooks();
  const books = rawBooks.map(({ _id, title }) => ({
    id: _id.toString(),
    title,
    isSelected: _id.toString() === selectedBookId,
  }));
  return books;
}
async function getStatusSelectionData(
  /** @type {string | null} */ selectedStatus,
) {
  const statuses = Object.values(AvailabilityStatus).map((status) => ({
    status,
    isSelected: status === selectedStatus,
  }));
  return statuses;
}

async function getBookCopyDetails(/** @type {string} */ id) {
  if (!isValidId(id)) raise(`Book copy of id ${id} does not exist!`);

  const data = await getBookCopy(id);
  if (data === null) raise(`Book copy of id ${id} does not exist!`);
  const {
    book: { title, url },
    imprint,
    status,
    due_back_formatted,
  } = data;
  const bookId = data.book._id.toString();

  return { bookId, title, url, imprint, status, due_back_formatted };
}

function getFormMiddlewares({ isUpdating }) {
  return [
    body("bookId")
      .trim()
      .custom(async (bookId) => {
        /** Could probably use `.isIn()` validator but that would specify a static list of values... */
        const bookIds = (await getBookSelectionData()).map(({ id }) => id);
        !bookIds.includes(bookId) && raise(`Unknown book ID \`${bookId}\``);
        return true;
      })
      .escape(),
    body("imprint")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Imprint was not provided")
      .escape(),
    body("dueBack")
      .optional({ values: "falsy" })
      .isISO8601()
      .withMessage("Invalid return date"),
    body("status")
      .trim()
      .custom(async (status) => {
        const statuses = Object.values(AvailabilityStatus);
        !statuses.includes(status) && raise(`Unknown status \`${status}\``);
        return true;
      })
      .escape(),
    withNextError(async (req, res, next) => {
      const { bookId, status, imprint, dueBack } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const [books, statuses] = await Promise.all([
          getBookSelectionData(bookId),
          getStatusSelectionData(status),
        ]);

        res.render("forms/book-instance.ejs", {
          ...{ isUpdating, errors: errors.array().map(({ msg }) => msg) },
          ...{ books, statuses },
          ...{ defaultImprint: imprint, defaultDueBack: dueBack },
        });
        return;
      }

      next();
    }),
  ];
}

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
    const [books, statuses] = await Promise.all([
      getBookSelectionData(null),
      getStatusSelectionData(null),
    ]);

    res.render("forms/book-instance.ejs", {
      ...{ isUpdating: false, errors: null },
      ...{ books, statuses },
      ...{ defaultImprint: "", defaultDueBack: "" },
    });
  }),
);
BookInstanceRouter.post(
  "/catalog/book-instance/create",
  ...getFormMiddlewares({ isUpdating: false }),
  withNextError(async (req, res, next) => {
    const { bookId, status, imprint, dueBack } = req.body;
    const dueBackObj = dueBack === "" ? undefined : new Date(dueBack);
    const copy = await createBookCopy(bookId, dueBackObj, imprint, status);
    res.redirect(copy.url);
  }),
);

/** Read */
BookInstanceRouter.get(
  "/catalog/book-instance/:id",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { title, url, imprint, status, due_back_formatted } =
      await getBookCopyDetails(id);

    res.render("details/book-instance.ejs", {
      ...{ id, showDeleteButton: false },
      ...{ title, bookUrl: url, imprint, status, due_back_formatted },
    });
  }),
);

/** Update */
BookInstanceRouter.get(
  "/catalog/book-instance/:id/update",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const details = await getBookCopyDetails(id);
    const { title, url, imprint, status, due_back_formatted } = details;
    const { bookId } = details;

    const [books, statuses] = await Promise.all([
      getBookSelectionData(bookId),
      getStatusSelectionData(status),
    ]);

    res.render("forms/book-instance.ejs", {
      ...{ isUpdating: true, errors: null },
      ...{ books, statuses },
      ...{ defaultImprint: imprint, defaultDueBack: due_back_formatted },
    });
  }),
);
BookInstanceRouter.post(
  "/catalog/book-instance/:id/update",
  ...getFormMiddlewares({ isUpdating: true }),
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { bookId, status, imprint, dueBack } = req.body;
    const dueBackObj = dueBack === "" ? undefined : new Date(dueBack);
    const copy = await updateBookCopy(id, bookId, dueBackObj, imprint, status);
    res.redirect(copy.url);
  }),
);

/** Delete */
BookInstanceRouter.get(
  "/catalog/book-instance/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    const { title, url, imprint, status, due_back_formatted } =
      await getBookCopyDetails(id);

    res.render("details/book-instance.ejs", {
      ...{ id, showDeleteButton: true },
      ...{ title, bookUrl: url, imprint, status, due_back_formatted },
    });
  }),
);
BookInstanceRouter.post(
  "/catalog/book-instance/:id/delete",
  withNextError(async (req, res, next) => {
    const { id } = req.params;
    await deleteBookCopy(id);
    res.redirect("/catalog/book-instances");
  }),
);

/** Error handling */
BookInstanceRouter.use(async (err, req, res, next) => {
  res.redirect("/catalog/book-instances");
});

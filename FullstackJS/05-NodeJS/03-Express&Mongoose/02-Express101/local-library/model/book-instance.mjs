import { Schema, model } from "mongoose";
import "./_db-init.mjs";
import { formatDate } from "./utilities.mjs";

const { ObjectId } = Schema.Types;
export const AvailabilityStatus = {
  Available: "Available",
  Maintenance: "Maintenance",
  Loaned: "Loaned",
  Reserved: "Reserved",
};

/** @typedef {import('./book.mjs').TBook} TBook */

/**
 * @typedef {import('mongoose').InferSchemaType<typeof BookInstanceSchema>} TBookInstanceValues
 * @typedef {import('mongoose').ObtainSchemaGeneric<typeof BookInstanceSchema, "TVirtuals">} TBookInstanceVirtuals
 * @typedef {TBookInstanceValues & TBookInstanceVirtuals} TBookInstance
 */
const BookInstanceSchema = new Schema(
  {
    book: { type: ObjectId, ref: "Book", required: true },
    imprint: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(AvailabilityStatus),
      default: AvailabilityStatus.Maintenance,
    },
    due_back: { type: Date, default: Date.now },
  },
  {
    virtuals: {
      url: {
        get() {
          const { _id } = this;
          return `/catalog/book-instance/${_id}`;
        },
      },
      due_back_formatted: {
        get() {
          const { due_back } = this;
          return formatDate(due_back);
        },
      },
    },
  },
);

export const BookInstance = model("BookInstance", BookInstanceSchema);

export async function countBookCopies() {
  const query = BookInstance.countDocuments({});
  return await query.exec();
}

export async function countAvailableBookCopies() {
  const query = BookInstance.countDocuments({
    status: AvailabilityStatus.Available,
  });
  return await query.exec();
}

export async function getBookCopiesListData() {
  const qFind = BookInstance.find();
  /** @type {ReturnType<typeof qFind.populate<{ book: TBook }>>} */
  const qPopulate = qFind.populate("book");

  const res = await qPopulate.exec();
  return res;
}

export async function getBookCopies(/** @type {string} */ id) {
  const query = BookInstance.find({ book: id });
  return await query.exec();
}

export async function getBookCopy(/** @type {string} */ id) {
  const qFind = BookInstance.findById(id);
  /** @type {ReturnType<typeof qFind.populate<{ book: TBook }>>} */
  const qPopulate = qFind.populate("book");

  const res = await qPopulate.exec();
  return res ?? null;
}

export async function createBookCopy(
  /** @type {string} */ bookId,
  /** @type {Date | undefined} */ due_back,
  /** @type {string} */ imprint,
  /** @type {string} */ status,
) {
  return new BookInstance({ book: bookId, due_back, imprint, status }).save();
}

export async function deleteBookCopy(/** @type {string} */ id) {
  await BookInstance.findByIdAndRemove(id);
}

export async function updateBookCopy(
  /** @type {string} */ id,
  /** @type {string} */ bookId,
  /** @type {Date | undefined} */ due_back,
  /** @type {string} */ imprint,
  /** @type {string} */ status,
) {
  return BookInstance.findByIdAndUpdate(
    id,
    { book: bookId, due_back, imprint, status },
    {},
  );
}

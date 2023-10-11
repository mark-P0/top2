import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: "Author", required: true }, // TODO - Multiple authors possible?
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: ObjectId, ref: "Genre" }], // Multiple genres possible
  },
  {
    virtuals: {
      get url() {
        const { _id } = this;
        return `/catalog/book/${_id}`;
      },
    },
  },
);

export const Book = model("Book", BookSchema);

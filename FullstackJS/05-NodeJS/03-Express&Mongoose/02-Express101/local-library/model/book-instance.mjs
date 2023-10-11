import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const BookInstanceSchema = new Schema(
  {
    book: { type: ObjectId, ref: "Book", required: true },
    imprint: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Maintenance", "Loaned", "Reserved"],
      default: "Maintenance",
    },
    due_back: { type: Date, default: Date.now },
  },
  {
    virtuals: {
      get url() {
        const { _id } = this;
        return `/catalog/book-instance/${_id}`;
      },
    },
  },
);

export const BookInstance = model("BookInstance", BookInstanceSchema);

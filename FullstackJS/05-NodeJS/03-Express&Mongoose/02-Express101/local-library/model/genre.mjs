import { Schema, model } from "mongoose";

const GenreSchema = new Schema(
  { name: { type: String, required: true, minLength: 3, maxLength: 100 } },
  {
    virtuals: {
      get url() {
        const { _id } = this;
        return `/catalog/genre/${_id}`;
      },
    },
  },
);

export const Genre = model("Genre", GenreSchema);

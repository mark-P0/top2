import { Schema, model } from "mongoose";
import "./_db-init.mjs";

/**
 * @typedef {import('mongoose').InferSchemaType<typeof GenreSchema>} TGenreValues
 * @typedef {import('mongoose').ObtainSchemaGeneric<typeof GenreSchema, "TVirtuals">} TGenreVirtuals
 * @typedef {TGenreValues & TGenreVirtuals} TGenre
 */
const GenreSchema = new Schema(
  { name: { type: String, required: true, minLength: 3, maxLength: 100 } },
  {
    virtuals: {
      url: {
        get() {
          const { _id } = this;
          return `/catalog/genre/${_id}`;
        },
      },
    },
  },
);

export const Genre = model("Genre", GenreSchema);

export async function countGenres() {
  const query = Genre.countDocuments({});
  return await query.exec();
}

export async function getGenresListData() {
  const query = Genre.find({}).sort({ name: 1 });
  return await query.exec();
}

export async function getGenreName(/** @type {string} */ id) {
  const query = Genre.findById(id).lean();
  const res = await query.exec();
  return res?.name ?? null;
}

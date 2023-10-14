import { Schema, model } from "mongoose";
import "./_db-init.mjs";
import { formatDate } from "./utilities.mjs";

/**
 * - https://mongoosejs.com/docs/typescript/schemas.html#automatic-type-inference
 * - https://github.com/Automattic/mongoose/issues/12684
 *
 * @typedef {import('mongoose').InferSchemaType<typeof AuthorSchema>} TAuthorValues
 * @typedef {import('mongoose').ObtainSchemaGeneric<typeof AuthorSchema, "TVirtuals">} TAuthorVirtuals
 * @typedef {TAuthorValues & TAuthorVirtuals} TAuthor
 */
const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: Date,
    date_of_death: Date,
  },
  {
    virtuals: {
      name: {
        get() {
          const { first_name, family_name } = this;
          if (first_name === undefined || family_name === undefined) {
            return "";
          }

          return `${first_name} ${family_name}`;
          // return `${family_name}, ${first_name}`;
        },
      },
      lifespan: {
        get() {
          const { date_of_birth, date_of_death } = this;

          if (date_of_birth !== undefined && date_of_death !== undefined) {
            const birth = formatDate(date_of_birth);
            const death = formatDate(date_of_death);
            return `${birth} - ${death}`;
          }

          if (date_of_birth !== undefined) {
            const birth = formatDate(date_of_birth);
            return `Born ${birth}`;
          }

          if (date_of_death !== undefined) {
            const death = formatDate(date_of_death);
            return `Died ${death}`;
          }

          return "";
        },
      },
      url: {
        get() {
          const { _id } = this;
          return `/catalog/author/${_id}`;
        },
      },
    },
  },
);

export const Author = model("Author", AuthorSchema);

export async function countAuthors() {
  const query = Author.countDocuments({});
  return await query.exec();
}

export async function getAuthorsListData() {
  const query = Author.find({}).sort({ family_name: 1 });
  return await query.exec();
}

export async function getAuthorData(/** @type {string} */ id) {
  const query = Author.findById(id);
  return await query.exec();
}

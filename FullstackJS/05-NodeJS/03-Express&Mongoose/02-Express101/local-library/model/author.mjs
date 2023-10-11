import { Schema, model } from "mongoose";

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: Date,
    date_of_death: Date,
  },
  {
    /** The following "getters" might not work! */
    virtuals: {
      get name() {
        const { firstName, familyName } = this;
        if (firstName === undefined || lastName === undefined) {
          return "";
        }

        return `${familyName}, ${firstName}`;
      },
      /** Somehow process the dates... but why a string??? */
      get lifespan() {
        return "";
      },
      /** Why this path??? */
      get url() {
        const { _id } = this;
        return `/catalog/author/${_id}`;
      },
    },
  },
);

export const Author = model("Author", AuthorSchema);

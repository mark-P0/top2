import mongoose from "mongoose";

/** Alternative to `luxon` */
export function formatDate(/** @type {Date} */ date) {
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  }).format(date);
}

export function isValidId(/** @type {string} */ id) {
  return mongoose.isValidObjectId(id);
}

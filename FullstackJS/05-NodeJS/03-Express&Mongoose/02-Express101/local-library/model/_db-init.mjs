import _debug from "debug";
import "dotenv/config";
import mongoose from "mongoose";

const debug = _debug("db");

/**
 * Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
 * Included because it removes preparatory warnings for Mongoose 7.
 * See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
 */
mongoose.set("strictQuery", false);

/**
 * "Define the database URL to connect to."
 *
 * Will be gathered from `.env` file
 */
const { uri } = process.env;

/** Wait for database to connect, logging an error if there is a problem */
try {
  debug(`Connecting to ${uri}...`);
  await mongoose.connect(uri);
  debug(`Connected.`);
} catch (error) {
  debug(error);
}

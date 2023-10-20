import compression from "compression";
import cookieParser from "cookie-parser";
import _debug from "debug";
import express from "express";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import url from "url";
import { AuthorRouter } from "./routes/author.mjs";
import { BookInstanceRouter } from "./routes/book-instance.mjs";
import { BookRouter } from "./routes/book.mjs";
import { CatalogRouter } from "./routes/catalog.mjs";
import { GenreRouter } from "./routes/genre.mjs";
import { IndexRouter } from "./routes/index.mjs";
import { UsersRouter } from "./routes/users.mjs";

const debug = _debug("app");

/** https://stackoverflow.com/a/50052194 */
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const app = express();

/** Rate limiter */
app.use(
  RateLimit({
    /* Maximum of 20 requests per minute */
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  }),
);
/**
 * Add `helmet` to the middleware chain
 * Set CSP headers to allow external scripts to be served
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "cdn.tailwindcss.com"],
    },
  }),
);

/** view engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** gzip/deflate compression */
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", IndexRouter);
app.use("/users", UsersRouter);
app.use(CatalogRouter);
app.use(BookRouter);
app.use(BookInstanceRouter);
app.use(AuthorRouter);
app.use(GenreRouter);

/** catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/** error handler */
app.use((err, req, res, next) => {
  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  debug(err.message);
  debug(err);

  /* render the error page */
  res.status(err.status || 500);
  // res.render("error");
  res.render("404.ejs");
});

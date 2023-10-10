import express from "express";

export const IndexRouter = express.Router();

/** GET home page. */
IndexRouter.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

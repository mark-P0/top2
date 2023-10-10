import express from "express";

export const UsersRouter = express.Router();

/** GET users listing. */
UsersRouter.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

UsersRouter.get("/cool", (req, res, next) => {
  res.send("You're so cool 😍");
});

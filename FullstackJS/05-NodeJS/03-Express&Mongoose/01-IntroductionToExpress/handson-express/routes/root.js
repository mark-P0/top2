import { Router } from "express";

export const RootRouter = Router();

RootRouter.get("/", (req, res) => {
  res.send("Hello, world!");
});

import { Router } from "express";

export const WikiRouter = Router();

WikiRouter.get("/", (req, res) => {
  res.send("Wiki home page");
});

WikiRouter.get("/about", (req, res) => {
  res.send("About this wiki");
});

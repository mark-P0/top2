import express from "express";
import { RootRouter } from "./routes/root.js";
import { WikiRouter } from "./routes/wiki.js";

const app = express();
const port = 3000;

app.use("/", RootRouter);
app.use("/wiki", WikiRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

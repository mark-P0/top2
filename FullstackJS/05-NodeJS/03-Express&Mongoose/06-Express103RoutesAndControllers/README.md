# Express 103: Routes and Controllers

> Controller === Middleware?

> I kind of disagree with the way the tutorial separated the routes and controllers (middleware).
>
> I think it makes more sense to define the controllers inline with the route they are associated with.
>
> But may be later on I'll change my mind.

## HTTP Verbs

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

| Verb / Method   | MDN |
| :-------------- | :-: |
| `get()`         |  /  |
| `head()`        |  /  |
| `post()`        |  /  |
| `put()`         |  /  |
| `delete()`      |  /  |
| `connect()`     |  /  |
| `options()`     |  /  |
| `trace()`       |  /  |
| `patch()`       |  /  |
| `copy()`        |     |
| `lock()`        |     |
| `mkcol()`       |     |
| `move()`        |     |
| `purge()`       |     |
| `propfind()`    |     |
| `proppatch()`   |     |
| `unlock()`      |     |
| `report()`      |     |
| `mkactivity()`  |     |
| `checkout()`    |     |
| `merge()`       |     |
| `m-search()`    |     |
| `notify()`      |     |
| `subscribe()`   |     |
| `unsubscribe()` |     |
| `search()`      |     |

## Ending the request-response cycle

> Other methods here: https://expressjs.com/en/guide/routing.html#response-methods

### `res.send()`

Can send:

- Strings
  - Sent with header `Content-Type: text/html`
- Buffer
  - Sent with header `Content-Type: application/octet-stream`
  - Unless otherwise overridden
- Arrays
  - Sent with header `Content-Type: application/json`
  - i.e. as JSON
- Objects
  - Sent as JSON
  - JavaScript **Object** Notation
- Booleans
  - Sent as JSON
    > Apparently booleans by themselves are valid JSON...

### `res.render()`

- Renders a view template
- Ends up as HTML

### `res.json()`

- Sends JSON
- _"The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON."_
- Uses `JSON.stringify()`

### `res.sendFile()`

- Sends file at given path

## Routers

```js
import { Router } from "express";

export const PathRouter = Router();

PathRouter.get("/", (req, res, next) => {});
// ...and other routes
```

```js
import express from "express";
import { PathRouter } from "./path.js";

app.use("/path", PathRouter);
```

- As opposed to:

  ```js
  import express from "express";

  const app = express();

  app.get("/path", (req, res, next) => {});
  // ...and other routes
  ```

### Route paths

```js
// String path
router.get("path", (req, res, next) => {});

// String pattern path
router.get("pa?th", (req, res, next) => {});
router.get("pa+th", (req, res, next) => {});
router.get("pa*th", (req, res, next) => {});
router.get("p(at)h", (req, res, next) => {});

// Regex path
router.get(/.*path/, (req, res, next) => {});
```

- Strings
  > Should probably stick with this
  >
  > The others are kind of needlessly complicated
- ⚠ String patterns
- ⚠ Regex

#### Route parameters

```js
router.get("/path/:Id", (req, res, next) => {
  const { Id } = req.params;
});
```

- Denoted with a colon, followed by the parameter name, e.g `"/:paramName"`
- Accessed via `req.params`, e.g. `req.params.paramName`

### Error handling

#### Manual

```js
router.get("/path", async (req, res, next) => {
  try {
    const result = await something(); // e.g. MongooseModel.find({}).exec()
    res.render("view", { result });
  } catch (error) {
    return next(error);
  }
});
```

#### `express-async-handler`

```js
import asyncHandler from "express-async-handler";

router.get(
  "/path",
  asyncHandler(async (req, res, next) => {
    const result = await something(); // e.g. MongooseModel.find({}).exec()
    res.render("view", { result });
  })
);
```

#### Custom function

```js
function catcher(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  "/path",
  catcher(async (re, res, next) => {
    const result = await something(); // e.g. MongooseModel.find({}).exec()
    res.render("view", { result });
  })
);
```

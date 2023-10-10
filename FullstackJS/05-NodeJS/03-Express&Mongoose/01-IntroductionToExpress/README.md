# Introduction to Express

## Middleware

- The "middle" part between a request and response
- e.g. the _Process_ part in `Input-Process-Output`
- Finding the webpage to be served, either via static paths or building it dynamically, is already considered middleware
- Think of a pipeline
  - The start of the pipe is the request
  - The end is the response
  - Everything that happens in between is the middleware
  - The ending response may be composed in several different ways, putting together data from different sources

### Middleware functions

- Middlewares are implemented as a callback function to an Express method

## Main parts

### `const app = express()`

- `app` name can be anything, but is conventionally called `app`

### Methods

> Express seems to use "verb" and "method" interchangeably when referring to HTTP verbs

|                       | `.use()`                    | With verb                        |
| :-------------------- | :-------------------------- | :------------------------------- |
| `(middleware)`        | All routes • All verbs      | All routes • Specified verb      |
| `(route, middleware)` | Specified route • All verbs | Specified route • Specified verb |

```js
app.use(middlewareFn);
app.use("/some-route-here", middlewareFn);
```

e.g.

- If a middleware function is only given, it will be applied to ALL methods under ALL routes (depending on the method given)
- If a route is given, the middleware will be applied to ALL methods called on that route
- If a specific verb method is used, the middleware will be applied to calls
- `.use()` applies to ALL methods

#### `app.[HTTP_VERB]([route], middleware)` e.g. `app.get()`

- Maps to specific verbs

#### `app.use([route], middleware)`

- Applies to all verbs

#### ⚠ `app.all(route, middleware)`

> `app.use()` is probably more flexible

- Kind of like `app.use()`, but NEEDS a route

### Error handling

```js
app.use(/* ... */);
app.get(/* ... */);
app.post(/* ... */);
app.use(/* ... */);

/* All other middlewares, routing, etc. */

// This should be the LAST middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error has occurred");
});
```

- Implemented as the last middleware of the app
- Think of the `else` block in a long chain of if-elseif statements
- Middleware function will receive four (4) arguments

## Feature handling

> Express has very little / no opinions on the following

### Databases

- Express does not come with any database solutions
- However Express apps can interface with other databases, via drivers
  > Drivers are not Express-specific! They can be used to interface with databases in other Node apps!
- Connecting to database can be performed inside a middleware
  - Think of middlewares as React components
  - Database connections will happen as a side effect (`useEffect`)

#### Database ORM (Object Relational Mapper)

- Model database schema(?) based on a feature of the programming language
- e.g. JS objects, Python classes

### Rendering views / templates

- Layout the structure of the response webpage with placeholders
- Express has plugins for various tempalating engines that can be used within the `res.render()` method inside middlewares
- Examples
  - Handlebars
  - EJS
    > I've used this a bit before!

### File structure

- Express does not enforce any kind of structure
- It is up to the developer what kind of organization to implement
- Most common kind is MVC
  - Model: Data
  - View: UI, webpage templates
  - Controller: Routes?
    > MVC kinda differs between client-side and server-side

## `express-generator`

- CLI tool for starting an Express app
- By the developers of Express
- Uses CommonJS...
- Seems to be VERY old
  - Jade dependency, which is now renamed to Pug
  - Package manager complains about other deprecated dependencies

_Terminal output on initializing `express-generator` app:_

```
 WARN  deprecated jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
 WARN  2 deprecated subdependencies found: constantinople@3.0.2, transformers@2.1.0
Packages: +101
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 101, reused 55, downloaded 46, added 101, done

dependencies:
+ cookie-parser 1.4.6
+ debug 2.6.9 (4.3.4 is available)
+ express 4.16.4 (4.18.2 is available)
+ http-errors 1.6.3 (2.0.0 is available)
+ jade 1.11.0 deprecated
+ morgan 1.9.1 (1.10.0 is available)

Done in 8.4s
```

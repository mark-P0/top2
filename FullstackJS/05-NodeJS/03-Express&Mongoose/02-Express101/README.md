# Express 101

## Templating engines

> I'll probably use EJS. I used it in Webpack land

Some examples:

- Pug (formerly _Jade_)
  - `express-generator` defaults to this
- EJS
- Handlebars

## Middleware

- [Software / program / lines of code] that runs in the middle of a request and response
- Determines what the response will look like
- Implemented as a [callback] function
- **Middlewares run in the order that they were attached to routes or the Express app itself**

### `req`

- An object representation of the request received by the server

### `res`

- An object representation of the response to be sent
- Usually modified by the middlewares

### `next`

- Important if middleware is only one of many
- Must be called `next()` to tell Express to move on to the next middleware
  - Otherwise Express will assume that everything is over
  - Middlewares (usually the last one) must manually send the response back

## `express-generator`

### `express --ejs --git <project-name>`

- `--ejs` option sets EJS as template engine
- `--git` creates a starter `.gitignore`, e.g. for `node_modules/`

### `DEBUG=local-library:* pnpm start`

- Command to start the project
- Strictly speaking setting the env var `DEBUG=local-library:*` is not needed, only `pnpm start`
  - However this allows various debugging logs to be displayed on the console (where the program is ran)

### ~~`nodemon`~~ or `node --watch`

> `node --watch` might be a better alternative, starting from Node v18

- Still useful for restarting the server
- Doesn't seem like Express has a built-in way of watching for changes...
- Will not refresh the client browser though!

#### Browser auto-refresh

- A "workaround" would be to add scripts on the view templates that will refresh the page
  - Have to remember to remove this though!

```html
<script>
  setTimeout(() => {
    window.location.reload();
  }, 1 * 1000);
</script>
```

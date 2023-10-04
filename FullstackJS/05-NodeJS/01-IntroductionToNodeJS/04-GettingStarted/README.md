# Getting Started

## Running scripts

Assuming the following snippet in `app.js`

```js
console.log('Hello, world!');
```

### `node`

```bash
$ node app.js
Hello, world!
```

### `nodemon`

- Kind of like a live server
- Auto-"refresh" outputs on file changes
- Start a _daemon_ process on the background
- Automatically re-executes `node` on changes to script(s)

```bash
# Installation
npm -g install nodemon
```

```js
/* Change contents of `app.js` */

// console.log('Hello, world!');
console.log('Hi EARTH!!');
```

```bash
$ nodemon app.js
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Hello, world!
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
Hi EARTH!!
[nodemon] clean exit - waiting for changes before restart
```

### [Quokka.js](https://quokkajs.com/) <!-- cspell:disable-line -->

- VS Code extension
- Live playground
- Show results in-line within the code editor

## Modules, Imports, Exports

- https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x
- https://nodejs.org/api/packages.html#determining-module-system

### ES6

- i.e. the `import` syntax
- Uses `import` and `export` keywords
- Asynchronous
- `import` can only be used on topmost file lines
- Specify by either:
  - Using the `.mjs` file extension
  - Adding `"type": "module"` on the nearest `package.json`

### CommonJS

> Node by default treats files as CommonJS modules

- i.e. the `require()` syntax
- Uses `require()` call and `modules.exports` object
- Synchronous
- `require()` can be used on virtually any code line
- Specify by either:
  - Using the `.cjs` file extension
  - Adding `"type": "commonjs"` on the nearest `package.json`
    - Actually unnecessary as the `"type"` property defaults to `"commonjs"` when unspecified

### `node:MODULE` protocol

Distinguish built-in Node modules more clearly

- https://2ality.com/2021/12/node-protocol-imports.html
- https://github.com/nodejs/node/issues/38343

The following are effectively the same, though imports using the `node:` protocol are more explicit

<!-- prettier-ignore -->
```js
/* ES6 syntax */
import * as fs from      'fs/promises';
import * as fs from 'node:fs/promises';
//                   ↑↑↑↑↑

/* CJS syntax */
const fs =      require('fs/promises');
const fs = require('node:fs/promises');
//                  ↑↑↑↑↑
```

## Environment variables

- Environment variables are used to configure some of the sensitive settings of an application during development
- May include: credentials, resource handles, etc.
- Endorsed by the [Twelve-Factor App methodology](https://12factor.net/config)
- Excludes sensitive information from application source code and version control

### UNIX `env`, i.e. "in-line" variables

- Set environment variables before the command itself
- More information available on the [`env` Wikipedia page](https://en.wikipedia.org/wiki/Env)
- Uses the built-in `process` Node module
  - Specifically, the `process.env` object

```js
const { USER_ID, USER_KEY } = process.env;
console.log({ USER_ID, USER_KEY });
```

```bash
$ USER_ID=12345678 USER_KEY=foobar node app.js
{ USER_ID: '12345678', USER_KEY: 'foobar' }

# Above is shorthand; the formal syntax uses `env`:
# env USER_ID=12345678 USER_KEY=foobar node app.js
# └─────────────────┬────────────────┘ └┬─┘ └─┬──┘
#        Environment variables      Command Script
```

### `dotenv` package

```bash
# Installation
npm install dotenv
```

```bash
# .env

USER_ID='12345678'
USER_KEY='foobar'
NODE_ENV='development'
```

```js
// index.js

/* CommonJS syntax */
// const dotenv = require('dotenv');
// dotenv.config();

/* CommonJS shorthands */
// require('dotenv').config();
// require('dotenv/config');

/* ES6 formal syntax */
// import dotenv from 'dotenv';
// dotenv.config();

/* ES6 shorthand */
import 'dotenv/config';

const { USER_ID, USER_KEY, NODE_ENV } = process.env;
console.log({ USER_ID, USER_KEY, NODE_ENV });
```

```bash
$ node index.js
{ USER_ID: '12345678', USER_KEY: 'foobar', NODE_ENV: 'development' }
```

#### ~~Install and use globally~~

> **This approach is NOT recommended!** NPM packages should be installed locally, per-project.

- Install `dotenv` globally
  ```bash
  npm -g i dotenv
  ```
- Add global `node_modules` folder to search path `NODE_PATH` environment variable, e.g. using `.bashrc`
  ```bash
  export NODE_PATH=$(npm root --quiet -g)
  ```
- Import global packages via the CommonJS syntax, i.e. the `require()` approach
  ```js
  require('dotenv').config();
  const { NODE_PATH } = process.env;
  console.log({ NODE_PATH });
  ```

#### Without importing in code

Use the `-r` (require) flag

```js
// index.js

/* No import code */

const { USER_ID, USER_KEY, NODE_ENV } = process.env;
console.log({ USER_ID, USER_KEY, NODE_ENV });
```

```bash
$ node -r dotenv/config index.js
{ USER_ID: '12345678', USER_KEY: 'foobar', NODE_ENV: 'development' }
```

## Start a simple HTTP server

- Uses built-in `http` Node module
- Hosted on the host's [loopback address](https://en.wikipedia.org/wiki/Loopback)
  - `http://localhost:PORT`
  - `http://loopback:PORT`
  - `http://127.0.0.1:PORT`
  - Also accessible on the host's IP address
- Custom `PORT` can be specified
  - Port `80` is used by HTTP by default
  - If port `80` is used, `PORT` does not need to be specified on the URL
  - i.e. `http://localhost` & `http://localhost:80` are the same

```js
import http from 'http';

/*  Either use `PORT` specified as an environment variable,
 *  or default to `80`
 */
const PORT = process.env.PORT ?? 80;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, World!</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
```

Would serve the following on the loopback address:

```html
<h1>Hello, World!</h1>
```

## Make simple HTTP requests

### [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- Browser standard
- Similar API between client-side JS (frontend; in the browser) and server-side JS (backend; via Node)
- Still **experimental**, as of Node `v18.7.0`

#### `Promise`-based

##### `GET` request

```js
fetch('https://httpbin.org/get')
  .then((res) => {
    const { status: statusCode, ok } = res;
    console.log({ statusCode, ok });

    if (!ok) {
      throw new Error(`Request failed with status code: ${statusCode}`);
    }

    return res.text(); // Another `Promise`
  })
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });
```

<!-- cspell:disable -->

```bash
$ node .
(node:11352) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
{ statusCode: 200, ok: true }
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "br, gzip, deflate",
    "Accept-Language": "*",
    "Host": "httpbin.org",
    "Sec-Fetch-Mode": "cors",
    "User-Agent": "undici",
    "X-Amzn-Trace-Id": "Root=1-62fb620f-1836bd1f75cb1eb64fea13bd"
  },
  "origin": "180.191.245.44",
  "url": "https://httpbin.org/get"
}
```

<!-- cspell:enable -->

##### `POST` request

```js
fetch('https://httpbin.org/post', {
  method: 'POST',
  body: JSON.stringify({
    someData: 'Send this data to the API.',
  }),
})
  .then((res) => {
    const { status: statusCode, ok } = res;
    console.log({ statusCode, ok });

    if (!ok) {
      throw new Error(`Response returned with status code: ${statusCode}`);
    }

    return res.text(); // Another `Promise`
  })
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });
```

```bash
$ node .
(node:4964) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
{ statusCode: 200, ok: true }
{
  "args": {},
  "data": "{\"someData\":\"Send this data to the API.\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "br, gzip, deflate",
    "Accept-Language": "*",
    "Content-Length": "41",
    "Content-Type": "text/plain;charset=UTF-8",
    "Host": "httpbin.org",
    "Sec-Fetch-Mode": "cors",
    "User-Agent": "undici",
    "X-Amzn-Trace-Id": "Root=1-62fb63dc-0296833a58a27806276b9a73"
  },
  "json": {
    "someData": "Send this data to the API."
  },
  "origin": "180.191.245.44",
  "url": "https://httpbin.org/post"
}
```

##### Error

```js
fetch('https://httpbin.org/status/404')
  .then((res) => {
    const { status: statusCode, ok } = res;
    console.log({ statusCode, ok });

    if (!ok) {
      throw new Error(`Response returned with status code: ${statusCode}`);
    }

    return res.text(); // Another `Promise`
  })
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });
```

```bash
$ node .
(node:12212) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
{ statusCode: 404, ok: false }
Error: Response returned with status code: 404
    at file:///index.js:15:13
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

#### `async`-`await`

##### `GET` request

```js
const res = await fetch('https://httpbin.org/get');

try {
  const { status: statusCode, ok } = res;
  console.log({ statusCode, ok });

  if (!ok) {
    throw new Error(`Response returned with status code: ${statusCode}`);
  }

  const text = await res.text();
  console.log(text);
} catch (error) {
  console.log(error);
}
```

##### `POST` request

```js
const res = await fetch('https://httpbin.org/post', {
  method: 'POST',
  body: JSON.stringify({
    someData: 'Send this data to the API.',
  }),
});

/* ... same snippet as above ... */
```

##### Error

```js
const res = await fetch('https://httpbin.org/status/404');

try {
  /* ... same snippet as above ... */
} catch (error) {
  console.log(error);
}
```

### `axios`

- De-facto standard on Node before Fetch API support
  - Used by the [official Node.js guide](https://nodejs.dev/en/learn/)
- Uses `Promise`-based approach

### `superagent`

> I used this on my registrar project...

- Alternative to `axios`
- Lightweight

### Manually via the `https` module

- Simulate `axios` approach via the `https` module
- Very verbose
- 3rd-party packages recommended over this

## Path

### ES6

#### `import.meta.url`

> Works on both ES6 and CommonJS styles

Give path, or URL, to current script

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta
- https://nodejs.org/docs/latest/api/esm.html#importmetaurl

#### [URL objects](https://nodejs.org/api/url.html)

```js
new URL(input, base);
```

- `input` can be absolute or relative URL
  - OS filesystem paths are URLs with the [`file:///` scheme](https://en.wikipedia.org/wiki/File_URI_scheme)
  - e.g. `https://google.com`, `file:///C:/Users/Mark`
  - Subtle difference between `file://` and `file:///`
- `base` use depends on `input`
  - If `input` is absolute URL, `base` is _ignored_
  - If `input` is relative URL, `base` is **required**
- Several methods on `URL` object which segregates given URL into different parts

Reminiscent of `pathlib.Path` objects in Python <!-- cspell:disable-line -->

- https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
- https://nodejs.org/api/url.html#url_url_fileurltopath_url

```js
import { URL, fileURLToPath } from 'node:url';

/* Current script file; same as CJS `__filename` */
new URL('', import.meta.url).pathname;

/* Current script directory; same as CJS `__dirname` */
new URL('.', import.meta.url).pathname;

/* Files in the same directory as the script */
new URL('./adjacent-file.ext', import.meta.url).pathname;

/* Files in the directory above the script */
new URL('../parent-file.ext', import.meta.url).pathname;

/*  For Windows:
 *  Wrap URL object in `fileURLToPath` for proper path resolution
 */
fileURLToPath(
  new URL(PATH_NAME_STRING, import.meta.url) // URL object
);
```

### CommonJS

- https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules

#### `__filename` and `__dirname`

- Traditional way, but not available in ES6 modules
- Properties of the global `modules` object
  - Think `modules.export`
  - `modules.__filename`, `modules.__dirname`
- Available via shorthands: `__filename`, `__dirname`

<!--  -->

- https://nodejs.org/docs/latest/api/modules.html#__filename
- https://nodejs.org/docs/latest/api/modules.html#__dirname

## `fs` module

> All FS API versions perform the action fully before returning control to the program.
>
> A better alternative maybe is to use **streams**.

### `Promise`-based asynchronous API

```js
import fs from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

const filepath = fileURLToPath(new URL('./file.txt', import.meta.url));

try {
  const data = await fs.readFile(filepath, { encoding: 'utf8' });

  console.log(data);
} catch (error) {
  console.log(error);
}
```

- `fs.readFile()` returns a `Promise` which is `then`-able or can be `await`-ed inside an `async` function
- Node supports top-level `await`, eliminating the need for a wrapper `async` function

### Callback-based asynchronous API

```js
import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const filepath = fileURLToPath(new URL('./file.txt', import.meta.url));

fs.readFile(filepath, { encoding: 'utf8' }, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});
```

- `fs.readFile()` has third argument which is the callback function

### Synchronous API

Append `Sync` to regular API methods

```js
import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const filepath = fileURLToPath(new URL('./file.txt', import.meta.url));

try {
  const data = fs.readFileSync(filepath, { encoding: 'utf8' });

  console.log(data);
} catch (error) {
  console.log(error);
}
```

- `fs.readFileSync()` instead of `fs.readFile()`

## Writing to files

- Has corresponding methods per API version
- `Promise`-based API used in the following examples
- [Newline](https://en.wikipedia.org/wiki/Newline#Representation) needs to be manually added
  - `\n` for Unix, Unix-like (Linux)
  - `\r\n` for Windows
  - Platform-agnostic [method](https://nodejs.org/api/os.html#oseol):
    ```js
    import os from 'node:os';
    os.EOL; // `\n` or `\r\n`
    ```

### Writing

- Overwrites existing content

```js
import fs from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

const filepath = fileURLToPath(new URL('./file.txt', import.meta.url));
const toWrite1 = 'This is some content\n';
const toWrite2 = 'This is another content\n';

try {
  await fs.writeFile(filepath, toWrite1);
  await fs.writeFile(filepath, toWrite2);

  console.log('Success!');
} catch (error) {
  console.log(error);
}
```

```bash
$ cat file.txt
This is another content

```

### Appending

- Adds content as another line

```js
import fs from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

const filepath = fileURLToPath(new URL('./file.txt', import.meta.url));
const toWrite1 = 'This is some content\n';
const toWrite2 = 'This is another content\n';

try {
  await fs.appendFile(filepath, toWrite1);
  await fs.appendFile(filepath, toWrite2);

  console.log('Success!');
} catch (error) {
  console.log(error);
}
```

```bash
$ cat file.txt
This is some content
This is another content

```

## `npm`

### Initialization

```bash
npm init
npm init -y  # Skip all prompts
```

### Installation

- Creates `node_modules` directory, at the same level as `package.json`
- Places installed packages/modules inside this directory

#### Existing project or `package.json`

```bash
npm install
```

- Will install all dependencies listed in `package.json`
  - e.g. under `"dependencies"`, `"devDependencies"`

#### Individual packages

```bash
npm install <package>
```

```bash
npm install dotenv
npm install axios
```

- Most common way of installing / adding dependencies to projects
- Placed on `node_modules` directory on the same level as the `package.json`
- Added to `"dependencies"` list in `package.json`

##### Development dependencies

```bash
npm install --save-dev <package>
```

- Placed on `node_modules` directory on the same level as the `package.json`
- Added to `"devDependencies"` list in `package.json`

##### Global packages

> `npm` packages should be installed **locally**, unless otherwise stated.
>
> Some packages prefer `npx` approach over global installation, to ensure latest version.

```bash
npm install -g <package>
```

- Placed on `node_modules` directory on the corresponding user folder
  - Allows access from "anywhere", i.e. global
- Is not added on the local `package.json`
- List the currently installed global packages with:
  ```bash
  npm list -g --depth 0
  ```

#### Specific versions

```bash
npm install <package>@<version>
```

- Specify version with `@`
- Useful for getting certain features, compatibilities
- Package versions may introduce major feature changes or incompatibilities with other packages
- Alternatively...
  - Manually add package name and version in `package.json`
  - [ _Optional_ ] Delete `node_modules`
  - Run `npm install`

##### Versioning

https://docs.npmjs.com/about-semantic-versioning

```
package@x.y.z
```

| Section |     Stage     | Backward compatibility |
| :-----: | :-----------: | :--------------------: |
|   `z`   |   Bug fixes   |           ✅           |
|   `y`   | New features  |           ✅           |
|   `x`   | Major release |       Assume ❌        |

- Increment each section according to stage and introduced changes
- All packages releases should start with `v1.0.0`
- Some major releases may be backwards-compatible, but since they are allowed to not be, it is safer to assume that they are completely not

### Updating

```bash
npm update
```

- Update **all packages** as much as possible without breaking compatibilities

```bash
npm update <package>
```

- Update **single package** as much as possible, without breaking compatibilities

### Tasks • Scripts

```bash
npm run <task-name>
```

- Executes `<task-name>` as defined under `"scripts"` in `package.json`
- Essentially an alias to a command

Given the following in `package.json`:

```json
{
  ...

  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
  },

  ...
}
```

```bash
# Running the following:
$ npm run watch

# is essentially the same as running:
$ webpack --watch --progress --colors --config webpack.conf.js
```

## `package.json`

### Simplest form

```json
{}
```

An empty _object_ is valid JSON

The only requirement is that it respects the JSON format

- Looks like a JavaScript object, hence the name
  - _**J**ava**S**cript **O**bject_ **N**otation
- No comments
- Double-quoted keys and values

### `npm init -y`

```json
{
  "name": "directory-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- The command `npm init -y` produces the bare-bones JSON content above
- `"name"` property depends on directory (project) name
- Installed packages (via `npm install <package>`) will be added as a name-version pair under property `"dependencies"`

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.27.2",
    "dotenv": "^16.0.1"
  }
}
```

### Notable properties

#### `"dependencies"`

- Will be installed via bare `npm install`
  - i.e. installed when project is cloned
- Populated by `npm install <package>`
- Will be installed when package is installed as dependency of another application
  - These dependencies are necessary for the package to run

#### `"devDependencies"`

- Will be installed via bare `npm install`
  - i.e. installed when project is cloned
- Populated by `npm install --save-dev <package>`
- Will NOT be installed when current package is installed as NPM module on another application
  - These dependencies are NOT necessary for the package to run
  - Only for development, e.g. for testing

#### `"scripts"`

- Another key-value object pair
- Keys are NPM script/task names
- Values are the commands that each script/task runs

#### `"main"`

- Specifies the file from which exports will be searched for when the package/project is imported in another application
- Specifies the entrypoint of `node .`
  - If not present, defaults to `index.js`

With `"main"` property:

```json
/* ./package.json */

{
  "main": "./src/script.js"
}
```

```js
/* ./src/script.js */

console.log('Hello from `src`!');
```

```bash
# Terminal

$ node .
Hello from `src`!
```

Without `"main"` property:

```json
/* ./package.json */

{}
```

```js
/* ./index.js */

console.log('Hello from `index`!');
```

```bash
# Terminal

$ node .
Hello from `index`!
```

#### `"type"`

```json
{
  "type": "module" | "commonjs"
}
```

- Specifies whether to treat source JS files as ES6 modules or CommonJS modules
- Specifying `"commonjs"` is unnecessary as it is the default behavior even without the `"type"` property

#### `"name"`

- Name of the package/project/application
- Must follow rules
  - Less than 214 characters
  - No spaces
  - Lowercase characters: `abcdefghijklmnopqrsuvwxyz` <!-- cspell:disable-line -->
  - Special characters: `-` (hyphen) and `_` (underscore)
- Rules needed because this property is used to provide package with own URL when uploaded to `npm` repository
- If available on GitHub, it is recommended to have this property be the same as the GitHub repository name

#### `"version"`

- Follows semantic versioning
- Summarized above:
  - [`npm` › Installation › Specific versions › Versioning](#####versioning)

#### `"private"`

```json
{
  "private": true | false
}
```

- Boolean value
- Private packages cannot be published to `npm` repository

## Events

- Reminiscent of the `.addEventListener()` approach on DOM elements

### `events` API

```js
import EventEmitter from 'node:events';

const emitter = new EventEmitter();
```

### Add event callbacks

```js
EventEmitter.on(event, callback);
```

```js
emitter.on('some-event', () => {
  console.log('This event was triggered!');
});
```

### Trigger events

```js
EventEmitter.emit(event);
```

```js
/* Will trigger the callback added above */
emitter.emit('some-event'); // 'This event was triggered!'
```

### Event arguments

```js
emitter.on('another-event', (start, end) => {
  console.log(`started from ${start} to ${end}`);
});

emitter.emit('another-event', 1, 100); // 'started from 1 to 100'
```

## Knowledge Check

- What is a File System Module? How and why would you use it?

  - How

    ```js
    import fs from 'node:fs';

    /* Name `fs` exposes methods available on the File System built-in module */

    fs.readFile(...);
    fs.writeFile(...);
    // etc.
    ```

  - Why
    - The file system module is helpful in managing and manipulating files in the operating system
    - Where browser JS can more-or-less only access the contents of the website files (HTML, CSS)...
    - ...server JS (via Node) can access local files, e.g. on the [hard] drive, network
    - This is the module that facilitates that feature
    - It may be used to access template files from which full-fledged website files can be generated

- What is the command for installing a package locally in with `npm`?

  ```bash
  npm install <package>
  ```

- What is the command for installing a package globally in with `npm`?

  ```bash
  npm install -g <package>
  ```

- What is the difference between a global and local package install with `npm`?

  - Local package installs can only be accessed within the directory of the project on which it was installed
  - Global package installs can be accessed by any projects
    - Depends on the package itself
    - Some packages are not meant to be installed globally
    - `npx` is sometimes favored over global NPM installs

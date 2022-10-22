# ES6 Modules

> I have already used Node, `npm`, and even `yarn` multiple times.
>
> I haven't consciously used Webpack before, but I have experience with `create-react-app` that apparently uses it underneath.
>
> I have a lot of experience with ES6 modules. It is my preferred syntax on both front- and back-end code over monolithic scripts and the CommonJS `require` syntax. It is extremely reminiscent of import statements from other languages that I know (e.g. Python).

## Knowledge Check

- Explain what `npm` is and where it was commonly used before being adopted on the frontend.

  - `npm` is a package management tool that manages the version of different libraries, frameworks, and tools used for building web applications
  - It is a tool for the NodeJS runtime, which was commonly used on backend development only. NodeJS runs on servers with access to the file system, whereas frontend browser JS do not.

- Describe what `npm init` does and what `package.json` is.

  - The command shows a series of prompts (questionnaire) used to build a `package.json` file
  - This file provides a brief description of the web application project:
    - Name
    - Author
    - Project description
    - Dependencies (libraries, frameworks, tools that it uses)
    - Scripts for interacting with the project

- Know how to install packages using `npm`.

  - `npm install <package-name>`
    - Normal installation
    - Indicates that the package is directly required by the project
    - It may be a library that is used on runtime
  - `npm install <package-name> --save-dev`
    - Development installation
    - Indicates that the package is only indirectly required by the project
    - It may be a tool used for linting, formatting, building, or testing the project (not on runtime)

- Describe what a JavaScript module bundler like `webpack` is.

  - Module bundlers perceive code modules from one [or more] entry points, and builds a single monolithic script based on their relationships
  - Module bundling was important as modules used to be an exclusively server-side concept; front-end JS did not have this due to its lack of file system access
    - Although modules are natively supported now by vanilla browser JS, bundling still provides a myriad of benefits, such as elimination of unused code/modules, minification of files for faster load times, and transpilation to older widely supported language specifications while writing next-gen syntax
  - https://www.youtube.com/watch?v=5IG4UmULyoA

- Explain what the concepts “entry” and “output” mean as relates to webpack.

  - `entry` specifies the starting point from which the mapping out of the module relationships will start
  - `output` specifies the final file path to which the module relationships will be consolidated

- Briefly explain what a development dependency is.

  - ...

- Explain what “transpiling code” means and how it relates to frontend development.

  - "Transpilation" is the process of transforming code from one language to another which has more or less the same specifications, syntax, or features
    - This is often contrasted with "compilation", which also transforms code between languages, though the similarities between the languages are little to non-existent
    - Transpilation can be thought of as "horizontal transformation" whereas compilation is "vertical transformation", with respect to their level of abstraction from machine code (think _high-level languages_)
    - Transpilation being horizontal means that the level of abstraction is more or less the same. The transpiled entities remain as far away from the "metal" as the inputs
    - Compilation being vertical means that the level of abstraction changes, often lower, down to the "metal". E.g. C source code is compiled into machine code which can be directly understood by the CPU.
  - For front-end development, a transpilation step is required as developers often use next-gen syntax and features when writing code for improved developer experience. However, support for these do not necessarily come in a timely manner in web browsers, which is the target platform of web development. Thus, next-gen code is transpiled into an older specification that can run on a supported manner on these browsers
    - Note that, despite sounding very similar, it is not a compilation step, as the browser and code sits on more or less the same level of abstraction from the CPU machine code.
    - Transpilation also occurs for code written on a dialect of JavaScript such as TypeScript which provides more features for developers but is effectively unknown to browsers

- Briefly describe what a task runner is and how it’s used in frontend development.

  - A task runner is a set of [automated] scripts and tool utilization that runs on the background in support of front-end development.
  - Crucial for developer experience as the fast preview of code changes provides immediate feedback as to whether they are sufficient or not
  - One of the build-step tools (e.g. module bundler, transpiler) is likely to provide a task runner out of the box, which are one command away from the command line, or can be outlined as an `npm` script within the `package.json` file

- Describe how to write an `npm` automation script.

  - In `package.json`, initialize the top-level `scripts` to an "object" or mapping
  - Inside this are key-value pairs, where the keys correspond to the name of the script, and value the equivalent command
  - These can be run in the command-line via `npm run <script-name>`

  ```json
  {
    "scripts": {
      "dev": "command for developing",
      "build": "command for building"
    }
  }
  ```

  ```bash
  npm run dev
  # or...
  npm run build
  ```

- Explain one of the main benefits of writing code in modules.

  - Modules improve code maintainability. Further upholding the single-responsibility principle, modules can isolate related lines of code for a single app component. Features for that component can be added on a single place, and debugging for errors may be performed reasonably.

- Explain “named exports” and “default exports”.

  - "Named exports" are declarations that are exported as-is. They have identifiers which can be used by the modules that import them. They can be renamed on export or on import. What's important is that they have an identifier and that they do not conflict with other named exports. There can be multiple of such from a module.
  - "Default exports" are declarations that can be thought of as the "main" export of the module. These do not need to have identifiers; anonymous expressions (e.g. functions, classes, values) can be exported as default directly. The "named exports" have a side or supporting role to the "default export". A module may only have one of this.

# Linting

> I already use Prettier a lot!
>
> ESLint I kinda forgot about...

## Setup

### ESLint + Prettier

```sh
npm init -y
npm i -D prettier
npm init @eslint/config -- --config prettier
```

### Recommended rules

> `eslint-config-recommended` seems to be a different thing entirely...

Add to `.eslintrc.js` (or similar):

```js
export default {
  extends: [
    'eslint:recommended',
    ...
  ]
  ...
}
```

### From scratch

> Might cause some problems with Prettier(?)

```sh
npm init -y
npm init @eslint/config
# Then follow the prompts
```

## [StandardJS](https://standardjs.com/)?

- Alternative to ESLint+Prettier?
- Might be worth looking at...
- Doesn't seem to format HTML and Markdown files though(?)

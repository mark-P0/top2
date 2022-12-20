# What is ES6?

> i.e. ES6 compatibility

## Webpack + Babel

```sh
npm init -y
npm i -D webpack babel-loader @babel/core @babel/preset-env
```

Then, in `webpack.config.js`

```js
export default {
  // ...,
  module: {
    rules: [
      // ...,
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      // ...,
    ],
  },
  // ...,
};
```

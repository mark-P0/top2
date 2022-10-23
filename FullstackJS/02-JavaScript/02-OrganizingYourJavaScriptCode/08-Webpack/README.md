# Webpack

## Knowledge Check

- How do you load CSS using webpack?

  - Install `css-loader` and `style-loader` via `npm`
    - `style-loader` may be substituted with the `mini-css-extract` plugin
    - `style-loader` adds `<style>` elements to the HTML head on runtime via JS
    - `mini-css-extract` combines loaded styles into a single CSS file
  - Configure Webpack to use these tools
  - Import the CSS file like a JS file, e.g. `import './styles.css'`
  - Add element attributes and style definitions accordingly, e.g. for class and IDs

- How do you load images using webpack?

  - Import the image file with an identifier, e.g. `import image from './image.jpg`
  - No additional loader is required
  - The imported name, e.g. `image`, contains the resulting path of the image file on build
  - This can be assigned as the `src` attribute of `<img>` elements

- How do you load fonts using webpack?

  - Import the font file into a corresponding stylesheet
    - Define a wrapper font face for it
  - This stylesheet must be imported into the JS as outlined in the steps above for CSS
  - Webpack will detect this and map the `url()` statements for font file sources accordingly to their resulting build paths

- How do you load data using webpack?

  - Install an appropriate loader, e.g. `csv-loader ` for CSV files, `xml-loader` for XML files
  - Configure Webpack to use these tools
  - Import the data file with an identifier, e.g. `import data from './data.csv'`
    - The shape of the data may be dependent on the loader used
    - `xml-loader` loads XML files as an object with appropriate keys
    - `csv-loader` loads CSV files as a 2-dimensional array (tabular)

- How would you track errors in bundled source code?

  ```js
  module.exports = {
    /* ... */

    devtool: 'inline-source-map',

    /* ... */
  };
  ```

  - Add a `devtool` entry in Webpack's configuration
  - This maps bundled lines of code to their original source files, and show up like they directly came from these on the console
  - The ideal setting may be different
    - https://webpack.js.org/configuration/devtool/#development
    - `eval-cheap-source-map` provides fast rebuild times, line numbers, but no column numbers

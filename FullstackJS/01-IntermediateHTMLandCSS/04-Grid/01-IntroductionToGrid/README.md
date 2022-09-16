# Introduction to Grid

|             |  Flexbox  |  Grid  |
| :---------: | :-------: | :----: |
|   Purpose   | Alignment | Layout |
| Dimensions  |     1     |   2    |
|    Work     |   Child   | Parent |
| Overlapping |  Harder   | Easier |

- Grid is like, a better implementation of table layouts from old CSS
  - `<table>` was used for layout according to those who were around that time

## Knowledge Check

- How can you use Flex to make a two-dimensional layout?

  - `flex-wrap: wrap;`, and...
  - A careful configuration of either `width: ...` or `flex-basis: ...`
  - Each item should have a width of `(100% - (gap-size * (col-ct - 1))) / col-ct`
  - Controlling the row count is more involved

- Why was CSS Grid introduced?

  - To mirror the "standard" structural layout of tangible documents such as magazines and newspapers

- Which CSS layout module would you use to easily make equal sized items in a container?

  - Uhh... `grid`...?
  - But tbh at this point I'd use `flex`...
  - Since I don't know `grid` yet...

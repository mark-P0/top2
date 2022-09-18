# Using Flexbox and Grid

> These are not mutually exclusive, and can (should) be used together accordingly!

|            |    Flexbox    |     Grid     |
| :--------: | :-----------: | :----------: |
|   Design   | Content-first | Layout-first |
| Dimensions |      1-D      |     2-D      |
| Structure  |   Flexible    |    Rigid     |

- Think _arrays_
  - If content is a sequence (row **OR** column; 1-dimensional; single _line_), **flexbox** is most suitable
    - But grid can also work
  - If content is tabular (row **AND** column; 2-dimensional; multiple lines), **grid** is most suitable
    - But flexbox can also work

## Knowledge Check

- When might you use Flexbox over Grid?

  - Content-first design
  - When content is not constrained beforehand and thus layout must potentially "flex" to accommodate it
  - When design is very simplistic and grid templating is too much work

- When might you use Grid over Flexbox?

  - Layout-first design
  - When all dimensions of the content has been considered and constrained
  - When following a given design

- When might you use the two of these tools together?

  - Laying out the contents (cells) of a grid-based design
  - Creating a tabular content within a flex item

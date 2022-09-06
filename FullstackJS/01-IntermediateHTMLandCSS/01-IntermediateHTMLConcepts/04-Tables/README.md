# Tables

<!-- prettier-ignore -->
```html
<table>
  <tr>  <th>Name</th>     <th>Rank</th> <th>Gender</th> <th>Year</th>  </tr>
  <tr>  <td>Jacob</td>    <td>1</td>    <td>boy</td>    <td>2010</td>  </tr>
  <tr>  <td>Isabella</td> <td>1</td>    <td>girl</td>   <td>2010</td>  </tr>
  <tr>  <td>Ethan</td>    <td>2</td>    <td>boy</td>    <td>2010</td>  </tr>
  <tr>  <td>Sophia</td>   <td>2</td>    <td>girl</td>   <td>2010</td>  </tr>
  <tr>  <td>Michael</td>  <td>3</td>    <td>boy</td>    <td>2010</td>  </tr>
</table>
```

![](https://web.stanford.edu/class/cs101/table.png)

## Use Cases

- Tabular data
- ~~Webpage layout~~
  - **DO NOT DO THIS**
  - Used to be the case, before mature display and layout methods
  - Use block, flex, or grid layouts
  - Grid layout very reminiscent of tables
  - Arguments against:
    - Reduces accessibility, e.g. screen readers
    - Produces tag soup (invalid HTML)
    - Not automatically responsive. Needs various checks for layout and screen sizes

## HTML

- An HTML table is enclosed in a `<table>` element
- It is composed of several table row `<tr>` elements
  - Header rows
  - Data rows
- Cells, or columns, in each row are represented by `<th>` or `<td>`
  - `<th>` Table header
    - Usually for first row, but really can be used within any `<tr>`
  - `<td>` Table data
    - Can also be used for the first row
- Every row must have the same number of cells/columns
  - Ideal structure
  - Can be different for every row, but table would look wrong
  - Data will be shifted accordingly

<!-- prettier-ignore -->
```html
<table>
  <caption></caption>

  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>

  <thead>
    <tr>    <th></th> <th></th> <th></th>    </tr>
  </thead>
  <tbody>
    <tr>    <td></td> <td></td> <td></td>    </tr>
    <tr>    <td></td> <td></td> <td></td>    </tr>
    <tr>    <td></td> <td></td> <td></td>    </tr>
  </tbody>
  <tfoot>
    <tr>    <td></td> <td></td> <td></td>    </tr>
  </tfoot>
</table>
```

### `<table>`

- Enclose all information for the table inside a `<table>` element
- Just like HTML `<html>`

### `<tr>`

- Table rows
- Everything inside a table element must be inside a `<tr>`

### `<th>` | `<td>`

- Standard data and header cells

#### `rowspan` | `colspan` attributes

- For allowing cells to occupy multiple locations
- Set to numeric value

### `<colgroup>` | `<col>`

- Accessory element
- Often included at the start of the `<table>` element
  - After `<caption>`
- Used for representing table columns
- Helpful for simple CSS selection

### `<caption>`

- Accessory element
- Appears at the top of the table
  - Regardless of its location within the `<table>` element
  - Often included at the start of the `<table>` element
  - Before `<colgroup>`
- Kind of like a _table title_

### `<thead>` | `<tbody>` | `<tfoot>`

- Semantic table grouping
- Provides more structure to HTML table
- `<tbody>` implicitly created
  - If omitted, `<tr>` elements will be contained within an implied `<tbody>`
  - Tables require only `<table>`, `<tr>`, `<th>`, `<td>`
- Does not necessarily improve accessibility, nor any visual enhancement
- Useful for CSS targeting and grouping

&nbsp;

- `<thead>` needs to be placed after `<colgroup>` (if present)
- `<tfoot>` often placed at the end of the `<table>`, but can also be after `<thead>`
- `<tbody>` can be after both `<thead>` and `<tfoot>`, or in between them

## CSS

### `border`

### `border-collapse`

## Nested Tables

- Possible
- Not recommended

<!-- prettier-ignore -->
```html
<table id="table1">
  <tr> <th>title1</th> <th>title2</th> <th>title3</th> </tr>

  <tr>
    <td id="nested">
      <table id="table2">
        <tr> <td>cell1</td> <td>cell2</td> <td>cell3</td> </tr>
      </table>
    </td>
    <td>cell2</td>
    <td>cell3</td>
  </tr>

  <tr> <td>cell4</td> <td>cell5</td> <td>cell6</td> </tr>
</table>
```

## Accessible Tables

The following techniques make HTML table structures more accessible for visually impaired users

### Using column and row headers

i.e. the `<th>` element

### The `scope` attribute

- Attribute of the `<th>` element
- Tells the axis the `<th>` element is a header for
- Answers the question(s)...
  - Is it a column header?
  - Is it a row header?

The possible values are:

#### `col`

Designate as a column header

#### `row`

Designate as a row header

#### `colgroup`

Designate as a column header that spans multiple columns

#### `rowgroup`

Designate as a row header that spans multiple rows

### The `id` and `headers` attributes

- On all `<th>`: Add unique `id`
- On all `<td>`: Set `headers` attribute
  - Value is space-separated string
  - Each word in the string is the ID of the header element it is part of

```html
<table>
  <tr>
    <th id="purchase">Purchase</th>
    <th id="location">Location</th>
    <th id="date">Date</th>
    <th id="evaluation">Evaluation</th>
    <th id="cost">Cost (€)</th>
  </tr>

  <tr>
    <th id="haircut">Haircut</th>
    <td headers="location haircut">Hairdresser</td>
    <td headers="date haircut">12/09</td>
    <td headers="evaluation haircut">Great idea</td>
    <td headers="cost haircut">30</td>
  </tr>
  ...
</table>
```

- Very precise
- Fairly verbose
- Easy to make mistakes on

## Knowledge Check

- What is a table?

  - A table is a visual structured way of summarizing and presenting data

- Why is it a bad idea to use HTML Tables for page layout?

  - Reduces accessibility for impaired individuals
  - Better layout techniques exist, e.g. flex, grid
  - Implementing responsive design is complex

- What are `caption` elements useful for?

  - Adding a title to the table
  - Succinctly describing the table contents

- What is the `scope` attribute?

  - Designates the `<th>` element to which it belongs as the header for the rows or columns that it covers
  - Mostly useful for accessibility purposes
  - Specifies if the `<th>` element is a row, column, row-group, or column-group header

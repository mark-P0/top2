# Introduction to MongoDB

> _Note:_ **SQL is covered in the Rails path**
>
> NoSQL (MongoDB) is covered in the Node path as it is very closely related to JS/JSON.
>
> Might want to do the [Rails] SQL section later... Lots of people pushes for SQL over NoSQL.
>
> Grabbed from the Rails path: https://sqlzoo.net/wiki/SQL_Tutorial
>
> Mental note:
>
> |       |       Scale        | Robust? |
> | :---: | :----------------: | :-----: |
> |  SQL  | Large (Enterprise) |   ✅    |
> | NoSQL |  Small (Web apps)  |   🔁    |

## MongoDB

- NoSQL
- Document-based
- Database
- JS-centric database!
  - Very JS-esque <!-- cspell:disable-line -->

> I will think of MongoDB as a _JavaScript database_ even if that is not really too accurate.

### Concepts

|  MongoDB   |   SQL    |
| :--------: | :------: |
|  Document  |   Row    |
| Collection |  Table   |
|  Database  | Database |

![](https://beginnersbook.com/wp-content/uploads/2017/09/RDBMS_MongoDB_Mapping.jpg)
![](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/joindbref_e74ea63926.png)

<!-- ![]() -->

#### Document

- JSON-like (BSON)
  - Binary JSON
- Set of key-value pairs
  - Keys are referred to as _fields_
- Follows proper JSON syntax
- Analogous to SQL/relational **rows**
- Think JS object

<!-- prettier-ignore -->
```js
const Document = {
  "string": "value",
  "number": 123,
  "another_document": {
    "subfield1": "value",
    "subfield2": 456,
  },
  "document_array": [
    {"more_fields": "some value", "another_field": 789},
    {"more_fields": "another value", "another_field": 0},
  ],
}
```

#### Collection

- Set of documents
- Analogous to SQL/relational **tables**
- Think array of objects

<!-- prettier-ignore -->
```js
const Collection = [
  { "name": "Document 1", "field": "Some value", "another": 123 },
  { "name": "Document 2", "field": "Sum value", "another": 456 },
  { "name": "Document 3", "field": "Some val", "another": 789 },
]
```

#### Database

- Set of collections
- Analogous to SQL/relational **databases**
  - i.e. same
- Think JS object whose keys are the collection names, and values are the collections

<!-- prettier-ignore -->
```js
const db = {
  collection_name: [
    { "name": "doc1", "field": "value" },
    { "name": "doc2", "field": "value" },
    { "name": "doc3", "field": "value" },
  ],
  another_collection: [
    { "name": "doc1", "field": "value" },
    { "name": "doc2", "field": "value" },
    { "name": "doc3", "field": "value" },
  ],
  more_collection: [
    { "name": "doc1", "field": "value" },
    { "name": "doc2", "field": "value" },
    { "name": "doc3", "field": "value" },
  ],
}
```

### MongoDB Cloud

- Atlas
- Realms
- Chart

### MongoDB Atlas

#### Clusters

- Atlas deploys clusters
- Group of servers that store data

#### Replica sets

- Clusters are configured as replica sets
- Set of machines that store the same data
  - i.e. a replica (replicate, copy)
  - Clusters = Server replicas of the same data
- Replicas provide redundancy
  - Allows data to be accessible even if one replica in the cluster goes down
- Another term for "group of servers"?

#### Instances

- A machine that runs the MongoDB database
- A server?
- A replica in the replica set / cluster?

### JSON vs BSON

|            |  JSON | BSON   |
| :--------: | ----: | :----- |
|   Format   |  Text | Binary |
| Readable?  |   Yes | No     |
|  Parsing   |  Slow | Fast   |
|    Size    | Large | Small  |
| Data types |  Less | More   |
|  MongoDB   |  View | Store  |

> Vast oversimplification, but BSON can essentially be considered as JSON.

### SRV Connection String

- URI used to connect to MongoDB cluster
  - Uniform Resource Identifier

<!-- cspell:disable -->

```
mongodb+srv://[user:password@][clusterURI].mongodb.net/[database]
```

_Fields:_

- `[user:password@]`
  > **NOTE:** Provides password as plaintext, which is a security-risk
  - Convenient authentication
  - Removes the need to provide authentication arguments, e.g. `--username`
  - `user`: Registered database user
  - `password`: User password
  - Think emails, e.g. `username@domain.com`
- `[clusterURI]`
  - Cluster identifier
  - Accessible on Atlas dashboard
- `[database]`
  - Specify the [default] database name to be accessed

<!-- cspell:enable -->

### Desktop Installations

> These are separately installed.

#### MongoDB Compass

- Desktop UI
- Very similar to web Atlas
- Has embedded shell CLI (`mongosh`)

#### MongoDB Shell

- i.e. CLI
- `mongosh` <!-- cspell:disable-line -->
  - Upgrade over traditional `mongo` tool
- Used to remotely connect to cluster

#### MongoDB Tools

- Used for importing and exporting (see below)

### Importing & Exporting

<!-- cspell:disable -->

|        |     JSON      |      BSON      |
| :----: | :-----------: | :------------: |
| Import | `mongoimport` | `mongorestore` |
| Export | `mongoexport` |  `mongodump`   |

<!-- cspell:enable -->

- Uses SRV connection strings
- Needs **MongoDB Database Tools**

### Connecting

<!-- cspell:disable -->

```bash
mongo "<srv-uri>"
mongosh "<srv-uri>"
```

- Uses the MongoDB **shell**
  - Newer `mongosh` more directly reflects this
- `srv-uri` must be **quoted**
- `srv-uri` specifies the database to which the shell will connect

> The MongoDB shell is ~~very reminiscent of~~ actually a functional **JavaScript interpreter** or **Node REPL** (Invoked with `node` command)

<!-- cspell:enable -->

### Administrative Commands

#### `show dbs`

<!-- cspell:disable -->

```bash
Atlas atlas-f0ge3y-shard-0 [primary] admin> show dbs
sample_airbnb       54.7 MB
sample_analytics    9.61 MB
sample_geospatial   1.42 MB
sample_guides         41 kB
sample_mflix        52.4 MB
sample_restaurants  6.91 MB
sample_supplies     1.17 MB
sample_training     55.1 MB
sample_weatherdata  2.88 MB
admin                340 kB
local                559 MB
```

<!-- cspell:enable -->

- Shows all the databases in the cluster
- Regardless of which database have been selected

> Databases `local` and `admin` are special databases, and, for the most part, should not be accessed/manipulated.

#### `use <database>`

<!-- cspell:disable -->

```bash
Atlas atlas-f0ge3y-shard-0 [primary] admin> use sample_training
switched to db sample_training

Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db
sample_training

Atlas atlas-f0ge3y-shard-0 [primary] sample_training> typeof db
object
```

<!-- cspell:enable -->

- Switches context to the specified `database`
- The shell `db` object then references the selected database

#### `show collections`

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> show collections
companies
grades
inspections
posts
routes
trips
zips
```

- Shows all collections in the selected database
- Collections are a group of documents
- Collections correspond to SQL tables

### Querying

General syntax is:

```bash
db.[collection].[method]
```

Where:

- `[collection]` is the collection name
- `[method]` is the querying command/method

> Think JS dot notation for accessing and invoking properties and methods

#### Flow

```js
// Get a sample document
db.collection.findOne();
// Get the fields to get an idea of the schema
Object.keys(db.collection.findOne()).sort();

/* Then do one of the following: */

db.collection.findOne().field; // Access a field value
db.collection.distinct(field); // Get field's unique values
// ...etc.

/* Then build the search query */
db.collection.find(/* ... */);
```

- `.findOne()` to get an idea of the collection schema
- `.distinct()` to determine unique values
- `.find()` to filter the collection

> Or just visually inspect on Compass / Atlas

#### Special concepts/commands/terms

##### Cursor

- A pointer to the result of a query
- Reminiscent of SQL cursors
- Methods/Queries such as `.find()`, `.findOne()` actually returns a **cursor**, which the shell just renders into actual JSON-like results

##### Pointer

- A memory address location
- i.e. the dreaded "pointer" in programming/software

##### `it` command

- Iterates through a cursor result
- Useful after a `.find()`

#### `.find()`

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.find()
[
  {
    _id: ObjectId("5c8eccc1caa187d17ca6ed16"),
    city: 'ALPINE',
    zip: '35014',
    loc: { y: 33.331165, x: 86.208934 },
    pop: 3062,
    state: 'AL'
  },
...
```

- Argument-less invocation shows the **first 20 documents** in the collection

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.find({ "state": "NY" })
[
  {
    _id: ObjectId("5c8eccc1caa187d17ca72f89"),
    city: 'FISHERS ISLAND',
    zip: '06390',
    loc: { y: 41.263934, x: 72.017834 },
    pop: 329,
    state: 'NY'
  },
...
```

```bash
db.collection.find(filter, fields)
```

- `filter` argument specifies what documents are to be selected
  - Must be valid JSON, i.e. quoted key-value pairs
- Produces documents that satisfies the given filter query
  - i.e. has the same values
- `fields` argument specifies what document **fields** are to be selected
  - i.e. **_projection_**
  - Kind of running `.map()`
  - Keeps only select fields on the result
  - Key-value pair whose values are either `1` (keep) or `0` (hide)
  - `_id` field is returned by default, but can be hidden
  - **Keeping and hiding settings cannot be mixed!**
    - _Except_ for `_id`

```bash
db.collection.find(
  {"field": "value"},
  {"field": 1, "anotherField": 1},
)
```

- Find documents whose `"field"` field corresponds to `"value"`
- On those documents, only return the `"field"` and `"anotherField"`

```bash
db.collection.find(
  {"anotherField": 12345},
  {"doNotShowThis": 0},
)
```

- Find documents whose `"anotherField"` field corresponds to `12345`
- On those documents, return all fields except `"doNotShowThis"`

#### `.find().count()` • `.find().size()`

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.find({ "state": "NY" }).count()
1596
```

- Provides the number of documents in the query result
- Useful before actual `.find()` call to not flood the terminal with the results
- `.count()` is apparently deprecated
- `.size()` performs largely same but [ignores `.limit()` and `.skip()`](https://stackoverflow.com/questions/11881347/difference-between-cursor-count-and-cursor-size-in-mongodb)
  - i.e. returns the true size of the cursor / query

#### `.find().pretty()`

- Prettifies the "JSON" output

> For some reason, the outputs on my MongoDB installation are prettified by default...

#### `.findOne()`

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.findOne()
{
  _id: ObjectId("5c8eccc1caa187d17ca6ed16"),
  city: 'ALPINE',
  zip: '35014',
  loc: { y: 33.331165, x: 86.208934 },
  pop: 3062,
  state: 'AL'
}
```

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.findOne({ "state": "NY" })
{
  _id: ObjectId("5c8eccc1caa187d17ca72f89"),
  city: 'FISHERS ISLAND',
  zip: '06390',
  loc: { y: 41.263934, x: 72.017834 },
  pop: 329,
  state: 'NY'
}
```

- Essentially `.find()` but only returns the first item pointed to by the result cursor
- True whether the query method is called with or without an argument
  - _Without argument_: Returns the first document in the collection
  - _With argument_: Returns the first document in the **filtered** collection

#### `.distinct()`

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.distinct('state')
[
  'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT',
  'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID',
  'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
  'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC',
  'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
  'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI',
  'WV', 'WY'
]
```

- Shows all the unique values of a given field in the collection
- Useful in knowing which values to filter for

```bash
Atlas atlas-f0ge3y-shard-0 [primary] sample_training> db.zips.distinct('zip', {'state': 'NY'})
[
  '06390', '10001', '10002', '10003', '10004', '10005', '10006',
  '10007', '10009', '10010', '10011', '10012', '10013', '10014',
  '10016', '10017', '10018', '10019', '10020', '10021', '10022',
  '10023', '10024', '10025', '10026', '10027', '10028', '10029',
  '10030', '10031', '10032', '10033', '10034', '10035', '10036',
  '10037', '10038', '10039', '10040', '10044', '10128', '10280',
  '10301', '10302', '10303', '10304', '10305', '10306', '10307',
  '10308', '10309', '10310', '10312', '10314', '10451', '10452',
  '10453', '10454', '10455', '10456', '10457', '10458', '10459',
  '10460', '10461', '10462', '10463', '10464', '10465', '10466',
  '10467', '10468', '10469', '10470', '10471', '10472', '10473',
  '10474', '10475', '10501', '10502', '10504', '10506', '10507',
  '10509', '10510', '10511', '10512', '10514', '10516', '10518',
  '10520', '10522', '10523', '10524', '10527', '10528', '10530',
  '10532', '10533',
  ... 1496 more items
]
```

- Can also take a second argument which is a filter query to further limit the scope

### `_id` field

- Unique identifier for documents
- Required for every MongoDB documents
- Defaults to an `ObjectId()` value
  - Can be overridden
- No two or more documents can have the same `_id`!
- Automatically added on new document inserts if not present
  - Different from an `id` field (if present)
  - Uses the aforementioned `ObjectId()`

### Insertion

#### `.insert()`

```bash
# One document (object)
db.collection.insert({...})

# Multiple documents (object array)
db.collection.insert([{...}, {...}, {...}])
```

- Method can be used to insert one or more documents at once

```bash
db.collection.insert([{...}, {...}, {...}], {"ordered": false})
```

- By default, the insertion will stop when a document produces an error, e.g. duplicate `_id`
- The remaining documents will not be processed
- Specifying `{"ordered": false}` will override this behavior
- Instead, the erring document will be _skipped_, and the remaining documents will continue to be considered and inserted accordingly

```bash
# Insertion on non-existent collection
db.nonExistentCollection.insert({...})

# Insertion on non-existent database
use nonExistentDB
db.nonExistentCollection.insert({...})
```

- If a collection is non-existent, it will be created upon successful document insertion
- If the `db` is non-existent as well, it will also be created
  - Non-existent databases can be accessed with `use <database>` but is not yet necessarily created

### MQL (MongoDB Query Language)

> Rather absurd term for a NoSQL database. LOL

- Prefixed with `$` sign, e.g. `$inc`

#### Syntaxes

|     Type |          MQL           |     Aggregation      |
| -------: | :--------------------: | :------------------: |
|      Key |         Field          |       Operator       |
|    Value |     Object (colon)     |    Array (comma)     |
|   Syntax |  `{field: {op: val}}`  | `{op: [field, val]}` |
|  Example |  `{prop: {$lt: 64}}`   | `{$lt: [prop, 64]}`  |
|       JS | "Literal" / "Operator" |      "Function"      |
|   JS-ish |      `prop < 64 `      | `lessThan(prop, 64)` |
| `$expr`? |           No           |         Yes          |

##### MQL syntax

```js
{
  <field>: {
    <operator>: <value>
  }
}
```

```js
// e.g.
{ "field": {"$lt": 64} }

// JS-ish parallel; "literal"/"operator" syntax
field < 64
```

##### Aggregation syntax

```js
{
  <operator>: [
    <field>, <value>
  ]
}
```

```js
// e.g.
{ "$lt": ["$field", 64] }

// JS-ish parallel; "function" syntax
lessThan(field, 64)
```

### Updating

```bash
# General syntax; either updateOne() or updateMany()
db.collection.update____(filter, updateConfig)
```

- `filter` is the same as what would be used in a `.find()` query
- `updateConfig()` is an object of various _update operators_
  - Each operator maps to another object of key-value pairs
  - These pairs are used in a specific manner by each operator
- If fields are non-existent, they are **implicitly created**

| Operator | Keys                | Values              |
| :------- | :------------------ | :------------------ |
| `$inc`   | Fields to increment | Amount to add       |
| `$set`   | Fields to set       | New field values    |
| `$unset` | Fields to delete    | `""` (_irrelevant_) |

#### `.updateOne()`

- Updates the FIRST document that matches `filter`

#### `.updateMany()`

- Updates ALL documents that matches `filter`

### Deletion

> Exercise extreme caution when deleting.
>
> When they're deleted, they're gone **for good**!

```bash
# General syntax; either deleteOne() or deleteMany()
db.collection.delete____(filter)
```

- Deletes documents that match `filter`
- Essentially the same as `.find()`, but instead of returning, documents are deleted

#### `.deleteOne()`

- Deletes the FIRST document that matches `filter`

#### `.deleteMany()`

- Deletes ALL documents that matches `filter`

### CRUD Summary

_Per document:_

| Operation | One              | Many                    |
| :-------- | :--------------- | :---------------------- |
| Create    | `.insert({...})` | `.insert([{...}, ...])` |
| Read      | `.findOne()`     | `.find()`               |
| Update    | `.updateOne()`   | `.updateMany()`         |
| Delete    | `.deleteOne()`   | `.deleteMany()`         |

- Operations on _one_ document are most useful when querying for document `_id`
  - This ensures that, indeed, only one document satisfies the filter
  - Otherwise, the operation would only be applied on the first of many results, which may lead to unexpected behavior

_On larger concepts:_

| Operation | Collection               | Database              |
| :-------- | :----------------------- | :-------------------- |
| Create    | ¹On Document creation    | ²On Document creation |
| Read      | `show collections`       | `show dbs`            |
| Update³   | ...                      | ...                   |
| Delete    | `db.<collection>.drop()` | `db.dropDatabase()`   |

¹ Non-existent collections can be "accessed" by `db.<collection>`, but not necessarily created

² Non-existent databases can be "accessed" by `use <database>`, but not necessarily created

³ Various ways of modifying collections and databases

### JavaScript features, e.g. arithmetic

Because the shell commands are essentially JS code, various JS features are available as well

For instance, the following will add the counts:

```bash
db.col.find(filter1).count() + db.col.find(filter2).count()
```

### Comparison

| Operator |         Meaning          | JavaScript |
| :------: | :----------------------: | :--------: |
|  `$eq`   |         Equal to         | `==` `===` |
|  `$ne`   |       Not Equal to       | `!=` `!==` |
|  `$gt`   |       Greater Than       |    `>`     |
|  `$lt`   |        Less Than         |    `<`     |
|  `$gte`  | Greater Than or Equal to |    `>=`    |
|  `$lte`  |  Less Than or Equal to   |    `<=`    |

- Substitute value for an object using these operators, e.g.

<!-- prettier-ignore -->
```js
db.collection.find({"field": "value"})
db.collection.find({"field": {"$eq": "value"}})
```

- `$eq` is actually implied in this case

<!-- cspell:disable -->

<!-- prettier-ignore -->
```js
/* Bike rental customers that took around a minute and are not subscribers to the service */
db.trips.find(
  {
    "tripduration": { "$lte": 70, },
    "usertype": { "$ne": 'Subscriber', },
  }, {
    "_id": 0,
    "tripduration": 1,  "usertype": 1, "birth year": 1,
    // "bikeid": 0,
  }
)

/* Documents whose recorded population is less than 1000 */
db.zips.find(
  { "pop": { "$lt": 1000, }, }
).count()

/* Difference between those born in 1998 and those born after 1998 */
Math.abs(
  db.trips.find({ "birth year":         1998  }).count() -
  db.trips.find({ "birth year": {"$gt": 1998} }).count()
)
```

<!-- cspell:enable -->

### Logic

| Operator | Meaning       |    JavaScript     |
| :------: | :------------ | :---------------: |
|  `$and`  | AND           |       `&&`        |
|  `$or`   | OR            |      `\|\|`       |
|  `$not`  | NOT (inverse) |        `!`        |
|  `$nor`  | NOT OR        | `!(... \|\| ...)` |

General syntax is:

<!-- prettier-ignore -->
```js
// The following operators operate on 2 or more statements
{
  ["$and" | "$or" | "$nor"]: [...statements]
}

// NOT only operates on a single statement
{
  "$not": statement
}
```

- `$and` is implied

```js
// This...
{
  "field1": "value1",
  "field2": "value2",
}
// is the same as this:
{
  "$and": [
    {"field1": "value1"},
    {"field2": "value2"},
  ]
}

// This can also produce "chained comparisons"
// Instead of this...
{
  /* field > 123 && field < 456 */
  "field": { "$gt": 123 },
  "field": { "$lt": 456 },
}
// the following can be used:
{
  /* 123 < field < 456 */
  "field": { "$gt": 123, "$lt": 456 },
}

```

### Expressive

```bash
{
  "$expr": [{expressions}]
}
```

- Used in **aggregations**
- Allows for variables and conditional statements
- Used to enable use of "variables" or specifying "field names"

#### `$` • `$<field>`

- Allows specification of **fields**
- Normally denotes _operators_

```js
use sample_training

db.trips.find(
  {
    $expr: {$eq: [ "$start station name", "$end station name", ]}
  }, {
    "_id": 0,
    "start station name": 1,
    "end station name": 1,
  }
).size()
```

### Array

#### Querying

| Operator     | Value  |
| :----------- | :----- |
| `$size`      | Number |
| `$all`       | Array  |
| `$elemMatch` | Object |

- Used in `.find()` calls

##### For array of "primitives"

```js
db.collection.find({ field: { $size: 64 }, });
db.collection.find({ field: { $all: [..., ..., ...] }, });
db.collection.find({ field: { $size: 64, $all: [..., ..., ...] }, });
```

```js
// Will find documents whose `field` is equal to `item`,
// or arrays that contain `item`
db.collection.find({ field: item });

// Will find documents whose `field` is EXACTLY equal to `[item]`;
// i.e. a one-item array
db.collection.find({ field: [item] });
```

##### For array of "objects"

<!-- prettier-ignore -->
```js
// Expression, e.g. using query operator
db.collection.find({
  arrayField: { $elemMatch: {
    objectItem: {$lte: 64},
  }}
})

// Direct value
db.collection.find({
  arrayField: { $elemMatch: {
    objectItem: 'some value',
  }}
})

// Shorthand; dot notation
db.collection.find({
  'arrayField.objectItem': 'some value'
})
```

- Can also be used in projections

#### Updating

| Operator | Keys          | Values         | If non-existent |
| :------- | :------------ | :------------- | :-------------- |
| `$push`  | _Array_ field | New array item | Initialize      |

- Used in `.update()` calls

### Aggregation

```js
db.collection.aggregate([...])
```

- Everything above can be done via the aggregation framework
  - They are via MQL

|    MQL | Aggregation |
| -----: | :---------- |
| Filter | Group       |
| Update | Compute     |
|        | Reshape     |

<!-- prettier-ignore -->
```js
// MQL
db.listings.find(
  { amenities: 'Wifi', },
  { _id: 0, price: 1, address: 1, },
);

// Aggregate
db.listings.aggregate([
  { $match: {amenities: 'Wifi'}},
  { $project: {
    _id: 0, price: 1, address: 1,
  }},
])
```

- First argument is an array of objects
- Each object is a "single mapping" of an aggregation operator
- Array implies "order"
- Each operation (object) is a step in a pipeline sequence
  - i.e. aggregation pipeline

### `$group`

- Categorize data
- Reshaping

### Sort & Limit

> Limiting is very useful, but sorting is expensive!
>
> Avoid sorting as much as possible in non-trivial code.

```js
// Sort `.find()` result by `field` value
//  `1` means ascending
// `-1` means descending
db.collection.find(...).sort(
  {field: 1 | -1}
)

// Limit `.find()` result by `count` amount
// i.e. show only the first `count` results
db.collection.find(...).limit(
  count
)

// [Often] Used in conjunction
db.collection.find(...).sort(...).limit(...)
```

- Cursor methods

#### Enforced order

```js
/* Enforced */
db.collection.find(...).sort(...).limit(...)

/* Converted to above */
// db.collection.find(...).limit(...).sort(...)
```

- When both are used in a cursor, it is assumed that `.sort()` comes first before `.limit()`, regardless of their actual order
- Otherwise, it would only sort the few results produced by `.limit()`, which is often unwanted

### Indexes

```js
//  1 : Ascending-order index
// -1 : Descending-order index

db.collection.createIndex({ field: 1 | -1 }); // Single-field index
db.collection.createIndex({
  // Compound index
  field: 1 | -1,
  anotherField: 1 | -1,
});
```

- Build an index to support queries
- Akin to book index (at the back of the book)
- Faster way of querying/searching/reading data
- When to build index?
  - When a query on a field is often run

### Data Modeling

> _Rule:_ Data is stored in the way that it is used.

- Store data as how it is used
- Store data as how it is queried
  - Who/What is making the queries?
  - Expose the most important data for them
- Data **used** together must be **stored** together
- Application-first approach
  - Database "schema" is based on the app
  - Database will conform to what is convenient for the app
  - Not the other way around

### Upsert (Update • Insert) <!-- cspell:disable-line -->

> Only use when necessary

<!-- cspell:disable -->

```js
// Third argument option in update methods
db.collection.updateOne({ query }, { data }, { upsert: true });
db.collection.updateMany({ query }, { data }, { upsert: true });
```

<!-- cspell:enable -->

- Hybrid between update and insert
  - If queried data exists, _update_ it
  - Else, _insert_ it
  - By default, update will fail instead
- Only use when necessary

---

## Proof of Completion

### `M001` MongoDB Basics

[![Proof of Completion, M001: MongoDB Basics](https://university.mongodb.com/course_completion/c218671e-c74e-4d82-95ad-d0ec9445fbf4/printable?format=img)](https://university.mongodb.com/course_completion/c218671e-c74e-4d82-95ad-d0ec9445fbf4/printable)

---

## Knowledge Check

What is the difference between a relational database and a non-relational database?

- Relational database

  - i.e. SQL databases

- Non-relational database

  - i.e. NoSQL databases
  - Database that does not use SQL for querying
  - Uses "unconventional" database methods, e.g.
    - Document stores
    - Key-value pairs
    - Graphs

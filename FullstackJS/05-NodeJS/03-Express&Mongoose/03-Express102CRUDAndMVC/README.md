# Express 102: CRUD and MVC

## CRUD

Basic database operations

| Function    | Database |   HTTP   |
| :---------- | :------: | :------: |
| Add data    |  Create  |  `POST`  |
| Get data    |   Read   |  `GET`   |
| Edit data   |  Update  |  `PUT`   |
| Remove data |  Delete  | `DELETE` |

## MVC

### Model

- Data
- Structure of data

### View

- UI
- How data is presented
- How data manipulation is presented

### Controller

- Decide what view to display
- Decide what information to be displayed in a view
- Middleman between Model and View
  - Model and View must not directly interact as much as possible

## Database choice

- MongoDB
  - MERN stack
- Firestore? From Firebase

## Mongoose

An ORM (ODM?) for MongoDB

- Kind of a wrapper over bare / raw querying

### URI • Connecting to MongoDB database

```
mongodb+srv://[user:password@][clusterURI].mongodb.net/[database]

mongodb://[clusterURI]/[database]
```

```js
import mongoose from "mongoose";

const uri = "mongodb+srv://[user:password@][clusterURI].mongodb.net/[database]";
await mongoose.connect(uri);
```

- Get URI from database interface
- Maybe via MongoDB Atlas?
  - Via the "Connect" modal
  - Username/Password is of the database admin(?)

### Schemas

```js
import { Schema } from "mongoose";

const SampleSchema = new Schema(/* Fields here */);
```

#### Types

```js
import { Schema } from "mongoose";

const { Mixed, ObjectId } = Schema.Types;

const SampleSchema = new Schema({
  name: String,
  binary: Buffer,
  isStatus: Boolean,
  lastUpdate: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Mixed,
  _someId: ObjectId,
  array: [],
  arrayOfStrings: [String], // Array of other types also possible
  nested: {
    something: { type: String, lowercase: true, trim: true },
  },
});
```

- Built-in JS "types" can be used
  - Classes for primitives like `String`, `Number`, `Boolean`
  - Classes for standard objects like `Date`
- Mongoose offers special types via `Schema.Types`, e.g.
  - `Mixed` for mixed-type values
  - `ObjectId` for a unique ID
- Some JS types are also available via `Schema.Types`
- `default` value should be a function that produces the default value

##### Validation

| Type         | `required` | `min` | `max` | `enum` | `match` | `maxLength` | `minLength` |
| :----------- | :--------: | :---: | :---: | :----: | :-----: | :---------: | :---------: |
| `String`     |     /      |       |       |   /    |    /    |      /      |      /      |
| `Number`     |     /      |   /   |   /   |        |         |             |             |
| `Date`       |     /      |       |       |        |         |             |             |
| `Buffer`     |     /      |       |       |        |         |             |             |
| `Boolean`    |     /      |       |       |        |         |             |             |
| `Mixed`      |     /      |       |       |        |         |             |             |
| `ObjectId`   |     /      |       |       |        |         |             |             |
| `Array`      |     /      |       |       |        |         |             |             |
| `Decimal128` |     /      |       |       |        |         |             |             |
| `Map`        |     /      |       |       |        |         |             |             |
| `Schema`     |     /      |       |       |        |         |             |             |
| `UUID`       |     /      |       |       |        |         |             |             |
| `BigInt`     |     /      |       |       |        |         |             |             |

- All schema types have the `required` validator
  - All fields are by default optional (not required)
- Numbers have the `min` and `max` validators
- Strings have the `enum` `match` `maxLength` and `minLength`

Specify a validation value and error message as an array

```js
const Breakfast = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no eggs?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea", "Water"],
  },
});
```

#### Virtual properties

- Accessible fields that are not actually present in the database
- Useful for setting an alias to fields that are commonly composed together, that may be processed further
  - e.g. a `fullName` from `firstName` and `lastName`

```js
const Person = new Schema(
  {
    name: {
      first: String,
      last: String,
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + " " + this.name.last;
        },
      },
    },
  }
);
```

##### Methods

Helper methods (instance, static) and query helpers can also be added to schemas, like virtual properties

### Models

Actual models compiled from a schema

```js
import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema(/* Field definitions here */);
const Data = mongoose.model("Data", DataSchema);

const some_data = new Data(/* Field values */); // Now a document!

/* Perform other things on document / model instance, e.g. */
some_data.field = newValue; // Just like regular JS objects

await some_data.save(); // Commit changes to database
```

- Create schema
  - Define fields
- Create model from schema
  - Models correspond to a Collection
  - Model name correspond to a lowercase plural Collection name
    - e.g. `"Data"` model corresponds to `datas` collection
- Create documents from model
  - `.save()` to commit to database

Another way of instantiating models (creating documents)

```js
await Data.create(/* Field values */);

// Add many
await Data.insertMany([
  {
    /* Field values */
  },
  {
    /* Field values */
  },
]);
```

#### Querying (Read)

```js
const Data = mongoose.model("Data", DataSchema);

const query = Data.find({ field: value }, "field1 field2");
const results = await query.exec();
```

- Build queries using methods on the corresponding model
- Perform query by using `.exec()` method
  - Async and should be awaited

Sample pipeline:

```js
const query = Data.find(/* Desired field-value pairs */) // Filter collection
  .select("field1 field2") // Only show specific fields
  .limit(5) // Only show some documents
  .sort({ field1: -1 }); // Sort documents by a field value

await query.exec(); // Actually perform query
```

#### Evaluating relationships

> Foreign keys?

Uses `ObjectId` type and referencing another model

- Models:

  ```js
  const authorSchema = Schema({
    name: String,
    // stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
  });

  const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: String,
  });

  const Story = mongoose.model("Story", storySchema);
  const Author = mongoose.model("Author", authorSchema);
  ```

- Usage:

  ```js
  const bob = new Author({ name: "Bob Smith" });
  await bob.save();

  // Bob now exists, so lets create a story
  const story = new Story({
    title: "Bob goes sledding",
    author: bob._id, // assign the _id from our author Bob. This ID is created by default!
  });
  await story.save();
  ```

- Get data nested with actual data of reference
  ```js
  Story.findOne({ title: "Bob goes sledding" })
    .populate("author") // Replace the author id with actual author information in results
    .exec();
  ```

> It is best to track relationships between models/documents in one of those models only, e.g.
>
> In the example above, stories are explicitly associated with an author,
> but authors do not have an array of stories associated with them.
>
> This information can simply be derived from the story model, given an author's ID, e.g.
>
> ```js
> Story.find({ author: bob._id }).exec();
> ```

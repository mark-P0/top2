import 'dotenv/config';
import { MongoClient } from 'mongodb';

const { URI } = process.env; // `.env` file
const Client = new MongoClient(URI);

// console.clear();

function helpers(title, database, collection) {
  const Title = title;
  const Database = Client.db(database);
  const Collection = Database.collection(collection);

  return [Title, Database, Collection];
}

const Quizzes = {
  async QueryOperators_Comparison() {
    return; // DELETEME

    // const Title = 'Query Operators - Comparison';
    // const Database = Client.db('sample_training');
    // const Collection = Database.collection('trips');
    // const Cursor = Collection.find({
    //   tripduration: { $lte: 70 },
    //   usertype: { $ne: 'Subscriber' },
    // });

    const [Title, Database, Collection] = helpers(
      'Query Operators - Comparison',
      'sample_training',
      'trips'
    );

    const results = [
      /*  1.  Find all documents where the trip was less than or equal to 70 seconds
       *      and the usertype was not "Subscriber"
       */
      await Collection.find(
        {
          tripduration: { $lte: 70 },
          usertype: { $ne: 'Subscriber' },
        },
        {
          projection: {
            _id: 0,
            tripduration: 1,
            usertype: 1,
          },
        }
      ).toArray(),

      /*  2.  Find all documents where the trip was less than or equal to 70 seconds
       *      and the usertype was "Customer" using a redundant equality operator.
       */
      await Collection.find(
        {
          tripduration: { $lte: 70 },
          usertype: { $eq: 'Customer' },
        },
        {
          projection: {
            _id: 0,
            tripduration: 1,
            usertype: 1,
          },
        }
      ).toArray(),

      /*  3.  Find all documents where the trip was less than or equal to 70 seconds
       *      and the usertype was "Customer" using the implicit equality operator.
       */
      await Collection.find(
        {
          tripduration: { $lte: 70 },
          usertype: 'Customer',
        },
        {
          projection: {
            _id: 0,
            tripduration: 1,
            usertype: 1,
          },
        }
      ).toArray(),
    ];

    // console.table(results);

    for (const [idx, result] of results.entries()) {
      console.log(`${Title} #${idx + 1}`);
      console.table(result);
      console.log();
    }
  },

  async QueryOperators_Logic() {
    return; // DELETEME

    /*  Find all documents where airplanes CR2 or A81 left or landed in the KZN
     */

    const [Title, Database, Collection] = helpers(
      'Query Operators - Logic',
      'sample_training',
      'routes'
    );

    const result = await Collection.find(
      {
        $and: [
          { $or: [{ airplane: 'CR2' }, { airplane: 'A81' }] },
          { $or: [{ src_airport: 'KZN' }, { dst_airport: 'KZN' }] },
        ],
      },
      {
        projection: {
          _id: 0,
          airplane: 1,
          src_airport: 1,
          dst_airport: 1,
        },
      }
    ).toArray();

    console.log(Title);
    console.table(result);
  },

  async ExpressiveQueryOperator() {
    return; // DELETEME

    const [Title, Database, Collection] = helpers(
      'Expressive Query Operator',
      'sample_training',
      'trips'
    );

    const results = [
      /*  1. Find all documents where the trip started and ended at the same station.
       */
      await Collection.find(
        {
          $expr: {
            $eq: ['$start station name', '$end station name'],
          },
        },
        {
          projection: {
            _id: 0,
            bikeid: 1,
            'start station name': 1,
            'end station name': 1,
          },
        }
      )
        .limit(10)
        .toArray(),

      /*  2.  Find all documents where the trip lasted longer than 1200 seconds, and
              started and ended at the same station.
       */
      await Collection.find(
        {
          tripduration: { $gt: 1200 },
          $expr: {
            $eq: ['$start station name', '$end station name'],
          },
        },
        {
          projection: {
            _id: 0,
            // bikeid: 1,
            tripduration: 1,
            'start station name': 1,
            'end station name': 1,
          },
        }
      )
        .limit(10)
        .toArray(),
    ];

    for (const [idx, result] of results.entries()) {
      console.log(`${Title} #${idx + 1}`);
      console.table(result);
      console.log();
    }
  },

  async ArrayOperators() {
    return; // TODO: Not working!

    const [Title, Database, Collection] = helpers(
      'Array Operators',
      'sample_airbnb',
      'listingsAndReviews'
    );

    const results = [
      /*  1.  Find all documents that contain more than one amenity without caring
       *      about the order of array elements.
       */
      await Collection.find({
        amenity: { $size: { $gt: 0 } },
      }).toArray(),

      /*  2. Only return documents that list exactly 20 amenities in this field and
       *     contain the amenities of your choosing.
       */
      await Collection.find({
        amenity: {
          $all: [
            /*  */
          ],
        },
      }).toArray(),
    ];

    // for (const [idx, result] of results.entries()) {
    //   console.log(`${Title} #${idx + 1}`);
    //   console.table(result);
    //   console.log();
    // }
  },

  async ArrayOperatorsProjection() {
    return; // DELETEME

    const [Title, Database, Collection] = helpers(
      'Array Operators',
      'sample_airbnb',
      'listingsAndReviews'
    );

    /* prettier-ignore */
    const results = [
      /*  1.  Find all documents in the sample_airbnb database with exactly 20
       *      amenities which include all the amenities listed in the query array,
       *      and display their price and address.
       */
      (
        await Collection.find(
          {
            amenities: {
              $size: 20,
              // $all: []
            },
          },
          { projection: {
            _id: 0,
            price: 1,
            address: 1,
          }}
        )
        .limit(3)
        .toArray()
      ),

      /*  2.  Find all documents in the sample_airbnb database that have Wifi as one of
       *      the amenities only include price and address in the resulting cursor.
       */
      (
        await Collection.find(
          {
            amenities: "Wifi",
          },
          { projection: {
            _id: 0,
            price: 1,
            address: 1,
          }}
        )
        .limit(3)
        .toArray()
      ),

      /*  3.  Find all documents in the sample_airbnb database that have Wifi as one of
       *      the amenities only include price and address in the resulting cursor,
       *      also exclude "maximum_nights".
       *      Was this operation successful? Why?
       *
       *      Not possible as it mixes inclusion and exclusion; only `_id` exclusion can be mixed
       */
    ];

    // db.listingsAndReviews.findOne();
    // Object.keys(db.listingsAndReviews.findOne()).sort();

    for (const [idx, result] of results.entries()) {
      console.log(`${Title} #${idx + 1}`);
      // console.table(result);
      console.log(result);
      console.log();
    }
  },

  async ArrayOperatorsProjection2() {
    return; // DELETEME

    const [Title, Database, Collection] = helpers(
      'Array Operators',
      'sample_training',
      'grades'
    );

    /* prettier-ignore */
    const results = [
      /*  4.  Find all documents in the grades collection where the student in class
       *      431 received a grade higher than 85 for any type of assignment.
       */
      (
        await Collection.find(
          {
            class_id: 431,
            'scores.score': {$gt : 85}
          },
          // { projection: {
          //   _id: 0,
          //   student_id: 1,
          //   'scores.$':  1,
          // }}
        )
        // .count()
        .limit(3)
        .toArray()
      ),

      /*  5.  Find all documents in the grades collection where the student had an
       *      extra credit score.
       */
      (
        await Collection.find(
          {
            'scores.type': 'extra credit'
          },
          // { projection: {
          //   _id: 0,
          //   student_id: 1,
          //   'scores.$':  1,
          // }}
        )
        // .count()
        .limit(3)
        .toArray()
      ),

    ];

    // db.grades.findOne();
    // Object.keys(db.grades.findOne()).sort();
    // db.grades.distinct('scores.type')

    for (const [idx, result] of results.entries()) {
      console.log(`${Title} #${idx + 1}`);
      // console.table(result);
      console.log(result);
      console.log();
    }
  },

  async ArrayOperatorsSubDocuments() {
    return; // DELETEME

    const [Title, Database, Collection] = helpers(
      'Array Operators',
      'sample_training',
      'companies'
    );

    /* prettier-ignore */
    const results = [
      /*  1.  Find any document from the companies collection where the last name
       *      Zuckerberg in the first element of the relationships array.
       */
      await Collection.find(
        {
          'relationships.0.person.last_name': 'Zuckerberg'
        },
        {projection: {
          _id: 0,
          name: 1,
          homepage_url: 1,
        }},
      ).toArray(),

      /*  2.  Find how many documents from the companies collection have CEOs who's
       *      first name is Mark and who are listed as the first relationship in this
       *      array for their company entry.
       */
      await (
        Collection.find(
          {
            'relationships.0.person.first_name': 'Mark',
            'relationships.0.title': 'CEO',
          },
          {projection: {
            _id: 0,
            name: 1,
            homepage_url: 1,
            // 'relationships.1': 1,
          }},
        )
        // .count()
        .limit(3)
        .toArray()
      ),

      /*  3.  Find all documents in the companies collection where people named Mark
       *      used to be in the senior company leadership array, a.k.a the
       *      relationships array, but are no longer with the company.
       */
      await (
        Collection.find(
          {
            'relationships.person.first_name': 'Mark',
            'relationships.title': { $regex: /senior/i },
            'relationships.is_past': true,
          },
          {projection: {
            _id: 0,
            name: 1,
            homepage_url: 1,
            'relationships.$': 1,
          }},
        )
        // .count()
        .limit(3)
        .toArray()
      ),
    ]

    for (const [idx, result] of results.entries()) {
      console.log(`${Title} #${idx + 1}`);
      // console.table(result);
      console.log(result);
      console.log();
    }
  },

  // async _() {},
};

for (const quiz in Quizzes) Quizzes[quiz]();

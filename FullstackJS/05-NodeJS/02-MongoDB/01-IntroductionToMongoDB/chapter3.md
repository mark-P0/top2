Practice Question:

People often confuse NEW YORK City as the capital of New York state, when in reality the capital of New York state is ALBANY.

In the sample_training.zips collection add a boolean field "capital?" to all documents pertaining to ALBANY NY, and NEW YORK, NY. The value of the field should be true for all ALBANY documents and false for all NEW YORK documents.

```js
use sample_training

db.zips.find({ "state": "NY", "city": "ALBANY", }).size()
db.zips.find({ "state": "NY",  }).size()

/* Update all NY documents to false first */
db.zips.updateMany(
  { "state": "NY",  },
  { "$set": {
    "capital?": false
  }}
)
db.zips.updateMany( { "state": "NY",  }, { "$set": { "capital?": false }} )

/* Then update all NY-ALBANY documents to true */
db.zips.updateMany(
  { "state": "NY", "city": "ALBANY", },
  { "$set": {
    "capital?": true
  }}
)
db.zips.updateMany( { "state": "NY", "city": "ALBANY", }, { "$set": { "capital?": true }} )
```

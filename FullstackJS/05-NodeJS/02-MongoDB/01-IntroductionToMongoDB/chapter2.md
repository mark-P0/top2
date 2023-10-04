find() command

1. Query the zips collection from the sample_training database to find all documents where the state is NY.

```bash
db.zips.find({ "state":  "NY" })
```

2. Iterate through the query results.

```bash
it
```

3. Find out how many ZIP codes there are in NY state.

```bash
db.zips.distinct('zip', { "state": "NY" })
```

4. What about the ZIP codes that are in NY but also in the city of ALBANY?

```bash
db.zips.distinct('zip', { "state": "NY", "city": "ALBANY" })
```

5. Make the cursor look more readable.

```bash
db.zips.find().pretty()
```

---

Data Explorer Quiz:

In the sample_training.trips collection a person with birth year 1961 took a
trip that started at "Howard St & Centre St". What was the end station name for
that trip?

```bash
> db.trips.find({ 'birth year': 1961, 'start station name': 'Howard St & Centre St', })
```

```bash
> db.trips.findOne({ 'birth year': 1961, 'start station name': 'Howard St & Centre St', })['end station name']
South End Ave & Liberty St
```

Find All the Documents Exercise:

Using the sample_training.inspections collection find out how many inspections
were conducted on Feb 20 2015.

```bash
> db.inspections.find({ 'date': 'Feb 20 2015', }).count()
320
```

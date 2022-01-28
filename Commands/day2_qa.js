// Lecture Commands:

// aggregation
// Ex: Find all the documents on persons collection using aggregation method
db.persons.aggregate([]);

// $match:

// Ex: Find all active female persons who have green eye color and work on USA.
db.persons.aggregate([
  { $match: { gender: "female" } },
  {
    $match: {
      $and: [{ eyeColor: "green" }, { "company.location.country": "USA" }],
    },
  },
]);

// Ex: Find all active male persons that have ages between 25 and 30
db.persons.aggregate([
  { $match: { gender: "male" } },
  { $match: { isActive: true } },
  { $match: { $and: [{ age: { $gt: 25 } }, { age: { $lt: 30 } }] } },
]);

// $sort

// Ex: Find all active persons who their favorite fruit is apple sorted by their ages desc.
db.persons.aggregate([
  { $match: { isActive: true, favoriteFruit: "apple" } },
  { $sort: { age: -1 } },
]);

// $count

// Ex: Count all the people who work on Italy
db.persons.aggregate([
  { $match: { "company.location.country": "Italy" } },
  { $count: "person_count" },
]);

// $project

// Ex: Find all active male persons' names ONLY
db.persons.aggregate([
  { $match: { gender: "male", isActive: true } },
  { $project: { _id: 0, name: 1 } },
]);

// $limit

// Ex: Find the oldest three male persons.
db.persons.aggregate([
  { $match: { gender: "male" } },
  { $sort: { age: -1 } },
  { $limit: 3 },
]);

// $ group

// Ex: Group all persons by the country they are working on.
db.persons.aggregate([{ $group: { _id: "$company.location.country" } }]);

// Ex: Group all persons by the their favorite fruit and sum their ages.
db.persons.aggregate([
  { $group: { _id: "$favoriteFruit", sumOfTheAges: { $sum: "$age" } } },
]);

// Ex: Group all male persons and get the number of persons in each age.
db.persons.aggregate([
  { $match: { gender: "male" } },
  {
    $group: { _id: "$age", personsAge: { $sum: 1 } },
  },
]);

// Ex: Group all active female persons by eye color and find their average age
db.persons.aggregate([
  { $match: { $and: [{ isActive: true }, { gender: "female" }] } },
  { $group: { _id: "$eyeColor", avgAge: { $avg: "$age" } } },
]);

// Ex: Group all active male persons by their favoriteFruit and get the max age
db.persons.aggregate([
  { $match: { $and: [{ isActive: true }, { gender: "male" }] } },
  { $group: { _id: "$favoriteFruit", maxAge: { $max: "$age" } } },
]);

// Indexes:

// Ex: Find all the indexes in the person collection
db.persons.getIndexes();

// Ex: Create new Index on the index field on persons collection
db.persons.createIndex({ index: 1 });

// Ex: Find all the persons that has an age less than 25 years and use explain method to see query info (WITHOUT MAKING AN INDEX ON AGE FIELD)
db.persons.find({ age: { $lt: 25 } }).explain("executionStats");

// Ex: Create new index on the age field on persons collection, make it in the background, unique and name it as ageIndex
db.persons.createIndex(
  { age: 1 },
  { background: true, name: "ageIndex", unique: true }
);

// Ex: Find all the persons that has an age less than 25 years and use explain method to see query info (WITH MAKING AN INDEX ON AGE FIELD)
db.persons.find({ age: { $lt: 25 } }).explain("executionStats");

// Ex: Drop the index on the age field
db.persons.dropIndex({ age: 1 });

// Ex: Drop all the indexes
db.persons.dropIndexes();

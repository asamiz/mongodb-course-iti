// Lecture Commands:

// basic
1 - show dbs
2 - use demo 
3 - db
4 - show collections
5 - use iti
6 - show dbs
7 - db.createCollection('students')
8 - show dbs
9 - show collections

// insertion
//Ex: Insert one document in students collection.
db.students.insertOne({name:'Ali', email:'Ali@ali.com', phone: '695478546', grades: [40,50,60,70], address: {city:'Cairo', area: 'Maadi'}})

// Ex: Insert more than one document using one command in students collection
db.students.insertMany([{name:'Ahmed', email:'Ahmed@ahmed.com', phone: '7356465'},{name:'Nada', email:'Nada@nada.com', phone: '6465786'},{name:'Kamal', email:'Kamal@kamal.com', phone: '1345665'}])

// Ex: Insert one document in courses collection (it will implicitly create the collection)
db.courses.insertOne({name: 'MongoDB', grade:100})

// ---------------------------------------------------------------------------------------------

// Update
// Ex: Update Ahmed's phone to be 33445686
db.students.updateOne({name:'Ahmed'}, {$set:{phone: 33445686}})

// Ex: Update Nada's document to add grade array of [35,45,55,75]
db.students.updateOne({name: 'Nada'}, {$set:{grade: [35,45,55,75]})

// Ex: Update Nabil document (upserted)
db.students.updateOne({name:'Nabil'}, {$set: {name:'Nabil', email:'Nabil@nabil.com', phone: '9038543'}}, {upsert:true})

// Ex: Update All documents to add another attribute called class and its value 'A'
db.students.updateMany({}, {$set: {calss: 'A'}})

// Ex: Replace Kamal's document with Rami's one => {name:'Rami', email: 'Rami@rami.com', phone: 4902847}
db.students.replaceOne({name:'Kamal'}, {name:'Rami', email: 'Rami@rami.com', phone: 4902847})

// ---------------------------------------------------------------------------------------------

// Delete
// Ex: Delete Ali's document 
db.students.deleteOne({name:'Ali'})

// Delete all the documents on students collection
db.students.deleteMany({})    -   db.students.remove({})

// Drop students collection
db.students.drop()

// Drop iti database 
db.dropDatabase()

// ---------------------------------------------------------------------------------------------

// Read
use demo

// Ex: Find all cities
db.cities.find({})

// Ex: Find all cities with prettier format
db.cities.find({}).pretty()

// Ex: Find all cities and return only city and pop properties
db.cities.find({}, {city: 1, pop: 1})

// Ex: Find all cities and return only city and pop properties without _id
db.cities.find({}, {_id:0,city: 1, pop: 1})

// Ex: Find the document of 'WALES' city
db.cities.findOne({city:'WALES'})


// ---------------------------------------------------------------------------------------------

// Operators

// Ex: Find all the cities that have pop lt 500
db.cities.find({pop:{$lt: 500}})

// Ex: Find all cities that are in 'MA' state
db.cities.find({state:{$eq: 'MA'}})

// Ex: Find all cities that are not in 'MA' or 'RI' states
db.cities.find({state: {$nin: ['MA', 'RI']}})

// Ex: Find all cities that are in 'RI' state and has pop gt 500
db.cities.find({$and:[{state:{$eq: 'RI'}},{pop:{$gt: 500}}]})

// ---------------------------------------------------------------------------------------------

// Embedded Documents and Arrays

// Ex: Update all likes count for all countries except for the countries in states 'RI' and 'ME' to be 2000
db.cities.updateMany({state:{$nin:['RI', 'ME']}}, {$set:{'rates.liked':2000}})

// Ex: Update English nationality in nationalities array for all cities that has pop less than 300 to be German
db.cities.updateMany({pop:{$lt: 300}, nationalities: 'English'}, {$set:{'nationalities.$': 'German'}})

// Ex: Pull the value of 42.062734 from loc array in 'WALES' city document
db.cities.updateOne({ city: "WALES" }, { $pull: { loc: 42.062734 } })

// ---------------------------------------------------------------------------------------------

// Limit, Skip, and Count

// Ex: Count all the cities in 'ME' state
db.cities.find({state: {$eq:'RI'}}).count()



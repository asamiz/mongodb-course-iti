// Lecture Commands:

// basic
 show dbs
 use demo 
 db
 show collections
 use iti
 show dbs
 db.createCollection('students')
 show dbs
 use iti
 show collections

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

// Ex: Update Nabil's document (upserted)
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

// Ex: Find all states
db.states.find({})

// Ex: Find all states (prevent using cursor)
db.states,find({}).toArray()

// Ex: Find all states with prettier format
db.states.find({}).pretty()

// Ex: Find all states and return only city and pop properties // projection
db.states.find({}, {city: 1, pop: 1})

// Ex: Find all states and return only city and pop properties without _id
db.states.find({}, {_id:0,city: 1, pop: 1})

// Ex: Find the document of 'WALES' city
db.states.findOne({city:'WALES'})


// ---------------------------------------------------------------------------------------------

// Operators

// Ex: Find all the states that have pop less than 500
db.states.find({pop:{$lt: 500}})

// Ex: Find all 'MA' states
db.states.find({state:{$eq: 'MA'}})

// Ex: Find all states that are not 'MA' or 'RI' states
db.states.find({state: {$nin: ['MA', 'RI']}})

// Ex: Find all 'RI' state with pop greater than 500
db.states.find({$and:[{state:{$eq: 'RI'}},{pop:{$gt: 500}}]})

// ---------------------------------------------------------------------------------------------

// Embedded Documents and Arrays

// Ex: Update all likes count for all states except for states 'RI' and 'ME' to be 2000
db.states.updateMany({state:{$nin:['RI', 'ME']}}, {$set:{'rates.liked':2000}})

// Ex: Update American nationality in nationalities array for all states that has pop less than 300 to be German
db.states.updateMany({pop:{$lt: 300}, nationalities: 'American'}, {$set:{'nationalities.$': 'German'}})

// Ex: Update second nationality in nationalities array for all states that has pop greater than 300 to be Egyptian
db.states.updateMany({pop:{$gt: 300}}, {$set:{'nationalities.1': 'Egyptian'}})

// Ex: Pull the value of 42.062734 from loc array in 'WALES' city document
db.states.updateOne({ city: "WALES" }, { $pull: { loc: 42.062734 } })

// Ex: Pop the first value of loc array in 'WALES' city document
db.states.updateOne({ city: "WALES" }, { $pop: { loc: -1 } })

// ---------------------------------------------------------------------------------------------

// Limit, Skip, sort, and Count

// Ex: Count all 'ME' states
db.states.find({state: {$eq:'RI'}}).count()



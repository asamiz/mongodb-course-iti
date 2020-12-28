/**
 * DAY 01 - ITI Diploma - MONGODB COURSE
 */

                        /* -- Basic Commands-- */

show dbs             // Shows all databases that are created on the machine.

/** Example for the proper output: 
    admin   0.000GB
    config  0.000GB
    demo    0.000GB
    local   0.000GB 
    */
/* _________________________________________________________________ */

use DATABASE_NAME  // ** Selects a specific existing database to work on or IMPLICITLY creates a database when you insert one document or explicitly creates a collection.

/** Example for the proper output: 
 * switched to db demo
  */
/* _________________________________________________________________ */

show collections     // Shows all collections on the selected database.

/**
 * Example for the proper output:
   cities
   persons
   */
/* _________________________________________________________________ */

db                   // Prints the name of the current selected database.

/** Example for the proper output: 
 * demo
  */
/* _________________________________________________________________ */

db.dropDatabase()    // Drops the selected database.

/** Example for the proper output: 
 * { "dropped" : "demo", "ok" : 1 }
  */
/* _________________________________________________________________ */

db.createCollection('COLLECTION_NAME')  // Creates a collection EXPLICITLY.

/** Example for the proper output: 
 * { "ok" : 1 }
  */
/* _________________________________________________________________ */

                        /* -- CRUD-INSERTION -- */

db.COLLECTION_NAME.insertOne({YOUR_DOCUMENT}, OPTIONS_OBJECT)     // ** Inserts the document you pass between the brackets or IMPLICITLY creates a new collection if not exists.

/** Example for the proper output: 
 * {
	"acknowledged" : true,
	"insertedId" : ObjectId("5fe7b60d8919cf2fbc3a2bd6")   // ** Automatically Generated.
   }
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.insertMany([{DOCUMENT_ONE}, {DOCUMENT_TWO}, ...], OPTIONS_OBJECT)   // Inserts more than one document on one command.

/** Example for the proper output: 
 * {
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5fe7b77e8919cf2fbc3a2bd7"),  // ** Automatically Generated.
		ObjectId("5fe7b77e8919cf2fbc3a2bd8")  // ** Automatically Generated.
	]
   }
  */
/* _________________________________________________________________ */

                        /* -- CRUD-SELECTION -- */

db.COLLECTION_NAME.find(QUERY, PROJECTION)     // Selects a specific documents according to query, also retrieving specific properties according to projection.
db.COLLECTION_NAME.find(QUERY, PROJECTION).pretty()     // More prettier selections.
db.COLLECTION_NAME.findOne(QUERY, PROJECTION)     // ** Selects one specific documents (or first one if there many) according to query.

/* _________________________________________________________________ */

                        /* -- CRUD-UPDATING -- */

db.COLLECTION_NAME.updateOne(FILTER, UPDATE, OPTIONS_OBJECT)   // ** Updates one (and first one if it is repeated) document on the collection that meets filter criteria.

/** Example for the proper output: 
 * ? Without Upsert --> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
 * ? With Upsert: 
 * {
	"acknowledged" : true,
	"matchedCount" : 0,
	"modifiedCount" : 0,
	"upsertedId" : ObjectId("5fe7baa6a9d7d7b6c9d15f40")
   }
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.updateMany(FILTER, UPDATE, OPTIONS_OBJECT)  // Updates all the document that meet the filter criteria.

/** Example for the proper output: 
 * { "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.replaceOne(FILTER, REPLACEMENT, OPTIONS_OBJECT)  // Replaces all the document with the new one.

/** Example for the proper output: 
 * { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
  */
/* _________________________________________________________________ */

                    /* -- CRUD-DELETING -- */

db.COLLECTION_NAME.deleteOne(FILTER, OPTIONS_OBJECT)  // ** Deletes one (and first one if it is repeated) document on the collection that meets filter criteria.

/** Example for the proper output: 
 * { "acknowledged" : true, "deletedCount" : 1 }
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.deleteMany(FILTER, OPTIONS_OBJECT)   // Deletes all the document that meet the filter criteria.

/** Example for the proper output: 
 * { "acknowledged" : true, "deletedCount" : 2 }
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.deleteMany({}) - db.COLLECTION_NAME.remove({})  // Deletes all the documents on the the collection.

/** Example for the proper output: 
 * deleteMany --> { "acknowledged" : true, "deletedCount" : 3 }
 * remove --> WriteResult({ "nRemoved" : 2 })
  */
/* _________________________________________________________________ */

db.COLLECTION_NAME.drop()   // Drops the collection

/** Example for the proper output: 
 * true
  */
/* _________________________________________________________________ */


/* -------------------------------------------------------------------------------------------------------------------------*/

                    /* -- MORE CRUD OPERATIONS & OPERATORS */
                    /* -----------------------------*/

                    /*        -- OPERATORS --       */

// General criteria for COMPARISON query operators, you can find them all in: https://docs.mongodb.com/manual/reference/operator/query/
db.COLLECTION_NAME.find({FIELD: {OPERATOR: VALUE}})

                    /* -----------------------------*/

// General criteria for LOGICAL query operators, you can find them all in: https://docs.mongodb.com/manual/reference/operator/query/
db.COLLECTION_NAME.find({OPERATOR:[{EXPRESSION_ONE},{EXPRESSION_TWO}, ...]})

                    /* -----------------------------*/

                    /*    -- MORE CRUD OPERATIONS --   */

// 1- Updating embedded documents:

// General criteria for updating embedded documents.
db.COLLECTION_NAME.update({FILTER},{$set:{'OBJECT.PROPERTY': NEW_VALUE}})

                    /* -------------------------------*/

// 2- Working with arrays:

// General criteria for updating value in an array.
db.COLLECTION_NAME.updateOne({FILTER, ARRAY_FILED: ARRAY_VALUE}, {$set: {'ARRAY_FILED.$': NEW_VALUE}})

// ** Check all updating array operators on this link: https://docs.mongodb.com/manual/reference/operator/update-array/index.html


                    /* --------------------------------*/

// 3- limit, count and skip:

// General criteria to use any of limit, count and skip
db.COLLECTION_NAME.find({QUERY}).limit(NUMBER) / .count() / .skip(NUMBER)

                  /* -----------------------------------*/

// 4- Projection:

// General criteria to use projection on find() function 'SELECTION'
db.COLLECTION_NAME.find({QUERY}, {FIELD: INDICATOR})

/**
 * INDICATOR can have two values 0 or 1:
 * 1: to include this field on the result of query function return 'find()'
 * 0: to NOT include this field on the result of query function return 'find()'
 * NOTE: the field "_id" by default will return on the result if you didn't include {_id: 0} in the projection object
 */



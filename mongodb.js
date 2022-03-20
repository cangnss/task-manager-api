// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to database!");
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Yusuf',
    //     age: 4
    // }, (error,result) => {
    //     if (error) {
    //         return console.log('unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection("users").insertMany([
    //   {
    //     name: "Dilek",
    //     age: 22,
    //   },
    //   {
    //       name:'Cem',
    //       age: 18
    //   },
    //   {
    //       name: 'Ceren',
    //       age: 18
    //   }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Setup Linux',
    //         completed: true
    //     },
    //     {
    //         description: 'Learn React',
    //         completed: false
    //     },
    //     {
    //         description: 'Learn Node',
    //         completed: true
    //     }
    // ], (error,result)=>{
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ name: 'Ali Can', age: 1 }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ name: 'Ali Can'}).toArray((error,users)=>{
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 22 }).count((error,count)=>{
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("6213fed76fbdbb2f54fdcfe2")}, (error, task) =>{
    //     if (error) {
    //         console.log('unable to fetch')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //   _id: new ObjectID('6213fcad6d99922b72d7b7c0')
    // }, {
    //   $set: {
    //     name: 'Mike'
    //   }
    // })

    // updatePromise.then((result)=>{
    //   console.log(result)
    // }).catch((error)=>{
    //   console.log(error)
    // })

    // db.collection('users').updateOne({
    //   _id: new ObjectID('6213fcad6d99922b72d7b7c0')
    // }, {
    //   $set: {
    //     name: 'Mike'
    //   }
    // }).then((result)=>{
    //     console.log(result)
    //   }).catch((error)=>{
    //     console.log(error)
    //   })

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // db.collection('users').deleteMany({ age: 24}).then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })

    db.collection('tasks').deleteOne({
      description: 'Learn Node'
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })



});

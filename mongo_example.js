"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, client) => {

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  const db = client.db('tweeter');

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:
      //not useful to have error handling here because there's nothing we can do to recover from it
  // function getTweets(callback) {
  //   db.collection("tweets").find().toArray((err, tweets) => {
  //     if (err) {
  //       return callback(err);
  //     }
  //     callback(null, tweets);
  //   });
  // }
  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }
  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});
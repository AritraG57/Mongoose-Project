const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://aritraghosh2005_db_user:fs4AYxYoqc1sEdEH@aritradata.rto8otg.mongodb.net/?appName=AritraData";

let _db;

const mongoConnect = (callback)=> {
  MongoClient.connect(url).then((client)=> {
    console.log("Connected to MongoDB");
    _db = client.db('AritraData');
    callback();
  }).catch((err)=> {
    console.log(err);
    throw err;
  })
};

const getDb = ()=> {
  if(!_db) {
    throw new Error("Database not connected");
  }
  else {
    return _db;
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config({path: "./.env"});

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database

module.exports = {
  connectToServer: () => {
    database = client.db("mongodbVSCodePlaygroundDB")
  },
  getDb: () => {
    return database
  }
}
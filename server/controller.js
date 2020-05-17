const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { CONNECTION_STRING } = process.env;


module.exports = {
  addVideo: (req, res) => {
    console.log("req.body", req.body)
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("videos");
        const videosCollection = db.collection("videos");
        videosCollection
          .insertOne(req.body)
          .then(() => {
            db.collection("videos")
              .find()
              .toArray()
              .then((results) => {
                res.status(200).send(results);
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },

  getVideos: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("videos");
        db.collection("videos")
          .find()
          .toArray()
          .then((results) => {
            console.log(results);
            res.status(200).send(results);
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
  },

  deleteVideo: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("videos");
        const videosCollection = db.collection("videos");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        videosCollection
          .deleteOne({ _id: ObjectID(req.body.id) })
          .then(() => {
            db.collection("videos")
              .find()
              .toArray()
              .then((results) => {
                res.status(200).send(results);
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => console.log(e));
      
  }
}
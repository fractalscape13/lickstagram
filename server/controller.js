const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { CONNECTION_STRING } = process.env;

module.exports = {
  addVideo: (req, res) => {
    console.log("req.body", req.body)
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
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
        const db = client.db("lickstagram");
        db.collection("videos")
          .find()
          .toArray()
          .then((results) => {
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
        const db = client.db("lickstagram");
        const videosCollection = db.collection("videos");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        videosCollection
          .deleteOne({ _id: ObjectID(req.body.id) })
          .then(() => {
            db.collection("videos")
              .find({userId: req.body.userId})
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

  favoriteVideo: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then((client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
        const videosCollection = db.collection("videos");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        let newVal;
        videosCollection
        .find({ _id: ObjectID(req.body.id) })
        .toArray()
        .then(r => {
          let currentArr = [...r[0].favorited];
          if (currentArr.includes(req.body.currentUser)) {
            let arr = currentArr.filter(name => name !== req.body.currentUser)
            newVal = { $set: {favorited: arr} }
          } else {
            newVal = { $set: {favorited: [...currentArr, req.body.currentUser]}}
          }
          videosCollection
            .updateOne({ _id: ObjectID(req.body.id) }, newVal)
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
        .catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  }, 

  editVideo: (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async(client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
        const videosCollection = db.collection("videos");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        console.log("description", req.body.description)
        let x = await videosCollection
        .updateOne({ _id: ObjectID(req.body.id) }, { $set: { description: req.body.description}})
        videosCollection
        .find({userId: req.body.userId})
        .toArray()
        .then(results => {
          res.status(200).send(results);
        })
        .catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  }
}
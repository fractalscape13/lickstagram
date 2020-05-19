const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    const { password, email } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
        const usersCollection = db.collection("users");
        const foundUser = await usersCollection.find({email}).toArray();
        if (foundUser[0]) {
          const matchPasswords = await bcrypt
            .compare(password, foundUser[0].password)
            .catch(err => console.log(err));
          if (matchPasswords) {
            let user = {
              username: foundUser[0].username,
              id: foundUser[0]._id
            };
            res.status(200).send(user);
          } else {
            res.status(401).send("Incorrect email and/or password combination");
          }
        } else {
          res
            .status(401)
            .json(
              "That user does not exist"
            );
          }
      })
      .catch((e) => console.log(e));
  },
  registerUser: async (req, res, next) => {
    const { username, password, email } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
        const usersCollection = db.collection("users");
        const foundUserEmail = await usersCollection.find({email}).toArray();
        const foundUserName = await usersCollection.find({username}).toArray();
        if (foundUserEmail[0] || foundUserName[0]) {
          res
            .status(409)
            .json(
              "That user exists already, please register with another email address."
            );
        } else {
          const saltRounds = 12;
          bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(password, salt).then(hashedPassword => {
              usersCollection
                .insertOne({ email, username, password: hashedPassword })
                .then(() => {
                  usersCollection
                    .find({email})
                    .toArray()
                    .then((results) => {
                      res.status(200).send(results);
                    })
                    .catch((e) => console.log(e));
                })
                .catch((error) => console.error(error));
              });
            });
          }
      })
      .catch((e) => console.log(e));
  },
  deleteUser: (req, res, next) => {
    const { id } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("lickstagram");
        const usersCollection = db.collection("users");
        usersCollection
          .deleteOne({_id: id})
        const videosCollection = db.collection("videos");
        videosCollection
          .remove({userId: id})
        res.status(200).send("Successful delete");
      })
      .catch((e) => console.log(e));
  }
};
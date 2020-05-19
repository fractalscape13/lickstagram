const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
require("dotenv").config();
const { apiPort, SESSION_SECRET } = process.env;
const { addVideo, getVideos, deleteVideo, favoriteVideo, editVideo } = require('./controller');
const { login, registerUser, deleteUser, logout, getSession } = require('./auth-controller');
const session = require("express-session");

app.use(cors())
app.use(express.json())

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

let upload = multer({storage: storage}).single('file')

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
  return res.status(200).send(req.file)
  })
});

app.post('/api/addVideo', addVideo);
app.get('/api/getVideos', getVideos);
app.post('/api/deleteVideo', deleteVideo);
app.put('/api/favoriteVideo', favoriteVideo);
app.put('/api/editVideo', editVideo);

app.post('/auth/login', login);
app.post('/auth/registerUser', registerUser);
app.post('/auth/delete', deleteUser);
app.get('/auth/logout', logout);
app.get('/auth/session', getSession);

app.listen(apiPort, function() {
  console.log('App is doing its thang on port ', apiPort)
});
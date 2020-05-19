const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
require("dotenv").config();
const { apiPort } = process.env;
const { addVideo, getVideos, deleteVideo } = require('./controller');
const { login, registerUser, deleteUser } = require('./auth-controller');

app.use(cors())
app.use(express.json())

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
app.post('/api/deleteVideo', deleteVideo)

app.post('/auth/login', login);
app.post('/auth/registerUser', registerUser);
app.post('/auth/delete', deleteUser);

app.listen(apiPort, function() {
  console.log('App is doing its thang on port ', apiPort)
});
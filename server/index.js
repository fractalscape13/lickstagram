const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
const bodyParser = require('body-parser');
const apiPort = 8000;

const db = require('./DB')
const videoRouter = require('./routes/video-router')
const { User } = require('./models/user')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.post('api/user/signup', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  }).save((err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(response)
    }
  })
})

app.post('api/user/signin', (req, res) => {
  User.findOne({'email': req.body.email}, (err, user) => {
    if (!user) {
      res.json({message: 'Login failed, user not found'})
    }
  })
})

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

app.use(('/api'), videoRouter)

app.listen(apiPort, function() {
  console.log('App is doing its thang on port ', apiPort)
});
const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');

app.use(cors())

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

app.listen(8000, function() {
  console.log('App is doing its thang on port 8000')
});
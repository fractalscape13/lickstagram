const express = require('express')

const VideoCtrl = require('../controllers/video-control')

const router = express.Router()

router.post('/video', VideoCtrl.createVideo)
router.put('/video/:id', VideoCtrl.updateVideo)
router.delete('/video/:id', VideoCtrl.deleteVideo)
router.get('/video/:id', VideoCtrl.getVideoById)
router.get('/videos', VideoCtrl.getVideos)

module.exports = router
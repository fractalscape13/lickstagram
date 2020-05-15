const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Video = new Schema(
    {
        name: { type: String, required: true },
        user: { type: String, required: true },
        time: { type: [String], required: true },
        description: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('videos', Video)

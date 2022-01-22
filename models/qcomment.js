const mongoose = require('mongoose');

const queComment = new mongoose.Schema({
    queId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    name : {
        type: String,
    },
    image_url : {
        type: String,
    },
    comment : {
        type: String,
        required: true
    },
}, { timestamps: true })

const QComment = mongoose.models.QComment || mongoose.model("QComment", queComment);

module.exports = QComment;
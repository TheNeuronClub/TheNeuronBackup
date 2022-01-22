const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    issue : {
        type: String,
        required: true
    },
    email : {
        type: String,
    },
    desc : {
        type: String,
    },
    image_url: {
        type: String
    }
})

const Bug = mongoose.models.Bug || mongoose.model("Bug", bugSchema);

module.exports = Bug;
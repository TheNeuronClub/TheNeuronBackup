const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    desc : {
        type: String,
    },
    imgSrc: {
        type: String
    }
})

const Header = mongoose.models.Header || mongoose.model("Header", headerSchema);

module.exports = Header;
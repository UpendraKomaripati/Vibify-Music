const mongoose = require("mongoose")

const schema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    playlist: [{
        type: String,
        required: true
    }]
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Vibify', schema)

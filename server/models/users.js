var mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    joined_date: {
        type: Date,
        required: true
    },
    reputation: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model("users", schema);
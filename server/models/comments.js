// Comments Document Schema

var mongoose = require("mongoose");

const schema = mongoose.Schema({
    text : {type : String, required : true},
    username : {type : String, required : true},
    date : {type : String, required : true},
    votes : {type : Number, default : 0},
});

module.exports = mongoose.model("comments", schema);
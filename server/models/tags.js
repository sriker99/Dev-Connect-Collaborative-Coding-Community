// Tag Document Schema
var mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {type : String, required : true, unique: true},
    qid: [{type : mongoose.Schema.Types.ObjectId, ref : "questions", default: []}]
});

module.exports = mongoose.model("tags", schema);

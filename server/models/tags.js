// Tag Document Schema
var mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {type : String, required : true, unique: true}
});

module.exports = mongoose.model("tags", schema);

// Answer Document Schema

var mongoose = require("mongoose");

const schema = mongoose.Schema({
    text : {type : String, required : true},
    ans_by : {type : String, required : true},
    ans_date_time : {type : String, required : true},
    votes : {type : Number, default : 0}
});

module.exports = mongoose.model("answers", schema);
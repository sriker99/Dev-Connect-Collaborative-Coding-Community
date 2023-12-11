// Question Document Schema
var mongoose = require("mongoose");

const schema = mongoose.Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    tags : [{type : mongoose.Schema.Types.ObjectId, ref : "tags", default: []}],
    asked_by : {type : String, required : true},
    ask_date_time : {type : String, required : true},
    answers : [{type : mongoose.Schema.Types.ObjectId, ref : "answers", default: []}],
    views : {type : Number, required : true, default : 0},
    votes : {type : Number, default : 0},
    comments : [{type : mongoose.Schema.Types.ObjectId, ref : "comments", default: []}],
    active_order: {type : String, required : true}
});

module.exports = mongoose.model("questions", schema);
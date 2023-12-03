// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const { AnswerController } = require('./controllers/answers/answer-controller.js');
const { QuestionController } = require('./controllers/questions/question-controller.js');
const { TagController } = require('./controllers/tags/tag-controller.js');
const { UserController } = require('./controllers/users/user-controller.js');
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');


let mongoose = require('mongoose');
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
 
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());

UserController(app);
AnswerController(app);
QuestionController(app);
TagController(app);
 
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
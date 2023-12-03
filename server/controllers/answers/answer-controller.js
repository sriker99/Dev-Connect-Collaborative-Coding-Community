var { findAllAnswers, createAnswersAndUpdateQuestion, upvoteAnswer, downvoteAnswer } = require('../../DAO/answersDAO.js');
var { questionServerToClient } = require('../questions/question-controller.js');
 
const AnswerController = (app) => {
    app.get('/api/answers', findAnswer)
    app.post('/api/answers/question/:qid', createAnswer);
    app.put('/api/answers/:aid/votes', updateAnswerVotes);
 }
 
const createAnswer = async (req, res) => {
    const answer = req.body;
    const {qid} = req.params;
    const modifiedAnswer = answerClientToServer(answer);
    const {newAns, updateQuestion} = await createAnswersAndUpdateQuestion(modifiedAnswer, qid);
    const convertedAnswer = answerServerToClient(newAns);
    const convertedQuestion = questionServerToClient(updateQuestion);
    res.send({answer: convertedAnswer, questions: convertedQuestion});
   
}
 
const findAnswer = async (req, res) => {
    const insertedAnswers = await findAllAnswers();
    const response = insertedAnswers.map(element => answerServerToClient(element));
    res.send(response);
}

const updateAnswerVotes = async (req, res) => {
    const { aid } = req.params;
    const isIncrement = req.query.isIncrement === 'true';
    console.log("ANSWER", isIncrement);
    let response;
    if(isIncrement) {
        response = await upvoteAnswer(aid);
    } else {
        console.log("In else loop");
        response = await downvoteAnswer(aid);
    }
    const answer = answerServerToClient(response);
    res.send(answer);
}
 
const answerClientToServer = (element) => {
    return {
        text: element.text,
        ans_by: element.ansBy,
        ans_date_time: element.ansDate.toString(),
        votes: element.votes
    };
}
 
const answerServerToClient = (element) => {
    return {
        aid: element._id,
        text: element.text,
        ansBy: element.ans_by,
        ansDate: element.ans_date_time,
        votes: element.votes
    };
}
 
module.exports = {AnswerController}
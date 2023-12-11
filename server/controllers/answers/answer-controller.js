var { findAllAnswers, createAnswersAndUpdateQuestion, upvoteAnswer, downvoteAnswer, acceptAnswer, removeAnswerAcceptance, deleteAnswerById, updateAnswerText} = require('../../DAO/answersDAO.js');
const { findQuestionByID } = require('../../DAO/questionsDAO.js');
var { questionServerToClient } = require('../questions/question-controller.js');
const { findUserName } = require('../../DAO/usersDAO.js');
 
const AnswerController = (app) => {
    app.get('/api/answers', findAnswer);
    app.get('/api/answers/:qid', paginateAnswersForQuestion);
    app.get('/api/answers/:aid/question/:qid', acceptAnswerForQuestion);
    app.post('/api/answers/question/:qid', createAnswer);
    app.put('/api/answers/:aid/votes', updateAnswerVotes);
    app.put('/api/answers/:aid', updateAcceptedAnswer);
    app.get('/api/checkanswers/:qid', checkAnswerAcceptance);
    app.delete('/api/answers/:aid', deleteAnswer);
    app.put('/api/answers/updateAnswerText/:aid', updateAnswer);
 }
 

const updateAnswer = async(req, res) => {
    const { aid } = req.params;
    const updatedAnswer = req.body;
    console.log("in update answer", updatedAnswer);
    await updateAnswerText(aid, updatedAnswer.text);
    res.send("Answer text updated successfully");
}


const deleteAnswer = async (req, res) => {
    const { aid } = req.params;
    await deleteAnswerById(aid);
    res.send("Answer deleted successfully");
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

const checkAnswerAcceptance = async (req, res) => {
    const { qid } = req.params;
    const question = await findQuestionByID(qid);
    const acceptedAnswer = question.answers.find((answer) => answer.accept === true);
    const acceptedAnswerId = acceptedAnswer ? acceptedAnswer._id : null;
    const accept = question.answers.some((answer) => answer.accept === true);
    res.send({accept: accept, ansId: acceptedAnswerId});    
}

const paginateAnswersForQuestion = async (req, res) => {
    const { qid } = req.params;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const size = (page - 1) * limit;
    const question = await findQuestionByID(qid);
    let qanswers = [];
    question.answers.forEach((answer) => {
        qanswers.push(answerServerToClient(answer));
    })
    qanswers.sort((a,b) => new Date(b.ansDate) - new Date(a.ansDate));
    const response = qanswers.slice(size, size+limit);       
    // question.answers.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));
    // let tagIDs = [];
    // let ansIds = [];
    // question.tags.forEach(t => tagIDs.push(t._id));
    // question.tags = tagIDs;
    // question.answers.forEach(a => ansIds.push(a._id));
    // question.answers = ansIds;
    // const convertedQuestion = questionServerToClient(question);
    // console.log(convertedQuestion);

    res.send({
        answersPerPage: response,
        // question: convertedQuestion
    })
}

const acceptAnswerForQuestion = async (req, res) => {
    const {aid, qid} = req.params;
    console.log(aid);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) - 1 : 4;
    const size = (page - 1) * limit;
    const question = await findQuestionByID(qid);
    let qanswers = [];
    question.answers.forEach((answer) => {
        qanswers.push(answerServerToClient(answer));
    })
    qanswers.sort((a,b) => new Date(b.ansDate) - new Date(a.ansDate));
    const answer = qanswers.find((ans) => ans.aid.toString() === aid);
    console.log("ACCEPETED ANSWER", answer);
    const otherAnswers = qanswers.filter((ans) => ans.aid.toString() !== aid)
    const response = [];
    response.push(answer);
    response.push(...otherAnswers.slice(size, size+limit));

    question.answers.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));
    let tagIDs = [];
    let ansIds = [];
    question.tags.forEach(t => tagIDs.push(t._id));
    question.tags = tagIDs;
    question.answers.forEach(a => ansIds.push(a._id));
    question.answers = ansIds;
    const convertedQuestion = questionServerToClient(question);
    console.log(convertedQuestion);

    res.send(response);
}

const updateAnswerVotes = async (req, res) => {
    const { aid } = req.params;
    const user = req.query.user;
    const qid = req.query.qid;
    console.log("USERRR", user);
    const isIncrement = req.query.isIncrement === 'true';
    const currentUser = await findUserName(user);
    let updatedUser;
    let response;
    if(isIncrement) {
        response = await upvoteAnswer(qid, aid);
        currentUser.reputation = currentUser.reputation + 5;
        updatedUser = await currentUser.save();
        console.log("Updated USER", updatedUser);
    } else {
        console.log("In else loop");
        response = await downvoteAnswer(qid, aid);
        currentUser.reputation = currentUser.reputation - 10;
        updatedUser = await currentUser.save();
        console.log("Updated USER", updatedUser);
    }
    const answer = answerServerToClient(response);
    res.send({answer: answer, user: updatedUser, qid: qid});
}

const updateAcceptedAnswer = async (req, res) => {
    const { aid } = req.params;
    const isAccepted = req.query.isAccepted === 'true';
    const answers = await findAllAnswers();
    const acceptedAnswer = answers.find((ans) => ans.accept === true);
  
    if(acceptedAnswer !== undefined) {
        removeAnswerAcceptance(acceptedAnswer._id);
    }
    if(isAccepted) {
        await acceptAnswer(aid, isAccepted);
    }
    const currentAnswers = await findAllAnswers();
    let updatedAnswers = [];
    currentAnswers.forEach((ans) => updatedAnswers.push(answerServerToClient(ans)));
    res.send(updatedAnswers);
}
 
const answerClientToServer = (element) => {
    return {
        text: element.text,
        ans_by: element.ansBy,
        ans_date_time: element.ansDate.toString(),
        votes: element.votes,
        accept: element.accept,
    };
}
 
const answerServerToClient = (element) => {
    return {
        aid: element._id,
        text: element.text,
        ansBy: element.ans_by,
        ansDate: element.ans_date_time,
        votes: element.votes,
        accept: element.accept,
    };
}
 
module.exports = { AnswerController };
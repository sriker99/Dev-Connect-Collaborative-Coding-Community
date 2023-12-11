var {createQuestions, findAllQuestions, updateQuestionView, upvoteQuestion, downvoteQuestion, deleteDataByQid, updateQuestion} = require('../../DAO/questionsDAO.js');
var {tagsServerToClient} = require("../tags/tag-controller.js");
const { findUserName } = require('../../DAO/usersDAO.js');

const QuestionController = (app) => {
    app.get('/api/questions', findQuestion);
    app.post('/api/questions', createQuestion);
    app.put('/api/questions/:qid', updateQuestionViews);
    app.put('/api/questions/:qid/votes', updateQuestionVotes);
    app.post('/api/questions/paginatedQuestions', paginateQuestions);
    app.delete('/api/questions/:qid', deleteQuestion)
    app.put('/api/questions/updateQuestion/:qid', updateQues);
 }

const updateQues = async(req, res) => {
    const { qid } = req.params;
    const updatedQuestion = req.body;
    console.log(req.body);
    await updateQuestion(qid, updatedQuestion.title, updatedQuestion.text, updatedQuestion.tags);
    res.send("sucessfully updated fields ");

}

const deleteQuestion = async(req, res) => {
    const { qid } = req.params;
    await deleteDataByQid(qid);
    res.send("sucessfully deleted all fields ");

}
const createQuestion = async (req, res) => {
    const newQuestion = req.body;
    const modifiedQuestion = questionClientToServer(newQuestion);
    const {question, tags} = await createQuestions(modifiedQuestion);
    const convertedTags = tags.map(tag => tagsServerToClient(tag));
    const response = questionServerToClient(question);
    res.send({question: response, tags: convertedTags});
}
 
const findQuestion = async (req, res) => {
    const insertedquestions = await findAllQuestions();

    const newQuestion = [];
    
    insertedquestions.forEach(element => {
        let tagIDs = [];
        let ansIds = [];
        
        element.tags.forEach(t => tagIDs.push(t._id));
        element.tags = tagIDs;
        element.answers.forEach(a => ansIds.push(a._id));
        element.answers = ansIds;
        newQuestion.push({
            qid: element._id,
            title: element.title,
            text: element.text,
            tagIds: element.tags,
            askedBy: element.asked_by,
            askDate: element.ask_date_time,
            ansIds: element.answers,
            views: element.views,
            votes: element.votes,
            active_order: element.active_order
        })
    });

    res.send(newQuestion);
}

const paginateQuestions = async (req, res) => {
    const questions = req.body;
    // console.log("CLIENT SENT QUESTIONS", questions);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const size = (page - 1) * limit;
    questions.sort((a,b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));

    const response = questions.slice(size, size + limit);
    res.send({
        questionsPerPage: response
    })
}

const updateQuestionViews = async (req, res) => {
    const { qid } = req.params;
    const response = await updateQuestionView(qid);
    const question = questionServerToClient(response);
    res.send(question);
}

const updateQuestionVotes = async (req, res) => {
    console.log("called update votes method");
    const { qid } = req.params;
    const user = req.query.user;
    const isIncrement = req.query.isIncrement === 'true';
    let response;
    const currentUser = await findUserName(user);
    let updatedUser;
    if(isIncrement) {
        response = await upvoteQuestion(qid);
        currentUser.reputation = currentUser.reputation + 5;
        updatedUser = await currentUser.save();
        console.log("Updated USER", updatedUser);
    } else {
        console.log("in else statement");
        response = await downvoteQuestion(qid);
        currentUser.reputation = currentUser.reputation - 10;
        updatedUser = await currentUser.save();
        console.log("Updated USER", updatedUser);
    }
  
    console.log("response", response);
    const question = questionServerToClient(response);
    res.send({question: question, user: updatedUser});
  
}

const questionClientToServer = (element) => {
    return {
        title: element.title,
        text: element.text,
        tags: element.tagIds,
        asked_by: element.askedBy,
        ask_date_time: element.askDate.toString(),
        answers: element.ansIds,
        views: element.views,
        votes: element.votes,
        active_order: element.active_order
    };
}
 
const questionServerToClient = (element) => {
    return {
        qid: element._id,
        title: element.title,
        text: element.text,
        tagIds: element.tags,
        askedBy: element.asked_by,
        askDate: element.ask_date_time,
        ansIds: element.answers,
        views: element.views,
        votes: element.votes,
        active_order: element.active_order
    };
}

module.exports =  { QuestionController, questionClientToServer, questionServerToClient };

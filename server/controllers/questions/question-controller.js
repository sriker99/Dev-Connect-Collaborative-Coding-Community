var {createQuestions, findAllQuestions, updateQuestionView, upvoteQuestion, downvoteQuestion} = require('../../DAO/questionsDAO.js');
var {tagsServerToClient} = require("../tags/tag-controller.js");

const QuestionController = (app) => {
    app.get('/api/questions', findQuestion)
    app.post('/api/questions', createQuestion);
    app.put('/api/questions/:qid', updateQuestionViews);
    app.put('/api/questions/:qid/votes', updateQuestionVotes);
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
            votes: element.votes
        })
    });

    res.send(newQuestion);
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
    const isIncrement = req.query.isIncrement === 'true';
    let response;
    if(isIncrement) {
        response = await upvoteQuestion(qid);
    
    } else {
        console.log("in else statement");
        response = await downvoteQuestion(qid);
    }
    const question = questionServerToClient(response);
    res.send(question);
  
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
        votes: element.votes
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
        votes: element.votes
    };
}

module.exports =  { QuestionController, questionClientToServer, questionServerToClient };

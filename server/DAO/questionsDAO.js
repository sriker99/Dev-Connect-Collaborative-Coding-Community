let questionsModel = require('../models/questions.js');
let {findAndCreateTags, findAllTags} = require('./TagsDAO.js');

const createQuestions = async (question) => {
    const tagIds = await findAndCreateTags(question.tags);
    const newQuestion = {...question, tags: tagIds};
    const createdQuestion = await questionsModel.create(newQuestion);
    const tags = await findAllTags()
    return {question: createdQuestion, tags: tags};
}

const updateQuestionView = async(qid) => await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {views: 1}}, {new: true});

const findAllQuestions = async() => await questionsModel.find({}).populate({path:"tags", select: "_id"}).populate({path:"answers", select: "_id"}).lean().exec();

const findQuestionByID = async(qid) => await questionsModel.find({_id: qid}).populate("tags").populate("answers").exec();

const upvoteQuestion = async(qid) => await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {votes: 1}}, {new: true});

const downvoteQuestion = async(qid) => await questionsModel.findOneAndUpdate({_id: qid}, {$inc: {votes: -1}}, {new: true});

module.exports = {createQuestions, updateQuestionView, findAllQuestions, findQuestionByID, upvoteQuestion, downvoteQuestion};
let answersModel = require('../models/answers.js');
let questionsModel = require('../models/questions.js');

const createAnswersAndUpdateQuestion = async(answer, qid) => {
    const newAns = await answersModel.create(answer);
    const updateQuestion = await questionsModel.findByIdAndUpdate(qid, {$push: {answers: newAns._id}}, {new: true});
    return {newAns, updateQuestion};
}
const findAllAnswers = async() => await answersModel.find({});

const upvoteAnswer = async(aid) => await answersModel.findOneAndUpdate({_id: aid}, {$inc: {votes: 1}}, {new: true});

const downvoteAnswer = async(aid) => await answersModel.findOneAndUpdate({_id: aid}, {$inc: {votes: -1}}, {new: true});

const acceptAnswer = async(aid, accept) => await answersModel.findOneAndUpdate({_id: aid}, {accept: accept}, {new: true});

const removeAnswerAcceptance = async(aid) => await answersModel.findOneAndUpdate({_id: aid}, {accept: false}, {new: true});

module.exports = { createAnswersAndUpdateQuestion, findAllAnswers, upvoteAnswer, downvoteAnswer, acceptAnswer,  removeAnswerAcceptance};
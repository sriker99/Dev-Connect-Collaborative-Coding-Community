let answersModel = require('../models/answers.js');
let questionsModel = require('../models/questions.js');
let commentsModel = require('../models/comments.js');


const createAnswersAndUpdateQuestion = async(answer, qid) => {
    const currentTime = new Date()
    const newAns = await answersModel.create(answer);
    const updateQuestion = await questionsModel.findByIdAndUpdate(qid, {$push: {answers: newAns._id}, $set: { active_order: currentTime }}, {new: true});
    return {newAns, updateQuestion};
}
const findAllAnswers = async() => await answersModel.find({});

const upvoteAnswer = async(qid, aid) => {
    const currentTime = new Date();
    await questionsModel.findOneAndUpdate({_id: qid}, {$set: { active_order: currentTime }}, {new: true});
    return await answersModel.findOneAndUpdate({_id: aid}, {$inc: {votes: 1}}, {new: true});
}

const downvoteAnswer = async(qid, aid) => {
    const currentTime = new Date();
    await questionsModel.findOneAndUpdate({_id: qid}, {$set: { active_order: currentTime }}, {new: true});
    return await answersModel.findOneAndUpdate({_id: aid}, {$inc: {votes: -1}}, {new: true});
}

const acceptAnswer = async(aid, accept) => await answersModel.findOneAndUpdate({_id: aid}, {accept: accept}, {new: true});

const removeAnswerAcceptance = async(aid) => await answersModel.findOneAndUpdate({_id: aid}, {accept: false}, {new: true});

const deleteAnswerById = async(aid) => {
    try {
        const answer = await answersModel.findOne({_id: aid});
 
        if (!answer) {
            console.log("Answer not found");
            return;
        }
        // Delete comments associated with the answer
        await commentsModel.deleteMany({ _id: { $in: answer.comments } });
 
        // Delete tags associated with the question's qid
        const deletedAnswer = await answersModel.findByIdAndRemove(aid);
        console.log("Question and related data deleted:", deletedAnswer);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

const updateAnswerText = async(aid, newText) => {
    try {
        const updatedAnswer = await answersModel.findByIdAndUpdate(
            aid,
            { text: newText },
            { new: true }
        );

        if (!updatedAnswer) {
            console.log("Answer not found");
            return;
        }

        console.log("Answer updated:", updatedAnswer);
    } catch (error) {
        console.error("Error updating answer:", error);
    }
}

module.exports = { createAnswersAndUpdateQuestion, findAllAnswers, upvoteAnswer, downvoteAnswer, acceptAnswer,  removeAnswerAcceptance, deleteAnswerById, updateAnswerText};
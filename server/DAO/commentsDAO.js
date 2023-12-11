let commentModel = require("../models/comments.js");
let answerModel = require("../models/answers.js");
let questionModel = require("../models/questions.js");

const getQuestionCommentsByQID = async(qid) => {
    let question = await questionModel.findById(qid).populate('comments').exec();
    return question.comments;
}

const getAnswerCommentsByQID = async(qid) => {
    let question = await questionModel.findById(qid)
                            .populate({
                                path: 'answers',
                                populate: {
                                    path: 'comments'
                                }
                            }).exec();
    const answers = question.answers;
    const commentsByAnswer = answers.reduce((acc, answer) => {
        acc[answer._id] = answer.comments;
        return acc;
    }, {});
    return commentsByAnswer;
}

const addCommentsToQuestion = async(qid, comment) => {
    try {
        const newComment = await commentModel.create(comment);
    
        const updatedQuestion = await questionModel.findByIdAndUpdate(
          qid,
          { $push: { comments: newComment._id } },
          { new: true }
        );
        return { updatedQuestion, newComment };
      } catch (error) {
        throw new Error('Error adding comment and updating question: ' + error.message);
      }
} 

const addCommentsToAnswer = async(aid, comment) => {
    try {
        const newComment = await commentModel.create(comment);
        const updatedAnswer = await answerModel.findByIdAndUpdate(
          aid,
          { $push: { comments: newComment._id } },
          { new: true }
        );
        return { updatedAnswer, newComment };
      } catch (error) {
        throw new Error('Error adding comment and updating answer: ' + error.message);
      }
} 

const updateCommentsVote = async(qid, commentID) => {
    try {
        // Increment votes in the comments model by 1
        const currentTime = new Date();
        await questionModel.findOneAndUpdate({_id: qid}, {$set: { active_order: currentTime }}, {new: true});
        const updatedComment = await commentModel.findByIdAndUpdate(
          commentID,
          { $inc: { votes: 1 } },
          { new: true }
        );
        return updatedComment;
      } catch (error) {
        throw new Error('Error incrementing comment votes: ' + error.message);
      }
}

module.exports = {getQuestionCommentsByQID, getAnswerCommentsByQID, addCommentsToQuestion, addCommentsToAnswer, updateCommentsVote}
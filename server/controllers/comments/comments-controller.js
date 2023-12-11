var {getQuestionCommentsByQID, getAnswerCommentsByQID, addCommentsToQuestion, addCommentsToAnswer, updateCommentsVote} = require('../../DAO/commentsDAO.js');

const CommentsController = (app) => {
    app.get('/api/comments/getComments/:qid', fetchComments);
    app.put('/api/comments/updateVotes/:cid',updateVotes);
    app.post('/api/comments/addQcomments/:qid', addQComments);
    app.post('/api/comments/addAcomments/:aid', addAComments);
    // app.post('/api/createAcomments', add);
    // app.put('/api/questions/:qid', updateQuestionViews);
    // app.put('/api/questions/:qid/votes', updateQuestionVotes);
 }
 
const fetchComments = async (req, res) => {
    const { qid } = req.params;
    let questionComments = await getQuestionCommentsByQID(qid);
    let answerComments = await getAnswerCommentsByQID(qid);
    questionComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    Object.entries(answerComments).forEach(([key, value]) => {
        console.log(key);
        value.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    const response = {
        question : questionComments, 
        answers : answerComments
    }
    res.send(response);
}

const updateVotes = async (req, res) => {
    const { cid } = req.params;
    const {qid} = req.body;
    const updatedComment = await updateCommentsVote(qid, cid);
    res.send(updatedComment);
}

const addQComments = async (req, res) => {
    const { qid } = req.params;
    const clientNewComment = req.body;
    const {newComment} = await addCommentsToQuestion(qid, clientNewComment);
    res.send(newComment);
}

const addAComments = async (req, res) => {
    const { aid } = req.params;
    const clientNewComment = req.body;
    const {updatedAnswer, newComment} = await addCommentsToAnswer(aid, clientNewComment);
    const response = {
        aid: updatedAnswer._id,
        comment: newComment
    }
    res.send(response);
}
module.exports =  {CommentsController};

import { createSlice, current } from "@reduxjs/toolkit";
import {fetchComments, updateVotes, addCommentsToQuestion, addCommentsToAnswer} from "../thunks/comments-thunks.js";

const initialState = {
    question : [],
    answers : []
}

const dataSlice = createSlice ({
    name: 'commentsReducer',
    initialState: initialState,
    extraReducers: {
        [fetchComments.fulfilled]: (state, {payload}) => {
            const {answers, question} = payload;
            return {...state, question: question, answers: answers};
        },
        [updateVotes.fulfilled]: (state, {payload}) => {
            const updatedComment = payload;
            const { question, answers } = current(state);
            const updatedQuestion = question.map(comment => {
                if (comment._id === updatedComment._id) {
                    const newDate = new Date().toString();
                    return {
                        ...comment,
                        votes: updatedComment.votes,
                        active_order: newDate
                    };
                }
                return comment;
            });
            console.log("updated question", updatedQuestion);
            const updatedAnswers = {};
            for (const key in answers) {
                if (Object.prototype.hasOwnProperty.call(answers, key)) {
                    const updatedComments = answers[key].map(comment => {
                        if (comment._id === updatedComment._id) {
                            return {
                                ...comment,
                                votes: updatedComment.votes
                            };
                        }
                        return comment;
                    });
        
                    updatedAnswers[key] = updatedComments;
                }
            }
            const newState = {
                ...state,
                question: updatedQuestion,
                answers: updatedAnswers
            };
            
            return newState;
            
        },
        [addCommentsToQuestion.fulfilled]: (state, {payload}) => {
            const newComment = payload;
            const { question} = current(state);
            const updatedQuestion = [newComment, ...question];
            const newState = {
                ...state,
                question: updatedQuestion
            };
            return newState;
            
        },
        [addCommentsToAnswer.fulfilled]: (state, {payload}) => {
            const {aid, comment} = payload;
            console.log("payload", payload);
            const { answers } = current(state);
            // let newAnswers = answers

            // newAnswers[aid] = [newComment, ...newAnswers[aid]]
            // console.log("answers in reducer", newAnswers);
            const updatedAnswers = {
                ...answers,
                [aid]: [comment, ...(answers[aid] || [])]
            };

            const newState = {
                ...state,
                answers: updatedAnswers
            };
            console.log("new state", newState);
            return newState;
            
        }
    }
})

export default dataSlice.reducer;
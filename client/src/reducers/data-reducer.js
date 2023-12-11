import { createSlice, current } from "@reduxjs/toolkit";
import { createQuestionThunk, findQuestionByIdThunk, findQuestionThunk, updateQuestionThunk, updateQuestionVoteThunk } from "../thunks/question-thunks.js";
import { createTagThunk, findTagThunk } from "../thunks/tag-thunks.js";
import { createAnswerThunk, findAnswerThunk, updateAnswerAcceptedThunk, updateAnswerVoteThunk } from "../thunks/answer-thunks.js";

const initialState = {
    questions: [],
    answers: [],
    tags: []
}

const dataSlice = createSlice ({
    name: 'data',
    initialState: initialState,
    extraReducers: {
        [createQuestionThunk.fulfilled]: (state, {payload}) => {
            const {question, tags} = payload;
            const updatedQuestions = [...state.questions, question];

            return { ...state, questions: updatedQuestions, tags: tags};
        },
        [findQuestionThunk.fulfilled]: (state, { payload }) => {
                state.questions = payload;
        },
        [findQuestionByIdThunk.fulfilled]: (state, {payload}) => {
            const updatedQuestions = state.questions.map(question => {
                if (question.qid === payload.qid) {
                    return payload;
                }
                return question;
            });
            state.questions = updatedQuestions;
        },
        [updateQuestionThunk.fulfilled]: (state, {payload}) => {
            const updatedQuestions = state.questions.map(question => {
                if (question.qid === payload.qid) {
                    return payload;
                }
                return question;
            });
           return {...state, questions: updatedQuestions};
        },
        [updateQuestionVoteThunk.fulfilled]: (state, {payload}) => {
            const updatedQuestions = state.questions.map(question => {
                if (question.qid === payload.qid) {
                    return payload;
                }
                return question;
            });
           return {...state, questions: updatedQuestions};
        },
        [createTagThunk.fulfilled]: (state, {payload}) => {
            const updatedTags = [...state.tags, payload];
            return {...state, tags: updatedTags};
        },
        [findTagThunk.fulfilled]: (state, { payload }) => {
            state.tags = payload;
        },
        [createAnswerThunk.fulfilled]: (state, {payload}) => {
            const {answer, questions} = payload;
            const updatedAnswers = [...state.answers, answer];
            const updatedQuestions = state.questions.map(element => {
                if(element.qid === questions.qid) {
                    return questions;
                }
                return element;
            });
            return {...state, questions: updatedQuestions, answers: updatedAnswers}
        },
        [findAnswerThunk.fulfilled]: (state, { payload }) => {
            state.answers = payload;
        },
        [updateAnswerVoteThunk.fulfilled]: (state, { payload }) => {
            console.log("in reducer", payload, payload.qid, current(state.questions));
            const updatedAnswers = state.answers.map(answer => {
                if (answer.aid === payload.answer.aid) {
                    return payload.answer;
                }
                return answer;
            });
            const updatedQuestions = state.questions.map(question => {
                if (question.qid === payload.qid) {
                    const activeOrder = new Date().toString();
                    console.log("hiay");
                    return{...question, active_order: activeOrder}
                }
                return question;
            }) 
            console.log('in reducer', {...state, answers: updatedAnswers, questions: updatedQuestions});
           return {...state, answers: updatedAnswers, questions: updatedQuestions};
        },
        [updateAnswerAcceptedThunk.fulfilled]: (state, { payload }) => {
            const updatedAnswers = payload;
           return {...state, answers: updatedAnswers};
        }
    },
    reducers: {
        addQuestion(state, action) {
            const updatedQuestions = [...state.questions, action.payload];
            const updatedData = {...state, questions: updatedQuestions};
            return updatedData;
        },
        updateQuestion(state, action) {
            const updatedQuestions = state.questions.map(question => {
                if (question.qid === action.payload.qid) {
                    return action.payload;
                }
                return question;
            });
           return {...state, questions: updatedQuestions};
        },
        addAnswer(state, action) {
            const { newAnswer, question} = action.payload;
            const updatedAnswers = [...state.answers, newAnswer];
            const updatedQuestions = state.questions.map(q => {
                if (question.qid === q.qid) {
                 return {
                    ...q,
                    ansIds: [...q.ansIds, newAnswer.aid]
                 };
                }
                return q;
              });

            const updatedState = {
                ...state, 
                questions: updatedQuestions,
                answers: updatedAnswers};
            return updatedState;
        },
        addTag(state, action) {
            const newTag = action.payload;
            const updatedTags = [...state.tags, newTag];
            return {
                ...state,
                tags: updatedTags,
            }
        },
        addTags(state, action) {
            const newTags = action.payload;
            const updatedTags = [...state.tags, ...newTags];
            return {
                ...state,
                tags: updatedTags,
            }
        },
        incrementViews(state, action) {
            const question = action.payload;
            const updatedQuestions = state.questions.map(q => {
                if (question.qid === q.qid) {
                 return {
                    ...q,
                    views: question.views,
                 };
                }
                return q;
        });

        return {...state, questions: updatedQuestions};
    }
}
})

export const { addQuestion, addAnswer, addTag, addTags, incrementViews, updateQuestion } = dataSlice.actions;
export default dataSlice.reducer;
  
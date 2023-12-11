import { createSlice } from "@reduxjs/toolkit";

const initialNavBar = {
    user: true,
    questions : false,
    answers: false,
    tags : false,
    questionForm: false,
    questionObj: null,
    answerForm: false,
    answerObj: null,
}

const dataSlice = createSlice ({
    name: 'profilenNavReducer',
    initialState: initialNavBar,
    reducers: {
        updateProfileNavState(state, action) {
            switch(action.payload.pageStatus){
                case 'user':
                    return {...state, user: true, questions : false, answers: false, tags : false, questionForm: false, questionObj: null, answerForm: false, answerObj: null};
                case 'questions':
                    return {...state, user: false, questions : true, answers: false, tags : false, questionForm: false, questionObj: null, answerForm: false, answerObj: null};
                case 'answers':
                    return {...state, user: false, questions : false, answers: true, tags : false, questionForm: false, questionObj: null, answerForm: false, answerObj: null};
                case 'tags':
                    return {...state, user: false, questions : false, answers: false, tags : true, questionForm: false, questionObj: null, answerForm: false, answerObj: null};
                case 'updateQuestionForm':
                    return {...state, user: false, questions : true, answers: false, tags : false, questionForm: true, questionObj: action.payload.questionObj, answerForm: false, answerObj: null};
                case 'updateAnswerForm':
                    return {...state, user: false, questions : false, answers: true, tags : false, questionForm: false, questionObj: null, answerForm: true, answerObj: action.payload.answerObj};
                default:
                    return {...state, user: true, questions : false, answers: false, tags : false, questionForm: false, questionObj: null, answerForm: false, answerObj: null};
            }
        }
    }
}
)

export const { updateProfileNavState } = dataSlice.actions;
export default dataSlice.reducer;
  
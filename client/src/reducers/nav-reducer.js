import { createSlice } from "@reduxjs/toolkit";

const initialNavBar = {
    questions : true,
    tags : false,
    questionForm : false,
    answerPage : false,
    questionObj : null,
    specificTagPage : false,
    searchPage : false,
    searchQuesObj : null,
    tagId : ''
}

const dataSlice = createSlice ({
    name: 'navReducer',
    initialState: initialNavBar,
    reducers: {
        updateNavState(state, action) {
            switch(action.payload.pageStatus){
                case 'questions':
                    return {...state, questions : true, tags : false, questionForm : false, answerPage: false, questionObj: null, specificTagPage: false, tagId: '', searchPage: false, searchQuesObj: null};
                case 'tags':
                    return {...state, questions : false, tags : true, questionForm : false, answerPage: false, questionObj: null, specificTagPage: false, tagId: '', searchPage: false, searchQuesObj: null};
                case 'questionForm':
                    return {...state, questions : true, tags : false, questionForm : true, answerPage: false, questionObj: null, specificTagPage: false, tagId: '', searchPage: false, searchQuesObj: null};
                case 'answerPage':
                    return {...state, questions : true, tags : false, questionForm : false, answerPage: true, questionObj: action.payload.questionObj, specificTagPage: false, tagId: '', searchPage: false, searchQuesObj: null};
                case 'specificTagPage':
                    return {...state, questions : true, tags : false, questionForm : false, answerPage: false, questionObj: null, specificTagPage: true, tagId: action.payload.tagId, searchPage: false, searchQuesObj: null};
                case 'searchPage':
                    return {...state, questions : true, tags : false, questionForm : false, answerPage: false, questionObj: null, specificTagPage: false, tagId: '', searchPage: true, searchQuesObj: action.payload.searchQuesObj};
                default :
                    return {...state, questions : true, tags : false, questionForm : false, answerPage: false, questionObj: null, specificTagPage: false, tagId: '', searchPage: false, searchQuesObj: null};
            }
        }
    }
}
)

export const { updateNavState } = dataSlice.actions;
export default dataSlice.reducer;
  
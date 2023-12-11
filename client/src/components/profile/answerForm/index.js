import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer, editAnswer } from '../../../services/answer-service';
import { findQuestionThunk } from "../../../thunks/question-thunks"
import { findTagThunk } from "../../../thunks/tag-thunks";
import { findAnswerThunk } from "../../../thunks/answer-thunks";
import './index.css';

const validateParameters = (input) => {
    
    const errors = {};
 
    // if(input.username.trim() === '') {
    //     errors.username = "Empty username: 'Username cannot be empty'";
    // }
    
    if(input.answer.trim() === '') {
        errors.answer = "Empty text: 'Answer text cannot be empty'";
    }
 
    const pattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    input.answer.replace(pattern, (match, sourceName, link) => {
      if(link.substr(0,8) !== 'https://' || link.trim() === '' || sourceName.trim() === '') {
        errors.answer = "Invalid hyperlink constraints";
      }
    });
 
    return errors;
}

const AnswerForm = () => {
    const dispatch = useDispatch();
    const answer = useSelector(state => state.profileNavReducer.answerObj);
    const [input, setInput] = useState({
        answer: answer.text,
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleDelete = (aid) => {
        deleteAnswer(aid).then((data) => {
          
          dispatch(findTagThunk());
          dispatch(findAnswerThunk());
          dispatch(findQuestionThunk()); 
        });
    }
  
    const handleEdit = (aid) => {
        const errors = validateParameters(input);
        if(Object.keys(errors).length === 0) {
            editAnswer(aid, {text: input.answer}).then((data) => {
            dispatch(findTagThunk());
            dispatch(findAnswerThunk());
            dispatch(findQuestionThunk()); 
            });
        } else {
            setErrors(errors);
        }
    }

    return(
        <div>
            <form id="profileanswerForm">
                <label id="answerLabel" htmlFor="answer">Edit Answer Text*</label><br/><br/>
                <input type="text"
                    id="answerTextInput"
                    name="answer"
                    placeholder="Enter answer"
                    value= {input.answer}
                    onChange={handleChange} />
                {errors.answer && <p style={{color: "red"}}>{errors.answer}</p>}<br /><br />
                <div style={{display: "flex"}}>
                    <p style={{color: "red", display: "inline"}}> * indicates mandatory fields</p>
                    <button id="profileEditAnswer" onClick={() => handleEdit(answer.aid)}>Edit</button>
                    <button id="profileDeleteAnswer" onClick={() => handleDelete(answer.aid)}>Delete</button>
                </div>
            </form>
        </div>
    );
}
    

export default AnswerForm;
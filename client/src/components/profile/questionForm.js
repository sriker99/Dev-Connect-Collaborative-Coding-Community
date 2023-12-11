import React, { useState } from 'react'; 
import './questionForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { deleteQuestion, editQuestion } from '../../services/question-service.js';
import { findQuestionThunk } from "../../thunks/question-thunks";
import { findTagThunk } from "../../thunks/tag-thunks";
import { findAnswerThunk } from "../../thunks/answer-thunks";


const QuestionForm = () => {
    const { user } = useAuthContext();
    const data = useSelector(state => state.data);
    // const [page, setPage] = useState('questionForm');
    const dispatch = useDispatch();
    const question = useSelector(state => state.profileNavReducer.questionObj);
    const tags = data.tags;
    console.log('form question tags', question);
    const questionTags = question.tagIds.map(tagId => {
        return tags.find(tag => tag.tid === tagId).name;
      });
      
    const tagNamesForQuestion = questionTags.join(' ');
    const [input, setInput] = useState({
        title: question.title,
        text: question.text,
        tags: tagNamesForQuestion,
    });
    const [errors, setErrors] = useState({});
    // const clearForm = () => {
    //   setInput({
    //     title: '',
    //     text: '',
    //     tags: '',
    //   });
    //   setErrors({});
    // };

  //   const questionFormPageStatus = {
  //     pageStatus: 'questions'
  // }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    };

    const handleDelete = (qid) => {
      deleteQuestion(qid).then((data) => {
        dispatch(findTagThunk());
        dispatch(findAnswerThunk());
        dispatch(findQuestionThunk()); 
      });
    }

    const handleEdit = (qid) => {
      const errors = validateParameters(input);
      if(user.reputation < 50){
        setErrors("user reputation is less than 50");
      }
      else if(Object.keys(errors).length === 0) {
        editQuestion(qid, {...input, tags: input.tags.split(' ')}).then((data) => {
          dispatch(findTagThunk());
          dispatch(findAnswerThunk());
          dispatch(findQuestionThunk()); 
        });
      } else {
          setErrors(errors);
      }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const errors = validateParameters(input);

    //     if(Object.keys(errors).length === 0) {
    //         const newQuestion = createQuestion(input, user.username);
    //         dispatch(createQuestionThunk(newQuestion));
    //         clearForm();
    //         dispatch(updateNavState(questionFormPageStatus));
    //         setPage('homepage');
           
    //     } else {
    //         setErrors(errors);
    //     }
    // };

    const questionForm = 
    <div>
      <form id="profilequestionForm">
          <label htmlFor="title">Edit Question Title*</label>
          <p id="profiletitleNote"><i>Limit title to 100 characters or less</i></p>
          <input id="profileformTitleInput" 
              name="title" 
              placeholder="Enter title" 
              value={input.title} 
              onChange={handleChange} 
              />
          {errors.title && <p style={{color: "red"}}>{errors.title}</p>}
          <br/><br/>
          <label htmlFor="text">Edit Question Text*</label>
          <p id="textNote"><i>Add details</i></p>
          <input id="profileformTextInput" 
              name="text" 
              placeholder="Enter question" 
              value={input.text}
              onChange={handleChange}
              />
          {errors.text && <p style={{color: "red"}}>{errors.text}</p>}
          <br/><br/>
          <label htmlFor="tags">Edit Tags*</label>
          <p id="tagInfo"><i>Add keywords separated by whitespace</i></p>
          <input id="profileformTagInput" 
              name="tags" 
              placeholder="Enter tags" 
              value={input.tags}
              onChange={handleChange}
              />
          {errors.tags && <p style={{color: "red"}}>{errors.tags}</p>}
          <br/><br/>
          {/* <label htmlFor="username">Username*</label><br/><br/>
          <input id="formUsernameInput" 
              name="username" 
              placeholder={user.username}
              value={user.username}
              onChange={handleChange}
              />
          <br/><br/> */}
          <div style={{ display: 'flex' }}>
             <p style={{ color: 'red', display: 'inline' }}>* indicates mandatory fields</p>
              <button id="profileEditQuestion" onClick={() => handleEdit(question.qid)}>Edit</button>
              <button id="profileDeleteQuestion" onClick={() => handleDelete(question.qid)}>Delete</button>
              {/* <p style={{ color: 'red', display: 'inline' }}>* indicates mandatory fields</p> */}
          </div>
      </form>
  </div>

    return (
      <div>
        {questionForm}
        {/* {page === 'questionForm' && questionForm}
        {page === 'homepage' && <HomePage />} */}

      </div>
    );
};


const validateParameters = (input) => {

    const errors = {};
  
    if(input.title.trim() === '') {
      errors.title = "Empty title: 'Title cannot be empty'";
    } else if(input.title.length > 100) {
      errors.title = "Long title: 'Title cannot be more than 100 characters'";
    }

    if(input.text.trim() === '') {
      errors.text = "Empty text: 'Question text cannot be empty'";
    }

    const pattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    input.text.replace(pattern, (match, sourceName, link) => {
      if(link.substr(0,8) !== 'https://' || link.trim() === '' || sourceName.trim() === '') {
        errors.text = "Invalid hyperlink";
      }
    });
  
    const tagList = input.tags.split(' ');
    tagList.forEach((tag) => {
      if(tag.length > 20) {
        errors.tags = "Long tag: 'New tag length cannot be more than 20'";
      }
    });
  
    if(tagList.length > 5) {
      errors.tags = "Extra tags: 'Cannot have more than 5 tags'";
    }
  
    // if(input.username.trim() === '') {
    //   errors.username = "Empty username: 'Username cannot be empty'";
    // }
  
    return errors;
}


export default QuestionForm;

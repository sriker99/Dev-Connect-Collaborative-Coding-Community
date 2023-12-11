import React, { useState } from 'react'; 
import './index.css';
import { useDispatch } from 'react-redux';
import { updateNavState } from '../../reducers/nav-reducer.js';
import HomePage from '../FaceStackOverFlow/homepage/index.js';
import { createQuestionThunk } from '../../thunks/question-thunks';
import { useAuthContext } from '../../hooks/useAuthContext.js';

const QuestionForm = () => {
    const { user } = useAuthContext();
    const [page, setPage] = useState('questionForm');
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        title: '',
        text: '',
        tags: '',
    });
    const [errors, setErrors] = useState({});
    const clearForm = () => {
      setInput({
        title: '',
        text: '',
        tags: '',
      });
      setErrors({});
    };

    const questionFormPageStatus = {
      pageStatus: 'questions'
  }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateParameters(user.reputation, input);

        if(Object.keys(errors).length === 0) {
            const newQuestion = createQuestion(input, user.username);
            dispatch(createQuestionThunk(newQuestion));
            clearForm();
            dispatch(updateNavState(questionFormPageStatus));
            setPage('homepage');
           
        } else {
            setErrors(errors);
        }
    };

    const questionForm = 
    <div>
      <form id="questionForm" onSubmit={handleSubmit}>
          <label htmlFor="title">Question Title*</label>
          <p id="titleNote"><i>Limit title to 100 characters or less</i></p>
          <input id="formTitleInput" 
              name="title" 
              placeholder="Enter title" 
              value={input.title} 
              onChange={handleChange} 
              />
          {errors.title && <p style={{color: "red"}}>{errors.title}</p>}
          <br/><br/>
          <label htmlFor="text">Question Text*</label>
          <p id="textNote"><i>Add details</i></p>
          <input id="formTextInput" 
              name="text" 
              placeholder="Enter question" 
              value={input.text}
              onChange={handleChange}
              />
          {errors.text && <p style={{color: "red"}}>{errors.text}</p>}
          <br/><br/>
          <label htmlFor="tags">Tags*</label>
          <p id="tagInfo"><i>Add keywords separated by whitespace</i></p>
          <input id="formTagInput" 
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
              <button id="postQuestion" type="submit">Post Question</button>
              <p style={{ color: 'red', display: 'inline' }}>* indicates mandatory fields</p>
          </div>
      </form>
  </div>

    return (
      <div>
        {page === 'questionForm' && questionForm}
        {page === 'homepage' && <HomePage />}

      </div>
    );
};


const validateParameters = (user, input) => {
    const errors = {};
    console.log("user", user);

    
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
    
    if(user < 50){
      errors.tags = "user reputation is less than 50";
    }
    // if(input.username.trim() === '') {
    //   errors.username = "Empty username: 'Username cannot be empty'";
    // }
  
    return errors;
}


const createQuestion = (input, username) => {

    console.log("creatinggg question",username);
    const pattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    const formattedText = input.text.replace(pattern, (match, sourceName, link) => {
      return `<a href="${link}" target="_blank">${sourceName}</a>`
    });

    const listInputTags = input.tags.split(' ');
    return {
        title: input.title.trim(),
        text: formattedText.trim(),
        tagIds: listInputTags,
        askedBy: username.trim(),
        askDate: new Date().toString(),
        ansIds: [],
        views: 0,
      };

}

export default QuestionForm;

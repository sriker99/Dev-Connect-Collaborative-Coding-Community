
import React from 'react';
import './index.css';
import Navbar from "./navbar";
import { useSelector } from 'react-redux';
import ProfileData from './profileData';
import { QuestionsList } from '../FaceStackOverFlow/QuestionList';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import QuestionForm from './questionForm';
import DisplayAnswers from './answerList';
import AnswerForm from './answerForm';


function Profile(){

  const navState = useSelector(state => state.profileNavReducer);
  let questions = useSelector(state => state.data.questions);
  let tags = useSelector(state => state.data.tags);
  let answers = useSelector(state => state.data.answers);
    console.log("answers in profile", answers);
  const { user } = useAuthContext();
//   console.log('before profile questiond', questions);
  questions = questions.filter(question => question.askedBy === user.username);
  answers = answers.filter(answer => answer.ansBy === user.username);
  const questionsWithTagObjects = questions.map(question => {
    const questionTags = question.tagIds.map(tagId => {
      return tags.find(tag => tag.tid === tagId);
    });
    
    return questionTags;
  });
  console.log(navState);
//   console.log('user tags', questionsWithTagObjects);
//   console.log('after profile questiond', questions);
  return(
    <div>
        <div id="home-container">
          <Navbar/>
          {navState.user && <ProfileData/>}
          {navState.questions && navState.questionForm ? <QuestionForm/> : navState.questions && <QuestionsList questions={questions} tags={questionsWithTagObjects} />}
          {navState.answers && navState.answerForm ? <AnswerForm/>: navState.answers && <DisplayAnswers answers={answers}/>}
          {navState.tags && (<div>Tags</div>)}
          {/* {navState.questionForm && (<div> questionFOrm</div>)} */}
        </div>
    </div>
  );
}

export default Profile;
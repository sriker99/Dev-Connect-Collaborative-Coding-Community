import React from 'react';
import './index.css'; // Import your CSS file for styling
import { formatQuestionMetadata } from '../../FaceStackOverFlow/QuestionList';
import { useDispatch } from 'react-redux';
import { updateProfileNavState } from '../../../reducers/profile-nav-reducer';

const DisplayAnswers = ({ answers }) => {
  const sortedAnswers = answers.sort((a, b) => new Date(b.ansDate) - new Date(a.ansDate));
  const dispatch = useDispatch();
  const handleClick = (answer) => {
    const updateState = {
        pageStatus: 'updateAnswerForm',
        answerObj: answer
    }
    dispatch(updateProfileNavState(updateState));
  }

  return (
    <div className="answers-container">
      <h3>Answers:</h3>
      <ul className="answers-list">
        {sortedAnswers.map((answer, index) => (
          <li key={index} className="answer-item">
            <div className="answer-content">
                <div className="answer-link" onClick={() => handleClick(answer)}>
                    {answer.text.slice(0, 50)}
                 </div>
              <span className="answer-date">{new Date(answer.ansDate).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAnswers;

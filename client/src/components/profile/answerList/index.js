import React from 'react';
import './index.css'; // Import your CSS file for styling
import { useDispatch } from 'react-redux';
import { updateProfileNavState } from '../../../reducers/profile-nav-reducer';
import { useAuthContext } from '../../../hooks/useAuthContext';

const formatQuestionMetadata = (username, postDate) => {
  const currentDate = new Date();
  const postDateTime = new Date(postDate);
  const timeDifference = currentDate - postDateTime;

  if (timeDifference < 60 * 1000) {
      return `${username} asked 0 seconds ago`;
  } else if (timeDifference < 60 * 60 * 1000) {
      const minutesAgo = Math.floor(timeDifference / (60 * 1000));
      return `${username} asked ${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
      return `${username} asked ${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
      const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
      return `${username} asked ${postDateTime.toLocaleDateString('en-US', options)}`;
  } else {
      const options = { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      return `${username} asked ${postDateTime.toLocaleDateString('en-US', options)}`;
  }
}

const DisplayAnswers = ({ answers }) => {
  const sortedAnswers = answers.sort((a, b) => new Date(b.ansDate) - new Date(a.ansDate));
  const{user} = useAuthContext();
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
              <span className="answer-date">{ formatQuestionMetadata(user.username, answer.ansDate)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAnswers;

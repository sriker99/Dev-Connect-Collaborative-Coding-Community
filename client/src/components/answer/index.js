import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionForm from '../question';
import { formatQuestionMetadata } from '../FaceStackOverFlow/QuestionList';
import './index.css';
import { createAnswerThunk, updateAnswerVoteThunk } from '../../thunks/answer-thunks';
import { findQuestionByIdThunk, updateQuestionThunk, updateQuestionVoteThunk } from '../../thunks/question-thunks';
import { useAuthContext } from '../../hooks/useAuthContext';

const AnswerPage = ({question}) => {
    const { loggedIn, user} = useAuthContext();
    const data = useSelector(state => state.data); 
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        answer: '',
    });
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState('questionInfo');

    useEffect(() => {
        dispatch(findQuestionByIdThunk(question.qid));
        dispatch(updateQuestionThunk(question.qid));
    }, [dispatch, question.qid]);

    const questionFromData = data.questions.find(q => q.qid === question.qid);
    question = {...questionFromData}
  
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const clearForm = () => {
        setInput({
          answer: '',
        });
        setErrors({});
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateParameters(input);
        console.log(errors);
        if(Object.keys(errors).length === 0) {
            const newAnswer = createAnswer(input, data, user);
            dispatch(createAnswerThunk({answer: newAnswer, qid: question.qid}));
            clearForm();
            setPage('questionInfo');
            
        } else {
            setErrors(errors);
        }

    }

    const askDetails = formatQuestionMetadata(question.askedBy, question.askDate);
    const str = "asked";
    const askedBy = askDetails.substring(0, askDetails.indexOf(str));
    const askDate = askDetails.substring(askDetails.indexOf(str)+str.length, askDetails.length)

    question.ansIds = question.ansIds.map(id => data.answers.find(a => a.aid === id))
    .sort((a, b) => new Date(b.ansDate) - new Date(a.ansDate))
    .map(answer => answer.aid);

    const [currentPage, setCurrentPage] = useState(1);
    const answersPerPage = 5;
    const indexOfLastAnswer= currentPage * answersPerPage;
    const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
    const currentSetOfAnswersForQuestion = question.ansIds.slice(indexOfFirstAnswer, indexOfLastAnswer);
    const totalPages = Math.ceil(question.ansIds.length / answersPerPage);
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const handleQuestionUpvote = () => {
        dispatch(updateQuestionVoteThunk({qid: question.qid, isIncrement: true}));
    }
    const handleQuestionDownvote = () => {
        dispatch(updateQuestionVoteThunk({qid: question.qid, isIncrement: false}));
    }

    const handleAnswerUpvote = (aid) => {
        dispatch(updateAnswerVoteThunk({aid: aid, isIncrement: true}));
    }
    const handleAnswerDownvote = (aid) => {
        dispatch(updateAnswerVoteThunk({aid: aid, isIncrement: false}));
    }

    const questionAnswerInfo = 
    <div id="answerContainer"> 
        <div id="answersHeader">
            <h5>{question.ansIds.length} answers</h5>
            <h5>{question.title}</h5>
            { loggedIn && 
                <button id="ask-question" onClick={() => setPage('questionForm')}>Ask a Question</button>
            }
        </div>
        <div id="questionBody">
            <h5>{question.views} views</h5>
            <div dangerouslySetInnerHTML={{ __html: question.text }} />
            <div>
                <div id="multiline">
                    {askedBy}<br />asked {askDate}
                </div>
                <br/>
                <div id="arrowContainer">
                    <button className='arrow-up' onClick={handleQuestionUpvote}></button>
                    <button className='arrow-down' onClick={handleQuestionDownvote}></button>
                    <div>{question.votes}</div>
                </div>
            </div>
        </div>
        <div id="answerDetail">
            {currentSetOfAnswersForQuestion.map(answerId => {
        // Find the answer in the data
            const answer = data.answers.find(a => a.aid === answerId);

            const answerDetails = formatQuestionMetadata(answer.ansBy, answer.ansDate);
            const str = "asked";
            const ansBy = answerDetails.substring(0, answerDetails.indexOf(str));
            const ansDate = answerDetails.substring(answerDetails.indexOf(str)+str.length, answerDetails.length)

            // Create a new div for the answer
            return (
                <div id="answer-row" key={answer.aid}>
                    <div className="answerText" dangerouslySetInnerHTML={{ __html: answer.text }} />
                    <div className="answerAuthor">{ansBy}<br />answered {ansDate}</div>
                    <div id="arrowContainer">
                        <button className='arrow-up' onClick={() => handleAnswerUpvote(answer.aid)}></button>
                        <button className='arrow-down' onClick={() => handleAnswerDownvote(answer.aid)}></button>
                        <div>{answer.votes}</div>
                    </div>
                </div>
            );
        })}
            <div> 
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
        { loggedIn && 
            <button id="answer-question" onClick={() => setPage('answerForm')}>Answer Question</button>
        }
    </div>

    
    const answerForm = 
    <div>
        <form id="answerForm" onSubmit={handleSubmit}>
            {/* <label id="usernameLabel" htmlFor="username">Username*</label><br/><br/>
            <input type="text" 
                id="answerUsernameInput" 
                name="username"
                placeholder="Enter username"
                value= {user.username}
                onChange={handleChange} />
            <br /><br /> */}
            <label id="answerLabel" htmlFor="answer">Answer Text*</label><br/><br/>
            <input type="text" 
                id="answerTextInput"
                name="answer" 
                placeholder="Enter answer"
                value= {input.answer}
                onChange={handleChange} />
             {errors.answer && <p style={{color: "red"}}>{errors.answer}</p>}<br /><br />
            <div style={{display: "flex"}}>
                <button id="postAnswer" type="submit">Post Answer</button>
                <p style={{color: "red", display: "inline"}}> * indicates mandatory fields</p>
            </div>
        </form>
    </div>;
   
   return (
    <div>
        {page === 'questionInfo' && questionAnswerInfo}
        {loggedIn && 
            <>
            {page === 'questionForm' && <QuestionForm />}
            {page === 'answerForm' && answerForm}
            </>
        }
    </div>
   );

}

const createAnswer = (input, data, user) => {
    const pattern = /\[([^\]]*)\]\(([^)]*)\)/g;
    const formattedText = input.answer.replace(pattern, (match, sourceName, link) => {
        return `<a href="${link}" target="_blank">${sourceName}</a>`
      });
    return {
        text: formattedText,
        ansBy: user.username.trim(),
        ansDate: new Date().toString(),
    };
}

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

export default AnswerPage;
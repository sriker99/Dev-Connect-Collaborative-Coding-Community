import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionForm from '../question';
import { formatQuestionMetadata } from '../FaceStackOverFlow/QuestionList';
import './index.css';
import { createAnswerThunk, updateAnswerAcceptedThunk, updateAnswerVoteThunk } from '../../thunks/answer-thunks';
import { findQuestionByIdThunk, updateQuestionThunk, updateQuestionVoteThunk } from '../../thunks/question-thunks';
import { useAuthContext } from '../../hooks/useAuthContext';
import { checkAcceptAnswer, paginateAcceptedAnswers, paginatedAnswers } from '../../services/answer-service';
import { updateQuestion } from '../../reducers/data-reducer';
import { updateNavState } from "../../reducers/nav-reducer";
import CommentsSection from '../comments'

const extractAnswerComments = (aid, answerComments) => {
    return answerComments[aid];
}

const AnswerPage = ({question}) => {
    const commentType = {
        QUESTION : "question",
        ANSWER : "answer"
    }
    const { loggedIn, user} = useAuthContext();
    const data = useSelector(state => state.data); 
    const comments = useSelector(state => state.comments);
    const questionComments = comments.question;
    const answerComments = comments.answers;
    console.log('answer', answerComments);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        answer: '',
    });
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState('questionInfo');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentAcceptedPage, setCurrentAcceptedPage] = useState(1);
    const [currentSetOfAnswers, setCurrentSetOfAnswers] = useState([]);
    const answersPerPage = 5;
    const totalPages = Math.ceil(question.ansIds.length / answersPerPage);
    const [accept, setAccept] = useState(false);
    const [ansid, setAnsid] = useState('');

    const questionFromData = data.questions.find(q => q.qid === question.qid);
    question = {...questionFromData}

    console.log("IN ANSWER PAGE", user);

    useEffect(() => { 
        console.log("IN USEEFFECT");
        checkAcceptAnswer(question.qid).then((data) => {
            console.log(data);
            setAccept(data.accept);
            setAnsid(data.ansId);
            if(data.accept) {
                console.log("IN IF LOOOOP");
                paginateAcceptedAnswers(data.ansId, question.qid, currentAcceptedPage, answersPerPage).then((data) => {
                    console.log(data);
                    setCurrentSetOfAnswers(data);
            })} else {
                paginatedAnswers(question.qid, currentPage, answersPerPage).then((data) => {
                    setCurrentSetOfAnswers(data.answersPerPage);
            })
            }
        })
        dispatch(findQuestionByIdThunk(question.qid));
        dispatch(updateQuestionThunk(question.qid));
        console.log("re rendering answers");
    }, [dispatch, question.qid]);

    const handlePrevPage = useCallback(() => {
       
        if(accept) {
          paginateAcceptedAnswers(ansid, question.qid,  Math.max(currentAcceptedPage - 1, 1), answersPerPage).then((data) => {
              setCurrentSetOfAnswers(data);
          })} else {
              paginatedAnswers(question.qid,  Math.max(currentPage - 1, 1), answersPerPage).then((data) => {
              setCurrentSetOfAnswers(data.answersPerPage);
          })
        }
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        setCurrentAcceptedPage((prevAcceptedPage) =>  Math.max(prevAcceptedPage - 1, 1));
      }, [currentPage, currentAcceptedPage, ansid]);

    
    const handleNextPage = useCallback(() => {
        if(accept) {
            paginateAcceptedAnswers(ansid, question.qid, Math.min(currentAcceptedPage + 1, totalPages), answersPerPage).then((data) => {
                setCurrentSetOfAnswers(data);
            })} else {
                paginatedAnswers(question.qid, Math.min(currentPage + 1, totalPages), answersPerPage).then((data) => {
                setCurrentSetOfAnswers(data.answersPerPage);
            })
        }
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        setCurrentAcceptedPage((prevAcceptedPage) =>  Math.min(prevAcceptedPage + 1, totalPages));
    },[currentPage, currentAcceptedPage, ansid])

  
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

    const handleAcceptedAnswer = (aid) => {
        dispatch(updateAnswerAcceptedThunk({aid: aid, isAccepted: true}));
        if(accept) {
            paginateAcceptedAnswers(aid, question.qid,  Math.max(currentAcceptedPage - 1, 1), answersPerPage).then((data) => {
                setCurrentSetOfAnswers(data);
            })} else {
                paginatedAnswers(question.qid,  Math.max(currentPage - 1, 1), answersPerPage).then((data) => {
                setCurrentSetOfAnswers(data.answersPerPage);
            })
          }
        setAnsid(aid);
        setAccept(() => true);
    }

    //  question.ansIds = question.ansIds.map(id => data.answers.find(a => a.aid === id))
    // .sort((a, b) => new Date(b.ansDate) - new Date(a.ansDate))
    // .map(answer => answer.aid);
    
    // const [currentPage, setCurrentPage] = useState(1);
    // const answersPerPage = 5;
    // const indexOfLastAnswer= currentPage * answersPerPage;
    // const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
    // const currentSetOfAnswersForQuestion = question.ansIds.slice(indexOfFirstAnswer, indexOfLastAnswer);
    // const totalPages = Math.floor(question.ansIds.length / answersPerPage);
    // const handlePrevPage = () => {
    //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    //   setCurrentAcceptedPage((prevAcceptedPage) =>  Math.max(prevAcceptedPage - 1, 1));
    //   if(accept) {
    //     paginateAcceptedAnswers(ansid, question.qid, currentAcceptedPage, answersPerPage).then((data) => {
    //         setCurrentSetOfAnswers(data);
    //     })} else {
    //         paginatedAnswers(question.qid, currentPage, answersPerPage).then((data) => {
    //         setCurrentSetOfAnswers(data.answersPerPage);
    //     })
    //     }
    // };
    // const handleNextPage = () => {
    //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    //   setCurrentAcceptedPage((prevAcceptedPage) =>  Math.min(prevAcceptedPage + 1, totalPages));
    //   if(accept) {
    //     paginateAcceptedAnswers(ansid, question.qid, currentAcceptedPage, answersPerPage).then((data) => {
    //         setCurrentSetOfAnswers(data);
    //     })} else {
    //         paginatedAnswers(question.qid, currentPage, answersPerPage).then((data) => {
    //         setCurrentSetOfAnswers(data.answersPerPage);
    //     })
    //     }
    // };
    const tagButtons = question.tagIds.map((tid) => {
        const tag = data.tags.find((t) => t.tid === tid);
        const tagPayload = {
          pageStatus: 'specificTagPage',
          tagId: tid
        };
        return (
          (tag && <button key={`tag-${tag.tid}`} onClick={() => dispatch(updateNavState(tagPayload))}>
            {tag.name} 
          </button>)
        );
      });
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
        <div>
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
                <div className="home-tag-buttons">
                    {tagButtons}
                </div>
            </div>
            <CommentsSection qid={question.qid} aid={null} type={commentType.QUESTION} stateComments={questionComments}/> 
        </div>
        <div id="answerDetail">
            {currentSetOfAnswers.map(answer => {
            const answerDetails = formatQuestionMetadata(answer.ansBy, answer.ansDate);
            const str = "asked";
            const ansBy = answerDetails.substring(0, answerDetails.indexOf(str));
            const ansDate = answerDetails.substring(answerDetails.indexOf(str)+str.length, answerDetails.length)

            // Create a new div for the answer
            return (
                <div>
                    <div id="answer-row" key={answer.aid}>
                        <div className="answerText" dangerouslySetInnerHTML={{ __html: answer.text }} />
                        <div className="answerAuthor">{ansBy}<br />answered {ansDate}</div>
                        {loggedIn && 
                    <div>
                        <div id="arrowContainer">
                                <button className='arrow-up' onClick={() => handleAnswerUpvote(answer.aid)}></button>
                                <button className='arrow-down' onClick={() => handleAnswerDownvote(answer.aid)}></button>
                                <div>{answer.votes}</div>
                            </div>
                            <div>
                            <button id="pin-answer" onClick={() => handleAcceptedAnswer(answer.aid)}>Accept</button>
                         </div>
                    </div>
                    }
                </div>
                    <CommentsSection qid={question.qid} aid={answer.aid} type={commentType.ANSWER} stateComments={answerComments[answer.aid]}/>
                </div>
                
            );
        })}
        {currentSetOfAnswers.length > 0 && (
            <div> 
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        )}
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
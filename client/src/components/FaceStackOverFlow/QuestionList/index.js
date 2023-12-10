import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../../../reducers/nav-reducer";
import './index.css'
import { useEffect, useState } from 'react';
import { fetchComments } from "../../../thunks/comments-thunks";
import { paginatedQuestions } from "../../../services/question-service";
import React from 'react';
import { updateProfileNavState } from "../../../reducers/profile-nav-reducer";

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

const QuestionsList = ({questions, tags}) => {
    const profile = useSelector(state => state.nav.profile);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSetOfQuestions, setCurrentSetOfQuestions] = useState(questions);
    const questionsPerPage = 5;
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    useEffect(() => {
      paginatedQuestions(currentPage, questionsPerPage, questions).then((data) => {  
        setCurrentSetOfQuestions(data.questionsPerPage);
      }).catch((error) => {
        console.error("Error fetching paginated questions:", error);
      });
    },[currentPage, questions]);
   
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => {
        // If the current page is the last page, go to the first page
        return prevPage === totalPages ? 1 : Math.min(prevPage + 1, totalPages);
      });
    };

    const dispatch = useDispatch();
    const searchPage = useSelector(state => state.nav.searchPage);

    if(searchPage && questions.length === 0){
      return(
        <div>
          <h2>No Questions Found</h2>
        </div>
      )
    }
    else{
      return (
        <div>
          {currentSetOfQuestions.map((question) => {
            const handleQuestionClick = () => {
              console.log("in handle question click");
                if(profile){
                  dispatch(updateProfileNavState({pageStatus: 'updateQuestionForm',
                                                   questionObj: question}));
                  // return(<h1>question Form</h1>)
                }
                else{
                  const dispatchPayload = {
                    pageStatus: 'answerPage',
                    questionObj: question,
                  };
        
                  dispatch(updateNavState(dispatchPayload));
                  dispatch(fetchComments(question.qid));
                } 
              };
            const tagButtons = question.tagIds.map((tid) => {
              const tag = tags.find((t) => t.tid === tid);
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
            return (
              <div>
                {/* {currentSetOfQuestions.map((question) => ( */}
                <div key={`ques-${question.qid}`} className="postTitle">
                  <div className="postStats">
                    <h5>{`${question.votes ? question.votes : 0} votes`}</h5>
                    <br/>
                    <h5>{`${question.ansIds ? question.ansIds.length : 0} answers`}</h5>
                    <br/>
                    <h5>{`${question.views} views`}</h5>
                  </div>
                  <div className="quesLinks">
                    <div className="question" onClick={handleQuestionClick}>
                      {question.title}
                    </div>
                    <div className="question-summary">
                      {question.text}
                    </div>
                    <div className="home-tag-buttons">
                      {tagButtons}
                    </div>
                  </div>
                  <div className="lastActivity">
                    <h5>{formatQuestionMetadata(question.askedBy, question.askDate)}</h5>
                  </div>
                </div>
                {/* ))} */}
               
              </div>
              
            );
          })}
          {questions.length > 0 && (
              <div> 
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>{` Page ${currentPage} of ${totalPages} `}</span>
                <button onClick={handleNextPage}>
                    Next
                </button>
                </div>
        )}
            
        </div>
      );
    }
    
}

export { QuestionsList, formatQuestionMetadata };
import React, { useState, useEffect} from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { updateVotes, addCommentsToQuestion, addCommentsToAnswer} from "../../thunks/comments-thunks.js";
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { findQuestionThunk } from '../../thunks/question-thunks';

const formatCommentMetadata = (username, postDate) => {
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

const CommentsSection = ({qid, aid, type, stateComments}) => {

  const { loggedIn, user } = useAuthContext();

  if(type === 'answer') console.log('state comments section', stateComments);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(stateComments);
  const [displayedComments, setDisplayedComments] = useState(stateComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("IN COMMENTS", user);

  useEffect(() => {
    // Logic to display 3 comments per page
      if(stateComments !== undefined && stateComments.length > 0){
        setComments(prev => stateComments);
        const startIndex = (currentPage - 1) * 3;
        const endIndex = startIndex + 3;
        if(comments !== undefined)
        {
          const displayed = comments.slice(startIndex, endIndex);
          setDisplayedComments(prev => displayed);
        }
        console.log("rendering commenyds");
        console.log("dispkayed", comments);
      }
  }, [stateComments, comments, currentPage]);

  const handleNextPage = () => {
    const nextIndex = currentPage * 3;
    if (nextIndex < comments.length) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1); // Show first 3 comments when the last 3 comments are shown
    }
  };

  const handlePrevPage = () => {
    const prevIndex = (currentPage - 2) * 3;
    if (prevIndex >= 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(Math.ceil(comments.length / 3)); // Show last set of comments when the first 3 comments are shown
    }
  };


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    console.log("user", user);
    if (newComment.length === 0) {
      setErrorMessage("Comment text empty");
    } else if (newComment.length > 140) {
      setErrorMessage("Comment must be less than 140 characters.");
    } else if (user.reputation < 50) {
      setErrorMessage("User reputation below 50.");
    } 
    else {
      setErrorMessage("");
      const goodComment = {
        text: newComment,
        username : user.username,
        date: new Date().toString(),
        votes: 0
      }
      if(type === 'question') dispatch(addCommentsToQuestion({qid, goodComment}));
      if(type === 'answer') dispatch(addCommentsToAnswer({aid, goodComment}));
    }
  };


  const handleVote = (qid, cid) => {
    dispatch(updateVotes({qid, cid}));
    dispatch(findQuestionThunk());
  };

  const commentsHeading = () => {
    if(type === 'question') return (<h4>Question Comments</h4>)
    if(type === 'answer') return (<h4>Answer Comments</h4>)
  }
  return (
    <div>
      {(loggedIn || (stateComments !== undefined && stateComments.length > 0)) && (
          <div>
            <div className="comments-container">
              <div className="comments-heading">
                {commentsHeading()}
              </div>
              {stateComments !== undefined && displayedComments !== undefined && stateComments.length > 0 && (<div>
                <div className="comments">
                  {displayedComments.map((comment) => (
                    <div className="comment" key={comment._id}>
                      <div className="vote-section">
                        <div className="vote">
                        {loggedIn && (
                          <button id="comment-upvote" onClick={() => handleVote(qid, comment._id)}>Upvote</button>
                        )}
                          <span>votes : {comment.votes}</span>
                        </div>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-details">
                        <p>{formatCommentMetadata(comment.username, comment.date)}</p> 
                      </div>
                    </div>
                  ))}
                  <div className="nav-buttons">
                    <button disabled={currentPage === 1} onClick={handlePrevPage}>
                      Prev
                    </button>
                    <div>Page: {currentPage}</div>
                    <button
                      disabled={currentPage === 1 && currentPage === Math.ceil(comments.length / 3)}
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              )}
              
              <div className="comment-navigation">
                <div>
                {loggedIn && (
                  <div className="add-comment">
                    <input
                      type="text"
                      className='type-comment'
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Add a comment..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addComment();
                      }}
                    />
                    <div>{errorMessage && <div className="error-message">{errorMessage}</div>}</div>
                    <button onClick={addComment}>Add Comment</button>
                  </div>
                )}
                </div>
              </div>
            </div>

          </div>
      )}
   </div>
  );
};

export default CommentsSection;


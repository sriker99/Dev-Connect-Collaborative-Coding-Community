import React, { useState, useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateVotes, addCommentsToQuestion, addCommentsToAnswer} from "../../thunks/comments-thunks.js";

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

  if(type === 'answer') console.log('state comments section', stateComments);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(stateComments);
  const [displayedComments, setDisplayedComments] = useState(stateComments);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    const lastPage = Math.ceil(comments.length / 3);
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
    if (newComment.length === 0) {
      setErrorMessage("Comment text empty");
    } else if (newComment.length > 140) {
      setErrorMessage("Comment must be less than 140 characters.");
    }
    // } else if (foundQuestion.asked_by.reputation < 50) {
    //   setErrorMessage("User reputation below 50.");
    // } 
    else {
      setErrorMessage("");
      const goodComment = {
        text: newComment,
        username : "god",//change this when user is logged in
        date: new Date().toString(),
        votes: 0
      }
      if(type === 'question') dispatch(addCommentsToQuestion({qid, goodComment}));
      if(type === 'answer') dispatch(addCommentsToAnswer({aid, goodComment}));
    }
  };

  const handleVote = (cid) => {
    dispatch(updateVotes(cid));
  };

  return (
    <div>
      {(loggedIn || (stateComments !== undefined && stateComments.length > 0)) && (
          <div>
            <div className="comments-container">
              <div className="comments-heading">
                <h4>Comments Section</h4>
              </div>
              {stateComments !== undefined && displayedComments !== undefined && stateComments.length > 0 && (<div>
                <div className="comments">
                  {displayedComments.map((comment) => (
                    <div className="comment" key={comment._id}>
                      <div className="vote-section">
                        <div className="vote">
                        {loggedIn && (
                          <button onClick={() => handleVote(comment._id)}>Upvote</button>
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


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import { useEffect, useState} from "react";
import QuestionForm from "../../question";
import { updateNavState } from "../../../reducers/nav-reducer";
import AnswerPage from "../../answer";
import { QuestionsList } from "../QuestionList";
import { SpecificTagComponent } from "../../tags";
import { useAuthContext } from "../../../hooks/useAuthContext";
 
const questionFormPageStatus = {
    pageStatus: 'questionForm'
}

const sortQuesList = (order, questionState, answers, setQuesListOrder) => {
  let sortedData = []
  switch(order){
      case 'newest':
          sortedData = [...questionState];
          if(sortedData.length > 0)
          {
            sortedData.sort((a, b) => new Date(b.askDate) - new Date(a.askDate));
          }
          setQuesListOrder(sortedData);
          break;
      case 'active':
          
          sortedData = [...questionState];
          if(sortedData.length > 0)
          {
            sortedData.sort((a, b) => new Date(b.active_order) - new Date(a.active_order));
          }
          setQuesListOrder(sortedData);
          console.log('hoho', sortedData);
          break;
      case 'unanswered':
          sortedData = [...questionState];
          if(sortedData.length > 0)
          {
            sortedData = questionState.filter(x=>x.ansIds.length === 0);
            sortedData.sort((a, b) => new Date(b.askDate) - new Date(a.askDate));
          }                
          setQuesListOrder(sortedData);
          break;
      default:
          sortedData = [...questionState];
          if(sortedData.length > 0)
          {
            sortedData.sort((a, b) => new Date(b.askDate) - new Date(a.askDate));
          }                
          setQuesListOrder(sortedData);
          break;
  }
}
const HomePage = ({questionButton}) => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.data.questions);
    const tags = useSelector(state => state.data.tags);
    const answers = useSelector(state => state.data.answers);
    const [questionState, setQuestionState] = useState(questions);
    const [quesListOrder, setQuesListOrder] = useState(questionState);
    //let sortedData = [];
    const quesFormDisplay = useSelector(state => state.nav.questionForm);
    const answerPageDisplay = useSelector(state => state.nav.answerPage);
    const questionObj = useSelector(state => state.nav.questionObj);
    const specificTagPage = useSelector(state => state.nav.specificTagPage);
    const specificTagId = useSelector(state => state.nav.tagId);
    const searchPage = useSelector(state => state.nav.searchPage);
    const searchQuesObj = useSelector(state => state.nav.searchQuesObj);
    const sortKey = useSelector(state => state.nav.sort);
    const {loggedIn} = useAuthContext();
    
    useEffect(() => {
      if(searchPage){
        setQuestionState(searchQuesObj);
      }
      else{
        setQuestionState(questions);
      }
      sortQuesList('newest', questionState, answers, setQuesListOrder);
            
    }, [questions, searchQuesObj, questionState, questionButton, searchPage, answers]);

    // const sortActiveOrder = (questions, answers) => {
    //   const questionRecentAnswerDates = questions.map(question => {
    //     const answerDates = question.ansIds.map(ansId => {
    //       const answer = answers.find(answer => answer.aid === ansId);
    //       return answer ? new Date(answer.ansDate) : null;
    //     });
      
    //     const mostRecentDate = new Date(Math.max(...answerDates.filter(date => date !== null)));
    //     return { ...question, mostRecentDate };
    //   });
      
    //   const sortedQuestions = questionRecentAnswerDates.sort((a, b) => b.mostRecentDate - a.mostRecentDate);
    //   setQuesListOrder(sortedQuestions);
    // }

    
    const HomePageUI = () => {
      console.log("HOMEPAGE user login detail", loggedIn);
        return (
            <div id="content">
              <div id="sorting-panel">
                <div id="home-title">
                  <h2>{searchPage ? 'Search Results' : 'All Questions'}</h2>
                  {loggedIn &&  (
                  <button id="ask-question" onClick={() => dispatch(updateNavState(questionFormPageStatus))}>
                    Ask a Question
                  </button>
                  )}
                </div>
                <div id="sorting-buttons">
                  <h3 id="question-length">{quesListOrder.length} questions</h3>
                  <div>
                    <button id="newest-sort" onClick={() => sortQuesList('newest', questionState, answers, setQuesListOrder)}>
                      Newest
                    </button>
                    <button id="active-sort" onClick={ () => sortQuesList('active', questionState, answers, setQuesListOrder)}>
                      Active
                    </button>
                    <button id="unanswered-sort" onClick={ () => sortQuesList('unanswered', questionState, answers, setQuesListOrder)}>
                      Unanswered
                    </button>
                  </div>
                </div>
              </div>
              <div id="list">
                <QuestionsList questions={quesListOrder} tags={tags} />
              </div>
            </div>
          );
    }
 
    return(
        <>
            {quesFormDisplay ? <QuestionForm/> : answerPageDisplay ? <AnswerPage question={questionObj}/> : specificTagPage ? <SpecificTagComponent tagId={specificTagId}/> : !sortKey ? <HomePageUI/> : <HomePageUI/>}
        </>
        
        
    );
  
}
 
export default HomePage;

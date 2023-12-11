import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { updateNavState } from '../../reducers/nav-reducer';
import { QuestionsList } from '../FaceStackOverFlow/QuestionList';
import { useAuthContext } from '../../hooks/useAuthContext';
 
const questionFormPageStatus = {
    pageStatus: 'questionForm'
}
 
const GenerateTags = ({ data }) => {
    const dispatch = useDispatch();
    return data.tags.map(tag => {
      const quesLength = data.questions.filter(t => t.tagIds.includes(tag.tid)).length;
      const tagPayload = {
        pageStatus: 'specificTagPage',
        tagId: tag.tid
      };
      return (
        <div key={tag.tid} className="tagNode">
          <p className="tagName" onClick={() => dispatch(updateNavState(tagPayload))}>{tag.name}</p>
          <br />
          <p>{`${quesLength} ${quesLength > 1 ? 'questions' : 'question'}`}</p>
        </div>
      );
    });
};
 
const AllTagsComponent = () => {
  const { loggedIn } = useAuthContext();
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();
    return (
        <div>
          <div id="tag-title">
              <h2>{data.tags.length} Tags</h2>
              <h2>All Tags</h2>
              {loggedIn && <button id="ask-question" onClick={() => dispatch(updateNavState(questionFormPageStatus))}>Ask a Question</button>}
          </div>
          <div id="tags-list">
              <GenerateTags data={data}/>
          </div>
        </div>
    );
};
 
const SpecificTagComponent = ({tagId}) => {
  const data = useSelector(state => state.data);
  const tagObj = data.tags.find(t => t.tid === tagId);
  const questions = data.questions.filter(q => q.tagIds.includes(tagId));
  questions.sort((a, b) => new Date(b.askDate) - new Date(a.askDate));
  const tags = data.tags;
  return (
    <div>
      <div id="tag-title">
          <h2>List of questions for {tagObj.name} tag</h2>
      </div>
      <div>
          <QuestionsList questions={questions} tags={tags}/>
      </div>
    </div>
);
}

const createTag = (name, counter) => {
    const newTag = {
        name: name
    };
    return newTag;
}
export { AllTagsComponent, SpecificTagComponent, createTag };


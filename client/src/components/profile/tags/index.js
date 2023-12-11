import React from 'react';
import { useDispatch } from 'react-redux';
import './index.css';
 import { useState } from 'react';
import { checkTagUpdate, deleteTag, updateTag} from '../../../services/tag-service';
import { findQuestionThunk } from "../../../thunks/question-thunks"
import { findTagThunk } from "../../../thunks/tag-thunks";
import { findAnswerThunk } from "../../../thunks/answer-thunks";
import { updateProfileNavState } from '../../../reducers/profile-nav-reducer';

 


const GenerateTags = ({ questions, tags }) => {

    const dispatch = useDispatch();
    const [erros,setErros] = useState("");
    const [tid,setTid] = useState("");
    const [editableId, setEditableId] = useState("");
    const [editableField, setEditableField] = useState(false);
    const [tagName, setTagName] = useState("");
    console.log("questions and tags", questions, tags);

    const handleChange = (e) => {
      setTagName(e.target.value)
    }

    const handleEdit = (tid, tname, qids) => {
      const body = {
        tagName: tname,
        qids : qids
      }
      console.log("body", body);
      checkTagUpdate(body).then((data) => {
        console.log("status", data);
        if(data){
          if(editableId === tid){
            if(tagName.length > 0){
              updateTag(tid, tagName.trim()).then(() => {
                setEditableField(false);
                setErros("");
                setTid("");
                setEditableId("");
                setTagName("");
                dispatch(findTagThunk());
                dispatch(findAnswerThunk());
                dispatch(findQuestionThunk()); 
                dispatch(updateProfileNavState({pageStatus:"tags"}))
              })
            }
            else{
              setErros("tag name can't be empty");
            }
          }
          else{
            setEditableField(true);
            setErros("");
            setTid("");
            setEditableId(tid);
            setTagName(tname);
          }
        }
        else{
          setErros("Tags are been used by other user");
          setTid(tid);
          setEditableField(false);
          setEditableId("");
        }
      })
    }

    const handleDelete = (tid, tagName, qids) => {
      const body = {
        tagName: tagName,
        qids : qids
      }
      console.log("body", body);
      checkTagUpdate(body).then((data) => {
        console.log("status", data);
        if(data){
          deleteTag(tagName).then(() => {
            setErros("");
            setTid("");
            dispatch(findTagThunk());
            dispatch(findAnswerThunk());
            dispatch(findQuestionThunk()); 
            dispatch(updateProfileNavState({pageStatus:"tags"}))
          });
        }
        else{
          setErros("Tags are been used by other user");
          setTid(tid);
        }
      })
    }
    return tags.map(tag => {
      const quesLength = questions.filter(t => t.tagIds.includes(tag.tid)).length;
      console.log("specific tag", tag);
      let qids = questions.map(q => {
        if(q.tagIds.includes(tag.tid)){
          return q.qid;
        }
        return undefined
      });
      qids = qids.filter(q => q !== undefined);
      console.log("qids", qids);
      return (
        <div key={tag.tid} className="tagNode">
          {console.log('values', editableField, editableId, tag.tid)}
          {(editableField && editableId === tag.tid) ? (
            
            <input name="tagName" value={tagName} onChange={handleChange}/>
          ) : <p className="tagName">{tag.name}</p>}
          <br />
          <p>{`${quesLength} ${quesLength > 1 ? 'questions' : 'question'}`}</p>
          <br/>
          <div>
            <button id="profileEditTag" onClick={() => handleEdit(tag.tid, tag.name, qids)}>Edit</button>
            <button id="profileDeleteTag" onClick={() => handleDelete(tag.tid, tag.name, qids)}>Delete</button>
          </div>
          {tid === tag.tid && erros.length > 0 && <p style={{color: 'red'}}>Error: {erros}</p>}
        </div>
      );
    });
};


const AllTagsComponent = ({questions, tags}) => {
    //const dispatch = useDispatch();
    return (
        <div>
          <div id="tag-title">
              <h2>{tags.length} Tags</h2>
              <h2>All User Tags</h2>
          </div>
          <div id="tags-list">
              <GenerateTags questions={questions} tags={tags}/>
          </div>
        </div>
    );
};
 

export { AllTagsComponent };


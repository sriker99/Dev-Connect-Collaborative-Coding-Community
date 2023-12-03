import React, { useState } from 'react';
import './index.css';
import { useDispatch} from 'react-redux';
import { updateNavState } from '../../../reducers/nav-reducer';
const Navbar = ({questionButton, setQuestionButton}) => {
    const [questionsBarColor, setQuestionsBarColor] = useState('true');
    const [tagsBarColor, setTagsBarColor] = useState('false');
    const dispatch = useDispatch();
    const handleQuestionsBarClick = () => {
        setQuestionsBarColor('lightgray');
        setTagsBarColor('white');
        dispatch(updateNavState({pageStatus:'questions'}));
        setQuestionButton(!questionButton);
    };
    const handleTagsBarClick = () => {
        setTagsBarColor('lightgray');
        setQuestionsBarColor('white');
        dispatch(updateNavState({pageStatus:'tags'}));
    };
    return (
        <div id = "sideBarNav">
            <div id = "questions-bar" style={{ backgroundColor: questionsBarColor }} onClick={handleQuestionsBarClick}>Questions</div>
            <div id = "tags-bar" style={{ backgroundColor: tagsBarColor }} onClick={handleTagsBarClick}>Tags</div>
        </div>
    );
}

export default Navbar;
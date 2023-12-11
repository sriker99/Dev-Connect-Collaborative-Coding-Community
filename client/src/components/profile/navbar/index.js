import React, { useState } from 'react';
import './index.css';
import { useDispatch} from 'react-redux';
import { updateProfileNavState } from '../../../reducers/profile-nav-reducer';

const Navbar = () => {
    const [userBarColor, setUserBarColor] = useState('true');
    const [questionsBarColor, setQuestionsBarColor] = useState('false');
    const [answersBarColor, setAnswersBarColor] = useState('false');
    const [tagsBarColor, setTagsBarColor] = useState('false');
    const dispatch = useDispatch();
    const handleUserBarClick = () => {
        setUserBarColor('lightgray');
        setQuestionsBarColor('white');
        setAnswersBarColor('white');
        setTagsBarColor('white');
        dispatch(updateProfileNavState({pageStatus:'user'}));
    };
    const handleQuestionsBarClick = () => {
        setUserBarColor('white');
        setQuestionsBarColor('lightgray');
        setAnswersBarColor('white');
        setTagsBarColor('white');
        dispatch(updateProfileNavState({pageStatus:'questions'}));
    };
    const handleAnswersBarClick = () => {
        setUserBarColor('white');
        setQuestionsBarColor('white');
        setAnswersBarColor('lightgray');
        setTagsBarColor('white');
        dispatch(updateProfileNavState({pageStatus:'answers'}));
    };
    const handleTagsBarClick = () => {
        setUserBarColor('white');
        setQuestionsBarColor('white');
        setAnswersBarColor('white');
        setTagsBarColor('lightgray');
        dispatch(updateProfileNavState({pageStatus:'tags'}));
    };

    return (
        <div id = "sideBarNav">
            <div id = "profile-user-bar" style={{ backgroundColor: userBarColor }} onClick={handleUserBarClick}>User</div>
            <div id = "profile-questions-bar" style={{ backgroundColor: questionsBarColor }} onClick={handleQuestionsBarClick}>Questions</div>
            <div id = "profile-answers-bar" style={{ backgroundColor: answersBarColor }} onClick={handleAnswersBarClick}>Answers</div>
            <div id = "profile-tags-bar" style={{ backgroundColor: tagsBarColor }} onClick={handleTagsBarClick}>Tags</div>
        </div>
    );
}

export default Navbar;
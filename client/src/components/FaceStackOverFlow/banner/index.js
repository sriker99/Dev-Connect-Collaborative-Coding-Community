import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import './index.css'
import { updateNavState } from '../../../reducers/nav-reducer';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { logoutThunk } from '../../../thunks/login-thunks';
import { useNavigate } from 'react-router-dom';
import { updateProfileNavState } from '../../../reducers/profile-nav-reducer';
const Header = () => {
    // const loginInfo = useSelector(state => state.auth);
    const profilePageStatus = {
      pageStatus: 'profile'
    }
    const homePageStatus = {
      pageStatus: 'questions'
    } 
    const { loggedIn, dispatch: authDispatch } = useAuthContext();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();
    console.log(loggedIn);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        const results = searchQuestion(query.trim(), data);
        const searchPayload = {
          pageStatus: 'searchPage',
          searchQuesObj: results
        }
        dispatch(updateNavState(searchPayload));
        }
    };
    const handleLogout = (e) => {
      e.preventDefault();
      logoutThunk(authDispatch);
      navigate("/");

    };

    const handleProfile = () => {
      dispatch(updateNavState(profilePageStatus));
    }

    const handleHomePage = () => {
      dispatch(updateProfileNavState({pageStatus: 'user'}));
      dispatch(updateNavState(homePageStatus));
    }

    return (
        <div id="header" className="header">
            <div>
              {loggedIn ? <button onClick={handleLogout}>Logout</button>: null}
              {loggedIn ? <button onClick={handleProfile}>Profile</button>: null}
              {loggedIn ? <button onClick={handleHomePage}>HomePage</button>: null}
            </div>
            <h1 id="bannerTitle">Fake Stack Overflow</h1>
            <input id="searchBar" 
                type="search" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={handleKeyDown}/>
        </div>
        
    );
}
  
  const searchQuestion = (query, data) => {
    query = query.toLowerCase();
    const results = [];
    const queryWords = query.split(' ');
  
    queryWords.forEach((query) => {
      if (query.startsWith('[') && query.endsWith(']')) {
        // Search for matching tags
        const tagToSearch = query.slice(1, -1).trim().toLowerCase();
  
        for (const question of data.questions) {
            const tags = question.tagIds.map(tagId => data.tags.find(tag => tag.tid === tagId).name.toLowerCase());
  
            if (tags.includes(tagToSearch)) {
              results.push(question);
            }
        }
      } else {
        // Search in question titles or text
        for (const question of data.questions) {
            const title = question.title.toLowerCase();
            const text = question.text.toLowerCase();
  
            const wordsInQuery = query.split(' ');
  
            // Check if any word in the query matches the title or text
            const found = wordsInQuery.some(word => title.includes(word) || text.includes(word));
  
            if (found) {
              results.push(question);
            }
        }
    }
    });
  
    results.sort(function(a, b) {
      return a.askDate - b.askDate;
    });
  
    return [...new Set(results)];
  }

export default Header;
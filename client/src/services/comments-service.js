import axios from 'axios';

const API_URL = 'http://localhost:8000/api/comments';

export const fetchComments = async(qid) => {
    const endpoint = `${API_URL}/getComments/${String(qid)}`;
    const response = await axios.get(endpoint);
    return response.data;
}

export const updateVotes = async(qid, cid) => {
    const endpoint = `${API_URL}/updateVotes/${String(cid)}`;
    const body = {
        qid: qid
    }
    const response = await axios.put(endpoint, body);
    return response.data;
}

export const addCommentsToQuestion = async(qid, newComment) => {
    const endpoint = `${API_URL}/addQcomments/${String(qid)}`;
    const response = await axios.post(endpoint, newComment);
    return response.data;
}

export const addCommentsToAnswer = async(aid, newComment) => {
    const endpoint = `${API_URL}/addAcomments/${String(aid)}`;
    const response = await axios.post(endpoint, newComment);
    return response.data;
}
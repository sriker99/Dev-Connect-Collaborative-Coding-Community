import axios from 'axios';

const API_URL = 'http://localhost:8000/api/answers';

export const createAnswer = async (answer, qid) => {
    const endpoint = `${API_URL}/question/${String(qid)}`;
    const response = await axios.post(endpoint, answer);
    return response.data;
}

export const findAnswer = async () => {
    const response = await axios.get(API_URL);
    const answers = response.data;
    return answers;
}

export const updateAnswerVotes = async (qid, aid, isIncrement, user) => {
    const response = await axios.put(`${API_URL}/${aid}/votes?isIncrement=${isIncrement}&user=${user}&qid=${qid}`);
    console.log("IN ANSWER SERVICE", response.data);
    const data = response.data;
    console.log("response update ans votes", data)
    return data;
}

export const updateAnswerAccepted = async (aid, isAccepted) => {
    const response = await axios.put(`${API_URL}/${aid}?isAccepted=${isAccepted}`);
    const answer = response.data;
    return answer;
}

export const paginatedAnswers =  async (qid, page, limit) => {
    const response = await axios.get(`${API_URL}/${qid}?page=${page}&limit=${limit}`);
    const questions = response.data;
    return questions;
}

export const paginateAcceptedAnswers =  async (aid, qid, page, limit) => {
    const response = await axios.get(`${API_URL}/${aid}/question/${qid}?page=${page}&limit=${limit}`);
    const questions = response.data;
    return questions;
}

export const checkAcceptAnswer = async(qid) => {
    const response = await axios.get(`http://localhost:8000/api/checkanswers/${qid}`);
    const accept = response.data;
    return accept;
}

export const deleteAnswer = async(aid) => {
    const response = await axios.delete(`${API_URL}/${aid}`);
    return response.data;
}

export const editAnswer = async(aid, body) => {
    console.log("in ans service", body);
    const response = await axios.put(`${API_URL}/updateAnswerText/${aid}`, body);
    return response.data;
}
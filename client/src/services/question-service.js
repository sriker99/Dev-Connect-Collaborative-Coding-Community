import axios from "axios";

const API_URL = 'http://localhost:8000/api/questions';


export const createQuestion = async (question) => {
    const response = await axios.post(API_URL, question);
    return response.data;
}

export const findQuestion = async () => {
    const response = await axios.get(API_URL);
    const questions = response.data;
    return questions;
}

export const findQuestionById = async (qid) => {
    const response = await axios.get(`${API_URL}/${qid}`);
    const question = response.data;
    return question;
}

export const updateQuestion = async (qid) => {
    const response = await axios.put(`${API_URL}/${qid}`);
    const question = response.data;
    return question;
}

export const updateQuestionVotes = async (qid, isIncrement, user) => {
    const response = await axios.put(`${API_URL}/${qid}/votes?isIncrement=${isIncrement}&user=${user}`);
    const data = response.data;
    return data;
}

export const paginatedQuestions =  async (page, limit, currentQuestions) => {
    console.log("IN PAGINATE", currentQuestions);
    const response = await axios.post(`${API_URL}/paginatedQuestions?page=${page}&limit=${limit}`, currentQuestions);
    const questions = response.data;
    return questions;
}

export const deleteQuestion = async(qid) =>  {
    console.log("I'm here in delete servicee");
    const response = await axios.delete(`${API_URL}/${qid}`);
    return response.data;
}

export const editQuestion = async(qid, body) =>  {
    console.log("I'm here in edit servicee");
    const response = await axios.put(`${API_URL}/updateQuestion/${qid}`, body);
    return response.data;
}

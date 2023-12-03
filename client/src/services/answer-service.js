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

export const updateAnswerVotes = async (aid, isIncrement) => {
    const response = await axios.put(`${API_URL}/${aid}/votes?isIncrement=${isIncrement}`);
    const answer = response.data;
    return answer;
}


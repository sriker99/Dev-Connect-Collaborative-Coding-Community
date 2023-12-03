import axios from "axios";

const API_URL = 'http://localhost:8000/api/tags';

export const createTag = async (tag) => {
    const response = await axios.post(API_URL, tag);
    return response.data;
}

export const findTag = async () => {
    const response = await axios.get(API_URL);
    const tags = response.data;
    return tags;
}


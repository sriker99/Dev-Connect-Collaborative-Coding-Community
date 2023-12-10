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

export const checkTagUpdate = async(body) => {
    const response = await axios.post(`${API_URL}/checkTagsUpdate`, body);
    return response.data;
    
}

export const deleteTag = async(tagName) => {
    const response = await axios.delete(`${API_URL}/${tagName}`);
    return response.data;
}

export const updateTag = async(tid, tagName) => {
    const body = {name : tagName}
    const response = await axios.put(`${API_URL}/${tid}`, body);
    return response.data;
}
import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../services/comments-service.js";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (qid) => {
     return await service.fetchComments(qid);
    });

export const updateVotes = createAsyncThunk(
    'comments/updateVote',
    async ({qid, cid}) => {
        return await service.updateVotes(qid, cid);
    });

export const addCommentsToQuestion = createAsyncThunk(
    'comments/addCommentsToQuestion',
    async ({qid, goodComment}) => {
        return await service.addCommentsToQuestion(qid, goodComment);
    });

export const addCommentsToAnswer = createAsyncThunk(
    'comments/addCommentsToAnswer',
    async ({aid, goodComment}) => {
        return await service.addCommentsToAnswer(aid, goodComment);
    });
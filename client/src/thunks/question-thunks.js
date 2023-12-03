import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../services/question-service";

export const createQuestionThunk = createAsyncThunk(
    'questions/createQuestion',
    async (question) => {
      const response = await service.createQuestion(question)
      return response;
})

export const findQuestionThunk = createAsyncThunk(
  'questions/findQuestion',
  async () => {
   const questions = await service.findQuestion()
   return questions;
})

export const findQuestionByIdThunk = createAsyncThunk(
  'questions/findQuestionById',
  async (qid) => {
   const question = await service.findQuestionById(qid)
   return question;
})

export const updateQuestionThunk = createAsyncThunk(
  'questions/updateQuestion',
  async (qid) => {
   const question = await service.updateQuestion(qid);
   return question;
})

export const updateQuestionVoteThunk = createAsyncThunk(
  'questions/updateQuestionVote',
  async ({qid, isIncrement}) => {
    console.log("THUNK INC", isIncrement)
   const question = await service.updateQuestionVotes(qid, isIncrement);
   return question;
})
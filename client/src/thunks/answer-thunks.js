import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../services/answer-service.js";

export const createAnswerThunk = createAsyncThunk(
    'answers/createAnswer',
    async ({answer, qid}) => {
      const newAnswer = await service.createAnswer(answer, qid);
      return newAnswer;
})

export const findAnswerThunk = createAsyncThunk(
  'answers/findAnswer',
  async () => {
   const answers = await service.findAnswer()
   return answers;
})

export const updateAnswerVoteThunk = createAsyncThunk(
  'answers/updateAnswerVote',
  async ({aid, isIncrement}) => {
    console.log("THUNK INC", isIncrement)
   const answer = await service.updateAnswerVotes(aid, isIncrement);
   return answer;
})

export const updateAnswerAcceptedThunk = createAsyncThunk(
  'answers/updateAnswerAccepted',
  async ({aid, isAccepted}) => {
   const answer = await service.updateAnswerAccepted(aid, isAccepted);
   return answer;
})
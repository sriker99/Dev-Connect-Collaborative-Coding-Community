import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../services/tag-service.js";

export const createTagThunk = createAsyncThunk(
    'tags/createTag',
    async (tag) => {
      const newTag = await service.createTag(tag)
      return newTag;
})

export const findTagThunk = createAsyncThunk(
  'tags/findTag',
  async () => {
   const data = await service.findTag();
   return data;
})
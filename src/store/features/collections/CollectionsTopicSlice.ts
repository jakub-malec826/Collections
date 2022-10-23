import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import GetTopicList from "../../../connectWithServer/topic/GetTopicList";

const initialState = {
	topicsList: <{ _id?: string; topic: string }[]>[],
};

export const getTopicListFromDb = createAsyncThunk("topic/get", async () => {
	return await GetTopicList();
});

const CollectionsTopicSlice = createSlice({
	name: "collectionsTopic",
	initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(getTopicListFromDb.fulfilled, (state, action) => {
			state.topicsList = action.payload;
		});
	},
});


export default CollectionsTopicSlice.reducer;

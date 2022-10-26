import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import serverUrl from "../../serverUrl";

const initialState = {
	topicsList: <{ _id?: string; topic: string }[]>[],
};

export const getTopicListFromDb = createAsyncThunk("topic/get", async () => {
	return await fetch(`${serverUrl}topic/get`)
		.then((res) => res.json())
		.then((data: { _id?: string; topic: string }[]) => {
			return data;
		});
});

export const AddTopicToDb = createAsyncThunk(
	"topic/add",
	async (topic: string) => {
		return await fetch(`${serverUrl}topic/add`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ topic }),
		})
			.then((res) => res.json())
			.then((data: { _id: string; topic: string }) => {
				return data;
			});
	}
);

export const DeleteTopicFromDb = createAsyncThunk(
	"topic/delete",
	async (topicid: string) => {
		await fetch(`${serverUrl}topic/delete/${topicid}`, {
			method: "delete",
			mode: "cors",
		});
		return topicid;
	}
);

const CollectionsTopicSlice = createSlice({
	name: "collectionsTopic",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getTopicListFromDb.fulfilled, (state, action) => {
				state.topicsList = action.payload.sort((a, b) =>
					a.topic.toLowerCase() < b.topic.toLowerCase() ? -1 : 1
				);
			})
			.addCase(AddTopicToDb.fulfilled, (state, action) => {
				state.topicsList.push(action.payload);
			})
			.addCase(DeleteTopicFromDb.fulfilled, (state, action) => {
				state.topicsList = state.topicsList.filter(
					(top) => top._id !== action.payload
				);
			});
	},
});

export default CollectionsTopicSlice.reducer;

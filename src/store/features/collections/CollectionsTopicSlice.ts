import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	topicsList: ["books", "IT", "cars", "whiskey", "animals"],
};

const CollectionsTopicSlice = createSlice({
	name: "collectionsTopic",
	initialState,
	reducers: {
		addToTopicList: (state, action) => {
			state.topicsList.push(action.payload);
		},
		deleteFromTopicList: (state, action) => {
			state.topicsList.filter((t) => t !== action.payload);
		},
	},
});

export const { addToTopicList, deleteFromTopicList } =
	CollectionsTopicSlice.actions;

export default CollectionsTopicSlice.reducer;

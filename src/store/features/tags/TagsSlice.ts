import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serverUrl from "../../serverUrl";

const initialState = {
	tagsList: <{ value: string; count: number }[]>[],
};

export const GetTagsList = createAsyncThunk("items/alltags", async () => {
	return await fetch(`${serverUrl}items/alltags`)
		.then((res) => res.json())
		.then((data: { value: string; count: number }[]) => {
			return data;
		});
});

const TagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(GetTagsList.fulfilled, (state, action) => {
			state.tagsList = action.payload;
		});
	},
});

export default TagsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import CollectionsDataIF from "../../../interfaces/CollectionsDataIF";

export const emptyColl: CollectionsDataIF = {
	name: "",
	description: `Hello *world*


Type something and try`,
	topic: "",
	image: { url: "", id: "" },
	owner: "",
	items: [],
};

const initialState = {
	formVis: false,
	collection: <CollectionsDataIF>emptyColl,
	forEdit: false,
};

export const FormsVisSlice = createSlice({
	name: "formsVis",
	initialState,
	reducers: {
		showCollectionForm: (state, action) => {
			state.formVis = true;
			state.collection = action.payload[0];
			state.forEdit = action.payload[1];
		},
		hideCollectionForm: (state) => {
			state.formVis = false;
		},
	},
});

export const { showCollectionForm, hideCollectionForm } = FormsVisSlice.actions;

export default FormsVisSlice.reducer;

import CollectionSchemaIF from "../../../interfaces/CollectionSchemaIF";
import { createSlice } from "@reduxjs/toolkit";
import {
	GetCollectionData,
	GetBiggestCollectionsData,
	AddCollectionData,
	EditCollection,
	AddItemToCollection,
	DeleteItemFromCollection,
	DeleteCollectionFromDb,
} from "./CollectionsThunks";

export const emptyColl = {
	name: "",
	topic: "",
	description: "",
	image: { url: "", id: "" },
	owner: "",
	items: [],
};

const initialState = {
	collections: <CollectionSchemaIF[]>[],
	biggestCollections: <CollectionSchemaIF[]>[],
	loading: "idle",
};

const CollectionsSlice = createSlice({
	name: "collections",
	initialState,
	reducers: {
		deleteCollections: (state) => {
			state.collections = [];
		},
	},
	extraReducers(builder) {
		builder
			.addCase(GetCollectionData.fulfilled, (state, action) => {
				state.collections = action.payload;
			})
			.addCase(GetBiggestCollectionsData.fulfilled, (state, action) => {
				state.biggestCollections = action.payload;
			})

			.addCase(AddCollectionData.fulfilled, (state, action) => {
				state.collections.push(action.payload);
			})
			.addCase(EditCollection.fulfilled, (state, action) => {
				let activeCollection = state.collections.find(
					(coll) => coll._id === action.payload._id
				);
				if (activeCollection) {
					state.collections.splice(
						state.collections.indexOf(activeCollection),
						1,
						action.payload
					);
				}
			})
			.addCase(AddItemToCollection.fulfilled, (state, action) => {
				let activeCollection = state.collections.find(
					(coll) => coll._id === action.payload.data._id
				);
				if (activeCollection)
					activeCollection.items.push(action.payload.itemId);
			})
			.addCase(DeleteItemFromCollection.fulfilled, (state, action) => {
				let activeCollection = state.collections.find(
					(coll) => coll._id === action.payload.data._id
				);
				if (activeCollection)
					activeCollection.items = activeCollection.items.filter(
						(cI) => cI !== action.payload.itemId
					);
			})
			.addCase(DeleteCollectionFromDb.fulfilled, (state, action) => {
				state.collections = state.collections.filter(
					(c) => c._id !== action.payload
				);
			});
	},
});

export const { deleteCollections } = CollectionsSlice.actions;

export default CollectionsSlice.reducer;

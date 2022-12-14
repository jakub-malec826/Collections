import ItemSchemaIF from "../../../interfaces/ItemSchemaIF";
import { createSlice } from "@reduxjs/toolkit";
import {
	GetItemsFromDb,
	GetTagItems,
	GetLastItems,
	AddItemToDb,
	EditItemInDb,
	DeleteItemFromDb,
	AddCommentToDb,
	AddLikeToDb,
	UnLikeFromDb,
} from "./ItemsThunk";

export const emptyItem = {
	name: "",
	tag: [],
	comments: [],
	likes: [],
	date: "",
	owner: "",
	author: "",
	additionalField: [],
};

const initialState = {
	collectionItems: <ItemSchemaIF[]>[],
	lastItems: <ItemSchemaIF[]>[],
	status: "idle",
	tagItems: <ItemSchemaIF[]>[],
};

const ItemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		deleteItems: (state) => {
			state.collectionItems = [];
		},
		deleteTagItems: (state) => {
			state.tagItems = [];
		},
	},
	extraReducers(builder) {
		builder
			.addCase(GetItemsFromDb.pending, (state) => {
				state.status = "loading";
			})
			.addCase(GetItemsFromDb.fulfilled, (state, action) => {
				state.collectionItems = action.payload;
				state.status = "success";
			})
			.addCase(GetTagItems.fulfilled, (state, action) => {
				if (state.tagItems.length > 0)
					for (let i in state.tagItems) {
						const tempState = state.tagItems[i];
						const tempPayload = action.payload[i];
						if (
							tempState.comments &&
							tempPayload.comments &&
							tempState.comments.length !==
								tempPayload.comments.length
						) {
							tempState.comments = tempPayload.comments;
						}
						if (
							tempState.likes &&
							tempPayload.likes &&
							tempState.likes.length !== tempPayload.likes.length
						) {
							tempState.likes = tempPayload.likes;
						}
					}
				else {
					state.tagItems = action.payload;
				}
			})
			.addCase(GetLastItems.pending, (state) => {
				state.status = "loading";
			})
			.addCase(GetLastItems.fulfilled, (state, action) => {
				state.lastItems = action.payload;
				state.status = "success";
			})

			.addCase(AddItemToDb.fulfilled, (state, action) => {
				state.collectionItems.push(action.payload);
			})
			.addCase(AddCommentToDb.fulfilled, (state, action) => {
				const activeItem = state.collectionItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeItem)
					activeItem.comments.push(action.payload.comment);
				const activeTagItem = state.tagItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeTagItem)
					activeTagItem.comments.push(action.payload.comment);
			})
			.addCase(AddLikeToDb.fulfilled, (state, action) => {
				const activeItem = state.collectionItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeItem) activeItem.likes.push(action.payload.loginUser);
				const activeTagItem = state.tagItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeTagItem)
					activeTagItem.likes.push(action.payload.loginUser);
			})

			.addCase(EditItemInDb.fulfilled, (state, action) => {
				const activeItem = state.collectionItems.find(
					(i) => i._id === action.payload._id
				);
				if (activeItem)
					state.collectionItems.splice(
						state.collectionItems.indexOf(activeItem),
						1,
						action.payload
					);
			})
			.addCase(DeleteItemFromDb.fulfilled, (state, action) => {
				state.collectionItems = state.collectionItems.filter(
					(i) => i._id !== action.payload
				);
			})
			.addCase(UnLikeFromDb.fulfilled, (state, action) => {
				const activeItem = state.collectionItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeItem)
					activeItem.likes = activeItem.likes.filter(
						(l) => l !== action.payload.loginUser
					);
				const activeTagItem = state.tagItems.find(
					(i) => i._id === action.payload.data._id
				);
				if (activeTagItem)
					activeTagItem.likes = activeTagItem.likes.filter(
						(l) => l !== action.payload.loginUser
					);
			});
	},
});

export const { deleteItems, deleteTagItems } = ItemsSlice.actions;

export default ItemsSlice.reducer;

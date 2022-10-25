import CollectionSchemaIF from "../../../interfaces/CollectionSchemaIF";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import serverUrl from "../../serverUrl";

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
};

export const GetCollectionData = createAsyncThunk(
	"collecion/get",
	async (userId: string) => {
		return await fetch(`${serverUrl}collections/getall/${userId}`)
			.then((res) => res.json())
			.then((data: CollectionSchemaIF[]) => {
				return data;
			});
	}
);

export const AddCollectionData = createAsyncThunk(
	"collection/new",
	async (collection: CollectionSchemaIF) => {
		return await fetch(`${serverUrl}collections/newcollection`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(collection),
		})
			.then((res) => res.json())
			.then((data: CollectionSchemaIF) => {
				console.log(data);
				return data;
			});
	}
);

export const EditCollection = createAsyncThunk(
	"collection/edit",
	async (collection: CollectionSchemaIF) => {
		return await fetch(
			`${serverUrl}collections/editcollection/${collection._id}`,
			{
				method: "put",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(collection),
			}
		)
			.then((res) => res.json())
			.then((data: CollectionSchemaIF) => {
				return data;
			});
	}
);

export const DeleteCollectionFromDb = createAsyncThunk(
	"collection/delete",
	async (collectionId: string) => {
		await fetch(
			`${serverUrl}collections/deletecollection/${collectionId}`,
			{
				method: "delete",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				},
			}
		);
		return collectionId;
	}
);

const CollectionsSlice = createSlice({
	name: "collections",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(GetCollectionData.fulfilled, (state, action) => {
				state.collections = action.payload;
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
			.addCase(DeleteCollectionFromDb.fulfilled, (state, action) => {
				state.collections = state.collections.filter(
					(c) => c._id !== action.payload
				);
			});
	},
});

export default CollectionsSlice.reducer;

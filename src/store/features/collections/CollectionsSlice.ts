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
	biggestCollections: <CollectionSchemaIF[]>[],
};

export const GetCollectionData = createAsyncThunk(
	"collecion/get",
	async (props: { userId: string; filterText: string }) => {
		const { userId, filterText } = props;
		return await fetch(
			`${serverUrl}collections/getall/${userId}${
				filterText !== "" ? "/" + filterText : ""
			}`
		)
			.then((res) => res.json())
			.then((data: CollectionSchemaIF[]) => {
				return data;
			});
	}
);

export const GetBiggestCollectionsData = createAsyncThunk(
	"collection/biggest",
	async () => {
		return await fetch(`${serverUrl}collections/getbiggest`)
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

export const AddItemToCollection = createAsyncThunk(
	"collection/additem",
	async (params: { collectionId: string; itemId: string }) => {
		const { collectionId, itemId } = params;
		return await fetch(
			`${serverUrl}collections/additemtocollection/${collectionId}/${itemId}`,
			{
				method: "put",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((data: CollectionSchemaIF) => {
				return { data, itemId };
			});
	}
);
export const DeleteItemFromCollection = createAsyncThunk(
	"collection/deleteitem",
	async (params: { collectionId: string; itemId: string }) => {
		const { collectionId, itemId } = params;

		return await fetch(
			`${serverUrl}collections/deleteitemfromcollection/${collectionId}/${itemId}`,
			{
				method: "put",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((data: CollectionSchemaIF) => {
				return { data, itemId };
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
		).catch((err) => console.log(err));
		return collectionId;
	}
);

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

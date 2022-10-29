import { createAsyncThunk } from "@reduxjs/toolkit";
import CollectionSchemaIF from "../../../interfaces/CollectionSchemaIF";
import serverUrl from "../../serverUrl";

export const GetCollectionData = createAsyncThunk(
	"collecion/get",
	async (props: { userId: string; filterText: string }) => {
		const { userId, filterText } = props;
		return await fetch(
			`${serverUrl}collections/getall/${userId}${
				filterText !== "" ? "/" + filterText : ""
			}`,
			{ mode: "cors" }
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
		return await fetch(`${serverUrl}collections/getbiggest`, {
			mode: "cors",
		})
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

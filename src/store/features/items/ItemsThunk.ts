import { createAsyncThunk } from "@reduxjs/toolkit";
import ItemSchemaIF from "../../../interfaces/ItemSchemaIF";
import serverUrl from "../../serverUrl";

export const GetItemsFromDb = createAsyncThunk(
	"items/get",
	async (props: { collectionName: string; filterText: string }) => {
		const { collectionName, filterText } = props;
		return await fetch(
			`${serverUrl}items/getall/${collectionName}${
				filterText !== "" ? "/" + filterText : ""
			}`,
			{ mode: "cors" }
		)
			.then((res) => res.json())
			.then((data: ItemSchemaIF[]) => {
				return data;
			});
	}
);

export const GetLastItems = createAsyncThunk("items/lastadded", async () => {
	return await fetch(`${serverUrl}items/lastadded`, { mode: "cors" })
		.then((res) => res.json())
		.then((data: ItemSchemaIF[]) => {
			return data;
		});
});

export const GetTagItems = createAsyncThunk(
	"items/tagitems",
	async (tagName: string) => {
		return await fetch(`${serverUrl}items/tagitems/${tagName}`, {
			mode: "cors",
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF[]) => {
				return data;
			});
	}
);

export const AddItemToDb = createAsyncThunk(
	"items/add",
	async (item: ItemSchemaIF) => {
		return await fetch(`${serverUrl}items/newitem`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF) => {
				return data;
			});
	}
);

export const EditItemInDb = createAsyncThunk(
	"items/edit",
	async (item: ItemSchemaIF) => {
		return await fetch(`${serverUrl}items/edititem/${item._id}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF) => {
				return data;
			});
	}
);

export const DeleteItemFromDb = createAsyncThunk(
	"items/delete",
	async (itemId: string) => {
		await fetch(`${serverUrl}items/deleteitem/${itemId}`, {
			method: "delete",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
		});
		return itemId;
	}
);

export const AddCommentToDb = createAsyncThunk(
	"items/comments/add",
	async (props: {
		itemId: string;
		comment: { user: string; comment: string };
	}) => {
		const { itemId, comment } = props;
		return await fetch(`${serverUrl}items/comments/addcomment/${itemId}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ comment }),
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF) => {
				return { data, comment };
			});
	}
);

export const AddLikeToDb = createAsyncThunk(
	"items/likes/add",
	async (props: { itemId: string; loginUser: string }) => {
		const { itemId, loginUser } = props;
		return await fetch(`${serverUrl}items/likes/addlike/${itemId}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ loginUser }),
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF) => {
				return { data, loginUser };
			});
	}
);

export const UnLikeFromDb = createAsyncThunk(
	"items/likes/un",
	async (props: { itemId: string; loginUser: string }) => {
		const { itemId, loginUser } = props;
		return await fetch(`${serverUrl}items/likes/unlike/${itemId}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ loginUser }),
		})
			.then((res) => res.json())
			.then((data: ItemSchemaIF) => {
				return { data, loginUser };
			});
	}
);

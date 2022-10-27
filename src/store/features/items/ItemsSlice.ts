import ItemSchemaIF from "../../../interfaces/ItemSchemaIF";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverUrl from "../../serverUrl";

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
	tagItems: <ItemSchemaIF[]>[],
};

export const GetItemsFromDb = createAsyncThunk(
	"items/get",
	async (props: { collectionName: string; filterText: string }) => {
		const { collectionName, filterText } = props;
		return await fetch(
			`${serverUrl}items/getall/${collectionName}${
				filterText !== "" ? "/" + filterText : ""
			}`
		)
			.then((res) => res.json())
			.then((data: ItemSchemaIF[]) => {
				return data;
			});
	}
);

export const GetLastItems = createAsyncThunk("items/lastadded", async () => {
	return await fetch(`${serverUrl}items/lastadded`)
		.then((res) => res.json())
		.then((data: ItemSchemaIF[]) => {
			return data;
		});
});

export const GetTagItems = createAsyncThunk(
	"items/tagitems",
	async (tagName: string) => {
		return await fetch(`${serverUrl}items/tagitems/${tagName}`)
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
			.addCase(GetItemsFromDb.fulfilled, (state, action) => {
				state.collectionItems = action.payload;
			})
			.addCase(GetTagItems.fulfilled, (state, action) => {
				state.tagItems = action.payload;
			})
			.addCase(GetLastItems.fulfilled, (state, action) => {
				state.lastItems = action.payload;
			})
			.addCase(AddItemToDb.fulfilled, (state, action) => {
				state.collectionItems.push(action.payload);
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

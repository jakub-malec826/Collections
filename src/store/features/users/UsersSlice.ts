import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import serverUrl from "../../serverUrl";

import UserDataIF from "../../../interfaces/UserDataIF";

const initialState = {
	users: <UserDataIF[]>[],
};

export const GetAllDataUsers = createAsyncThunk("users/get", async () => {
	return await fetch(`${serverUrl}users/getall`)
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
});

export const SetDataUsers = createAsyncThunk(
	"users/set",
	async (user: UserDataIF) => {
		await fetch(`${serverUrl}users/set/${user._id}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(user),
		});
	}
);

const UsersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		changeStatus: (state, action) => {
			action.payload.map((u: string) => {
				const actualUser = state.users.find((user) => user._id === u);
				if (actualUser)
					actualUser.status === "active"
						? (actualUser.status = "blocked")
						: (actualUser.status = "active");
			});
		},
		changeAdmin: (state, action) => {
			action.payload.map((u: string) => {
				const actualUser = state.users.find((user) => user._id === u);
				if (actualUser) actualUser.isAdmin = !actualUser.isAdmin;
			});
		},
	},
	extraReducers(builder) {
		builder.addCase(GetAllDataUsers.fulfilled, (state, action) => {
			state.users = action.payload;
		});
	},
});

export const { changeStatus, changeAdmin } = UsersSlice.actions;

export default UsersSlice.reducer;

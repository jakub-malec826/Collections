import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import serverUrl from "../../serverUrl";

import UserSchemaIF from "../../../interfaces/UserSchemaIF";

const initialState = {
	users: <UserSchemaIF[]>[],
	status: "idle",
};

export const GetAllDataUsers = createAsyncThunk("users/get", async () => {
	return await fetch(`${serverUrl}users/getall`)
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
});

export const SetUserPrivileges = createAsyncThunk(
	"users/setprivileges",
	async (props: { user: UserSchemaIF; privileges: boolean }) => {
		const { user, privileges } = props;
		await fetch(`${serverUrl}users/setprivileges/${user._id}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ privileges }),
		});
		return { user, privileges };
	}
);

export const SetUserStatus = createAsyncThunk(
	"users/setstatus",
	async (props: { user: UserSchemaIF; status: string }) => {
		const { user, status } = props;

		await fetch(`${serverUrl}users/setstatus/${user._id}`, {
			method: "put",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ status }),
		});
		return { user, status };
	}
);

export const DeleteUser = createAsyncThunk(
	"users/delete",
	async (userId: string) => {
		await fetch(`${serverUrl}users/delete/${userId}`, {
			method: "delete",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
		});
		return userId;
	}
);

const UsersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(GetAllDataUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(GetAllDataUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.status = "success";
			})
			.addCase(SetUserPrivileges.fulfilled, (state, action) => {
				const actualUser = state.users.find(
					(user) => user._id === action.payload.user._id
				);
				if (actualUser) actualUser.isAdmin = action.payload.privileges;
			})
			.addCase(SetUserStatus.fulfilled, (state, action) => {
				const actualUser = state.users.find(
					(user) => user._id === action.payload.user._id
				);
				if (actualUser) actualUser.status = action.payload.status;
			})
			.addCase(DeleteUser.fulfilled, (state, action) => {
				state.users = state.users.filter(
					(u) => u._id !== action.payload
				);
			});
	},
});

export default UsersSlice.reducer;

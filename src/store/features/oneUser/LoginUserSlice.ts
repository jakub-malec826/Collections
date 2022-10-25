import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import UserDataIF from "../../../interfaces/UserDataIF";
import serverUrl from "../../serverUrl";

const tempUser: UserDataIF = {
	_id: "",
	userName: "",
	password: "",
	email: "",
	status: "",
	isAdmin: false,
	collections: [],
};

const initialState = {
	loginUser: <UserDataIF>{},
};

export const getUserData = createAsyncThunk(
	"user/equaluser",
	async (userName: string) => {
		return await fetch(`${serverUrl}users/${userName}`, {
			method: "post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
	}
);

const LoginUserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoginUser: (state, action) => {
			state.loginUser = action.payload;
		},
		deleteloginUser: (state) => {
			state.loginUser = tempUser;
		},
	},
	extraReducers(builder) {
		builder.addCase(getUserData.fulfilled, (state, action) => {
			state.loginUser = action.payload;
		});
	},
});

export const { setLoginUser, deleteloginUser } = LoginUserSlice.actions;

export default LoginUserSlice.reducer;

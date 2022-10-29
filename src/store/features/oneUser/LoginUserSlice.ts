import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bold } from "@uiw/react-md-editor";
import HashPassword from "../../../functions/HashPassword";

import UserSchemaIF from "../../../interfaces/UserSchemaIF";
import UserSendingDataIF from "../../../interfaces/UserSendingDataIF";
import serverUrl from "../../serverUrl";
import { useStoreDispatch } from "../../Store";
import { useNavigate } from "react-router-dom";

const tempUser: UserSchemaIF = {
	_id: "",
	userName: "",
	password: "",
	email: "",
	status: "",
	isAdmin: false,
	collections: [],
};

const initialState = {
	loginUser: <UserSchemaIF>{},
	status: "idle",
	errMess: "",
};

export const ValidateFormWithDb = createAsyncThunk(
	"user/sign",
	async (params: {
		userData: UserSendingDataIF;
		formType: string;
		callback?: Function;
	}) => {
		const { userData, formType, callback } = params;

		userData.password = HashPassword(userData.password);
		return await fetch(`${serverUrl}auth/${formType}`, {
			method: "Post",
			mode: "cors",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((res) => res.json())
			.then((data: { message: string; body: UserSchemaIF | null }) => {
				if (data.message === "OK") callback && callback(data);

				return data;
			});
	}
);

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
		setError: (state, action) => {
			state.errMess = action.payload;
		},
		setLoginUser: (state, action) => {
			state.loginUser = action.payload;
		},
		deleteloginUser: (state) => {
			state.loginUser = tempUser;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(ValidateFormWithDb.pending, (state) => {
				state.status = "loading";
			})
			.addCase(ValidateFormWithDb.fulfilled, (state, action) => {
				state.status = "success";
				state.errMess =
					action.payload.message === "OK"
						? ""
						: action.payload.message;
				if (action.payload.body) state.loginUser = action.payload.body;
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.loginUser = action.payload;
			});
	},
});

export const { setLoginUser, deleteloginUser, setError } =
	LoginUserSlice.actions;

export default LoginUserSlice.reducer;

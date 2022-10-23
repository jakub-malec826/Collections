import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FindActualUser from "../../../connectWithServer/FindActualUser";
import UserDataIF from "../../../interfaces/UserDataIF";

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
	async (params: string) => {
		return await FindActualUser(params);
	}
);

export const LoginUserSlice = createSlice({
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

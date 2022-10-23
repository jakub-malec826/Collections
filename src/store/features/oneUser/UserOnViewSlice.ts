import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FindActualUser from "../../../connectWithServer/User/FindActualUser";
import UserDataIF from "../../../interfaces/UserDataIF";
import CollectionsDataIF from "../../../interfaces/CollectionsDataIF";
import { emptyColl } from "../collections/CollectionFormSlice";

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
	userOnView: <UserDataIF>{},
	collectionOnView: <CollectionsDataIF | undefined>{},
};

export const getUserOnViewData = createAsyncThunk(
	"user/useronview",
	async (params: string) => {
		return await FindActualUser(params);
	}
);

const UserOnViewSLice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserOnView: (state, action) => {
			state.userOnView = action.payload;
		},
		setCollectionOnView: (state, action) => {
			state.collectionOnView = state.userOnView.collections
				? state.userOnView.collections.find(
						(c) => c.name === action.payload
				  )
				: { ...emptyColl };
		},
		deleteUserOnView: (state) => {
			state.userOnView = tempUser;
		},
	},
	extraReducers(builder) {
		builder.addCase(getUserOnViewData.fulfilled, (state, action) => {
			state.userOnView = action.payload;
		});
	},
});

export const { setCollectionOnView, setUserOnView, deleteUserOnView } =
	UserOnViewSLice.actions;

export default UserOnViewSLice.reducer;

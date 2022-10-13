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
    user: <UserDataIF>{},
    userOnView: <UserDataIF>{},
};

export const getUserData = createAsyncThunk(
    "user/equaluser",
    async (params: string) => {
        return await FindActualUser(params);
    }
);

export const getUserOnViewData = createAsyncThunk(
    "user/useronview",
    async (params: string) => {
        return await FindActualUser(params);
    }
);

export const ActualUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = tempUser;
        },
        setUserOnView: (state, action) => {
            state.userOnView = action.payload;
        },
        deleteUserOnView: (state) => {
            state.userOnView = tempUser;
        },
    },
    extraReducers(builder) {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUserOnViewData.fulfilled, (state, action) => {
            state.userOnView = action.payload;
        });
    },
});

export const { setUser, deleteUser, setUserOnView, deleteUserOnView } =
    ActualUserSlice.actions;

export default ActualUserSlice.reducer;

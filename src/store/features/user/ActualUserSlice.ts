import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FindActualUser from "../../../connectWithServer/FindActualUser";
import UserDataIF from "../../../interfaces/UserDataIF";

const initialState = {
    user: <UserDataIF>{},
};

export const getUserData = createAsyncThunk("user/equaluser", async () => {
    return await FindActualUser();
});

export const ActualUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = {
                _id: "",
                userName: "",
                password: "",
                email: "",
                status: "",
                isAdmin: false,
                collections: [],
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const { setUser, deleteUser } = ActualUserSlice.actions;

export default ActualUserSlice.reducer;

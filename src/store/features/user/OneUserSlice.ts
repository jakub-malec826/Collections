import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserDataIF from "../../../interfaces/UserDataIF";

const initialState = {
    user: <UserDataIF>{},
};

export const OneUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
        },
        setUserStatus: (state, action) => {
            state.user.status = action.payload;
        },
        setUserAdminStatus: (state, action) => {
            state.user.isAdmin = action.payload;
        },
        setUserToNull: (state) => {
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
});

export const { setUser, setUserStatus, setUserAdminStatus, setUserToNull } =
    OneUserSlice.actions;

export default OneUserSlice.reducer;

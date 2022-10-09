import { createSlice } from "@reduxjs/toolkit";

import UserDataIF from "../../../interfaces/UserDataIF";

const initialState = {
    users: <UserDataIF[]>[],
};

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = state.users.concat(action.payload);
        },
    },
});

export const { getUsers } = UsersSlice.actions;

export default UsersSlice.reducer;

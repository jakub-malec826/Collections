import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/users/UsersSlice";

const store = configureStore({
    reducer: { userReducer: UserReducer },
});

export default store;

export type UsersState = ReturnType<typeof store.getState>;

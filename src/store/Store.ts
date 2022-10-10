import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/users/UsersSlice";
import OneUserReducer from "./features/user/OneUserSlice";

const reducers = combineReducers({
    userReducer: UserReducer,
    oneUserReducer: OneUserReducer,
});

const store = configureStore({
    reducer: reducers,
});

export default store;

export type UsersState = ReturnType<typeof store.getState>;

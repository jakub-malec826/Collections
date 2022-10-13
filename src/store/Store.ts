import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./features/users/UsersSlice";
import OneUserReducer from "./features/user/ActualUserSlice";
import FormsVisReducer from "./features/offcanvas/FormsVisSlice";

const reducers = combineReducers({
    userReducer: UserReducer,
    oneUserReducer: OneUserReducer,
    formsVisReducer: FormsVisReducer,
});

const store = configureStore({
    reducer: reducers,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export const useStoreDispatch = useDispatch<typeof store.dispatch>;

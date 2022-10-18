import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./features/users/UsersSlice";
import OneUserReducer from "./features/user/ActualUserSlice";
import FormsVisReducer from "./features/Forms/CollectionFormSlice";
import SignFormsReducer from "./features/Forms/SignFormsSlice";
import ItemFormReducer from "./features/Forms/ItemFormSlice";
import CollectionFieldsReducer from "./features/collectionFields/CollectionFieldsSlice";

const reducers = combineReducers({
    UserReducer,
    OneUserReducer,
    FormsVisReducer,
    SignFormsReducer,
    ItemFormReducer,
    CollectionFieldsReducer,
});

const store = configureStore({
    reducer: reducers,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export const useStoreDispatch = useDispatch<typeof store.dispatch>;

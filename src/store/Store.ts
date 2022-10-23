import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./features/users/UsersSlice";
import LoginUserReducer from "./features/oneUser/LoginUserSlice";
import UserOnViewReducer from "./features/oneUser/UserOnViewSlice";
import FormsVisReducer from "./features/collections/CollectionFormSlice";
import SignFormsReducer from "./features/forms/SignFormsSlice";
import ItemFormReducer from "./features/forms/ItemFormSlice";
import CollectionFieldsReducer from "./features/collections/collectionFields/CollectionFieldsSlice";
import CollectionsTopicReducer from "./features/collections/CollectionsTopicSlice";
import ThemeReducer from "./features/theme/ThemeSlice";

const reducers = combineReducers({
	ThemeReducer,
	UserReducer,
	LoginUserReducer,
	UserOnViewReducer,
	FormsVisReducer,
	SignFormsReducer,
	ItemFormReducer,
	CollectionFieldsReducer,
	CollectionsTopicReducer,
});

const store = configureStore({
	reducer: reducers,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export const useStoreDispatch = useDispatch<typeof store.dispatch>;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./features/users/UsersSlice";
import LoginUserReducer from "./features/oneUser/LoginUserSlice";
import CollectionFieldsReducer from "./features/collectionFields/CollectionFieldsSlice";
import CollectionsTopicReducer from "./features/topic/CollectionsTopicSlice";
import ThemeReducer from "./features/theme/ThemeSlice";
import CollectionsReducer from "./features/collections/CollectionsSlice";
import ItemsReducer from "./features/items/ItemsSlice";

const reducers = combineReducers({
	ThemeReducer,
	CollectionsTopicReducer,
	UserReducer,
	LoginUserReducer,
	CollectionsReducer,
	CollectionFieldsReducer,
	ItemsReducer,
});

const store = configureStore({
	reducer: reducers,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export const useStoreDispatch = useDispatch<typeof store.dispatch>;

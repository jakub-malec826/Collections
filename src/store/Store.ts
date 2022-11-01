import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./features/users/UsersSlice";
import LoginUserReducer from "./features/oneUser/LoginUserSlice";

import CollectionFieldsReducer from "./features/collectionFields/CollectionFieldsSlice";
import CollectionsTopicReducer from "./features/topic/CollectionsTopicSlice";

import ThemeReducer from "./features/theme/ThemeSlice";

import CollectionsReducer from "./features/collections/CollectionsSlice";
import ItemsReducer from "./features/items/ItemsSlice";

import TagsReducer from "./features/tags/TagsSlice";
import SearchBarReducer from "./features/searching/SearchBarSlice";

const reducers = combineReducers({
	ThemeReducer,
	CollectionsTopicReducer,
	UserReducer,
	LoginUserReducer,
	CollectionsReducer,
	CollectionFieldsReducer,
	ItemsReducer,
	TagsReducer,
	SearchBarReducer,
});

const store = configureStore({
	reducer: reducers,
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export const useStoreDispatch = useDispatch<typeof store.dispatch>;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverUrl from "../../serverUrl";
import UserSchemaIF from "../../../interfaces/UserSchemaIF";
import CollectionSchemaIF from "../../../interfaces/CollectionSchemaIF";
import ItemSchemaIF from "../../../interfaces/ItemSchemaIF";

type DataBase = UserSchemaIF & CollectionSchemaIF & ItemSchemaIF;

const initialState = {
	searchInput: "",
	searchOutput: <DataBase[]>[],
};

export const SearchInBase = createAsyncThunk(
	"search",
	async (searchInput: string) => {
		return await fetch(`${serverUrl}search/${searchInput}`)
			.then((res) => res.json())
			.then((data: DataBase[]) => {
				return data;
			});
	}
);

const SearchBarSlice = createSlice({
	name: "searchingBar",
	initialState,
	reducers: {
		searchInputChange: (state, action) => {
			state.searchInput = action.payload;
		},
		deleteSearching: (state) => {
			state.searchOutput = [];
			state.searchInput = "";
		},
	},
	extraReducers(builder) {
		builder.addCase(SearchInBase.fulfilled, (state, action) => {
			state.searchOutput = action.payload;
		});
	},
});

export const { searchInputChange, deleteSearching } = SearchBarSlice.actions;

export default SearchBarSlice.reducer;

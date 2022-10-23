import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	theme: "dark",
};

const ThemeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;

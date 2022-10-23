import { createSlice } from "@reduxjs/toolkit";

const locStor = localStorage.getItem("theme");

const initialState = {
	theme: locStor ? locStor : "dark",
};

const ThemeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
			localStorage.setItem("theme", action.payload);
		},
	},
});

export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;

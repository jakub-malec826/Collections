import { createSlice } from "@reduxjs/toolkit";
import CollectionsDataIF from "../../../interfaces/CollectionsDataIF";

export const emptyColl = {
    name: "",
    description: `Hello *world*


Type something and try`,
    topic: "",
    image: "",
    owner: "",
    items: [],
};

const initialState = {
    formVis: false,
    collection: <CollectionsDataIF>emptyColl,
    forEdit: false,
};

export const FormsVisSlice = createSlice({
    name: "formsVis",
    initialState,
    reducers: {
        showForms: (state, action) => {
            state.formVis = true;
            state.collection = action.payload[0];
            state.forEdit = action.payload[1];
        },
        hideForms: (state) => {
            state.formVis = false;
        },
        showSignForms: (state) => {
            state.formVis = true;
        },
    },
});

export const { showForms, hideForms, showSignForms } = FormsVisSlice.actions;

export default FormsVisSlice.reducer;

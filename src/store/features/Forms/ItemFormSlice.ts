import { createSlice } from "@reduxjs/toolkit";

export const emptyItem = {
    name: "",
    tag: [],
};

const initialState = {
    formVis: false,
    items: emptyItem,
    forEdit: false,
};

const ItemFormSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        showItemsForm: (state, action) => {
            state.formVis = true;
            state.items = action.payload[0];
            state.forEdit = action.payload[1];
        },
        hideItemsForm: (state) => {
            state.formVis = false;
        },
    },
});

export const { showItemsForm, hideItemsForm } = ItemFormSlice.actions;

export default ItemFormSlice.reducer;

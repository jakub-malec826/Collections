import { createSlice } from "@reduxjs/toolkit";
import { Offcanvas } from "react-bootstrap";

const initialState = {
    formVis: false,
};

export const FormsVisSlice = createSlice({
    name: "formsVis",
    initialState,
    reducers: {
        showForms: (state) => {
            state.formVis = true;
        },
        hideForms: (state) => {
            state.formVis = false;
        },
    },
});

export const { showForms, hideForms } = FormsVisSlice.actions;

export default FormsVisSlice.reducer;

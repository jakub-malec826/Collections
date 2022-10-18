import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formVis: false,
    formType: "signin",
};

export const SignFormsSlice = createSlice({
    name: "signformVis",
    initialState,
    reducers: {
        showSignForm: (state, action) => {
            state.formVis = true;
            state.formType = action.payload;
        },
        hideSignForm: (state) => {
            state.formVis = false;
        },
    },
});

export const { showSignForm, hideSignForm } =
    SignFormsSlice.actions;

export default SignFormsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: <{ fieldName: string; fieldType: string; fieldDb?: string }[]>[],
    showForm: false,
};

export const CollectionFieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        startValue: (state, action) => {
            state.fields.push({
                fieldName: action.payload.fieldName,
                fieldType: action.payload.fieldType,
            });
        },
        setFields: (state, action) => {
            state.fields.push({
                fieldName: action.payload.fieldName,
                fieldType: action.payload.fieldType,
                fieldDb:
                    action.payload.fieldType === "text" ||
                    action.payload.fieldType === "date" ||
                    action.payload.fieldType === "textarea"
                        ? "String"
                        : action.payload.fieldType === "number"
                        ? "Number"
                        : "Boolean",
            });
        },
        deleteFields: (state) => {
            state.fields = [];
        },
        showFieldsForm: (state) => {
            state.showForm = !state.showForm;
        },
        hideFieldsForm: (state) => {
            state.showForm = false;
        },
    },
});

export const {
    setFields,
    deleteFields,
    showFieldsForm,
    hideFieldsForm,
    startValue,
} = CollectionFieldSlice.actions;

export default CollectionFieldSlice.reducer;

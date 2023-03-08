import { createSlice } from '@reduxjs/toolkit';

 //input fields array
 export const inputArr = [
    {
        name: "name_0",
        type: "columntype_0"
    }
];

//Foormik fields initial values 
export const valInit = {
    worksheetfolder: '',
    worksheetName: '',
    name_0: '',
    columntype_0: ''
};

const dataSlice = createSlice({
    name: 'worksheet/columns',
    initialState: {
        inputArr: inputArr,
        initialValues: valInit,
    },
    reducers: {
        updateInitialValues: (state, action) => {
            state.initialValues = action.payload
        },
        updateInputArr: (state, action) => {
            state.inputArr = action.payload
        },
        
    },
    extraReducers: {
        
    }
})

export const { updateInitialValues, updateInputArr } = dataSlice.actions

export default dataSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { fetchProducts } from 'services/productService'
import { getAllWorksheet } from 'services/workSheetService';

// export const getWorksheets = createAsyncThunk('getWorksheets',async (data) => {
//     const response = await getAllWorksheet(data);
//     //console.log(response.data.results.table);
//     return response.data.results.table;
// })

 //form init
 const formInit = [{
    name: 'name_0',
    type: 'columntype_0',
    loadForm: ''

}];

const formDataInit = [{
    name:'name_0',
    inputName: 'Name',
    type: 'text'

}];

const dataSlice = createSlice({
    name: 'formHandling',
    initialState: {
        inputArr: formInit,
        formData: formDataInit,
        loadForm:false
    },
    reducers: {
        updateInputArr: (state, action) => {
            state.inputArr = action.payload
        },
        updateLoadform: (state, action) => {
            state.loadForm = action.payload
        },
        updateFormData: (state, action) => {
            state.formData = action.payload
        },
    },
    // extraReducers: {
    //     [getWorksheets.fulfilled]: (state, action) => {
    //         state.worksheet = action.payload
    //         //console.log(action.payload);
    //         //state.loading = false
    //     },
    //     [getWorksheets.pending]: (state) => {
    //         //state.loading = true
    //     },
    // }
})

export const { updateInputArr,updateLoadform,updateFormData } = dataSlice.actions

export default dataSlice.reducer

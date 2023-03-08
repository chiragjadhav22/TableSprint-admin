import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { fetchProducts } from 'services/productService'
import { getAllWorksheet } from 'services/workSheetService';
import { insertWorksheetData,getWorksheetData } from "services/workSheetService";

export const insertInWorksheetData = createAsyncThunk('insertInWorksheetData',async (data) => {
    const response = await insertWorksheetData(data);
    console.log(response.data.success);
    return response.data.data.success;
})



const dataSlice = createSlice({
    name: 'worksheetData',
    initialState: {
        // inputArr: formInit,
        // formData: formDataInit,
        // loadForm:false
        insertStatus:false
    },
    reducers: {
        // updateInputArr: (state, action) => {
        //     state.inputArr = action.payload
        // },
        // updateLoadform: (state, action) => {
        //     state.loadForm = action.payload
        // },
        // updateFormData: (state, action) => {
        //     state.formData = action.payload
        // },
    },
    extraReducers: {
        [insertInWorksheetData.fulfilled]: (state, action) => {
            state.insertStatus = true;
            //console.log(action.payload);
            //state.loading = false
        },
        [insertInWorksheetData.pending]: (state) => {
            //state.loading = true
        },
        [insertInWorksheetData.rejected]: (state) => {
            state.insertStatus = false
        },

    }
})

export const {  } = dataSlice.actions

export default dataSlice.reducer

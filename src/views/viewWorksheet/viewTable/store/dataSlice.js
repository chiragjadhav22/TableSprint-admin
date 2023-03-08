import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { fetchProducts } from 'services/productService'
import { getAllWorksheet,getWorksheetColumn,getWorksheetData } from 'services/workSheetService';

export const getWorksheets = createAsyncThunk('getWorksheets',async (data) => {
    const response = await getAllWorksheet(data);
    console.log(response.data.results.worksheet);
    return response.data.results.worksheet;
})

export const getWorksheetsColumnInfo = createAsyncThunk('getWorksheetsColumnInfo',async (data) => {
    const response = await getWorksheetColumn(data);
    console.log(data);
    return response.data.results.worksheet;
})

export const getWorksheetAllData = createAsyncThunk('getWorksheetData',async (data) => {
    const response = await getWorksheetData(data);
    console.log(response.data.results.worksheet);
    return response.data.results.worksheet;
})

const dataSlice = createSlice({
    name: 'getWorksheets',
    initialState: {
        worksheet: [],
        worksheetInfo:[],
        rawWorksheetInfo:[],
        viewWorksheet:'',
        deleteWorksheet:'',
        workSheetData:[]
    },
    reducers: {
        updateDeleteWorksheet: (state, action) => {
            state.deleteWorksheet = action.payload
        },
        updateViewWorksheet:(state, action) => {
            state.viewWorksheet = action.payload
        },
    },
    extraReducers: {
        [getWorksheets.fulfilled]: (state, action) => {
            state.worksheet = action.payload
            //console.log(action.payload);
            //state.loading = false
        },
        [getWorksheets.pending]: (state) => {
            //state.loading = true
        },
        [getWorksheetsColumnInfo.fulfilled]: (state, action) => {
            //state.worksheetInfo = action.payload;
            state.rawWorksheetInfo = action.payload;
            let sheetInfo = action.payload;
            if(sheetInfo.length > 0){
                console.log(sheetInfo);
                
                let columns = [];
                for (let val of sheetInfo) {
                    let obj = {};
                    obj['name'] = val['name'];
                    obj['header'] = val['name'];
                    obj['minWidth'] = 500;
                    columns.push(obj);
                }
                console.log(columns);
               // setTableInfo(columns);
               state.worksheetInfo = columns;
            }
            //console.log(action.payload);
            //state.loading = false
        },[getWorksheetAllData.fulfilled]: (state, action) => {
            state.workSheetData = action.payload;
            //console.log(action.payload);
            //state.loading = false
        },
        [getWorksheetAllData.pending]: (state) => {
            //state.loading = true
        },
        [getWorksheetAllData.rejected]: (state) => {
           // state.insertStatus = false
        },
    }
})

export const { updateDeleteWorksheet,updateViewWorksheet } = dataSlice.actions

export default dataSlice.reducer

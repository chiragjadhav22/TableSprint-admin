import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProductByID, editProduct } from 'services/productService'

export const getProduct = createAsyncThunk('ProductEdit/data/getProductByID', async (data) => {
    const response = await fetchProductByID(data)
    return response.data.result
})

export const updateProduct = async (data) => {
    const response = await editProduct(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'ProductEdit/data',
    initialState: {
        loading: false,
        productData: [],
        
    },
    reducers: {
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getProduct.pending]: (state) => {
            state.loading = true
        },
        [getProduct.rejected]: (state) => {
            state.loading = false;
            state.productData = [];
        },
    }
})

export default dataSlice.reducer

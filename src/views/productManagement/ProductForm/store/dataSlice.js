import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addProduct } from 'services/productService'

export const createProduct = createAsyncThunk('product/create',async (data) => {
    const response = await addProduct(data);
    return response.data.result;
})

export const updateProduct = async (data) => {
    const response = await addProduct(data)
    return response.data
}

export const fetchProductByID = async (data) => {
    const response = await addProduct(data)
    return response.data.result[0];
}

const dataSlice = createSlice({
    name: 'createProduct',
    initialState: {
        loading: false,
        productData: []
    },
    reducers: {
    },
    extraReducers: {
        [createProduct.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [createProduct.pending]: (state) => {
            state.loading = true
        },
    }
})

export default dataSlice.reducer

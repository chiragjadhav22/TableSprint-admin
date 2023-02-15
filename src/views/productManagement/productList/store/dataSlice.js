import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from 'services/productService'

export const getProducts = createAsyncThunk('product/List',async (data) => {
    const response = await fetchProducts(data);
    return response.data.result;
})

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: ''
    }
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}

const dataSlice = createSlice({
    name: 'product/list',
    initialState: {
        loading: false,
        productList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.productList = action.payload
            state.tableData.total = action.payload.count
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { updateProductList, setTableData, setFilterData, setSortedColumn } = dataSlice.actions

export default dataSlice.reducer

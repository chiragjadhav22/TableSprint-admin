import ApiService from './ApiService';

export async function fetchProducts (data) {
    return ApiService.fetchData({
        url: '/product/all',
        method: 'get',
        data
    })
}

export async function addProduct (data) {
    return ApiService.fetchData({
        url: '/product/create',
        method: 'post',
        data
    })
}

export async function editProduct (data) {
    return ApiService.fetchData({
        url: '/product/update',
        method: 'put',
        data
    })
}

export async function fetchProductByID (params) {
    return ApiService.fetchData({
        url: '/product/fetch',
        method: 'get',
        params
    })
}

export async function fetchCategories (data) {
    return ApiService.fetchData({
        url: '/product/categories/all',
        method: 'get',
        data
    })
}

export async function fetchUsageUnits (data) {
    return ApiService.fetchData({
        url: '/product/usage/units/all',
        method: 'get',
        data
    })
}




import ApiService from './ApiService';


export async function createWorksheet(data) {
    return ApiService.fetchData({
        url: '/',
        method: 'post',
        data
    })
}


export async function getAllWorksheet(params) {
    return ApiService.fetchData({
        url: '/id',
        method: 'get',
        params
    })
}

export async function deleteWorksheet(data) {
    return ApiService.fetchData({
        url: '/',
        method: 'put',
        data
    })
}

export async function getWorksheetColumn(params) {
    return ApiService.fetchData({
        url: '/',
        method: 'get',
        params
    })
}

export async function insertWorksheetData(data) {
    return ApiService.fetchData({
        url: '/add',
        method: 'put',
        data
    })
}

export async function getWorksheetData(params) {
    return ApiService.fetchData({
        url: '/all',
        method: 'get',
        params
    })
}




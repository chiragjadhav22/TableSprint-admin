import React from 'react'

const protectedRoute = [
    {
    key: 'home',
    path: '/home',
    component: React.lazy(() => import('views/Home')),
    authority: [],
},

    {
        key: 'productManagement.productList',
        path: '/productManagement-productList',
        component: React.lazy(() => import('views/productManagement/productList')),
        authority: [],
    },
    {
        key: 'workSheet.createWorksheet',
        path: '/workSheet-createWorksheet',
        component: React.lazy(() => import('views/workSheet/createWorksheet')),
        authority: [],
    },
    {
        key: 'workSheet',
        path: '/workSheet',
        component: React.lazy(() => import('views/workSheet')),
        authority: [],
    },
    {
        key: 'viewWorksheet',
        path: '/viewWorksheet',
        component: React.lazy(() => import('views/viewWorksheet')),
        authority: [],
    },
    {
        key: 'viewWorksheet',
        path: '/viewWorksheet-worksheet',
        component: React.lazy(() => import('views/viewWorksheet/viewTable')),
        authority: [],
    },
    {
        key: 'form',
        path: '/viewWorksheet-form',
        component: React.lazy(() => import('views/viewWorksheet/createForm')),
        authority: [],
    },
    {
        key: 'productManagement.category',
        path: '/productManagement-category',
        component: React.lazy(() => import('views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'productManagement.add',
        path: '/productManagement-add',
        component: React.lazy(() => import('views/productManagement/ProductNew')),
        authority: [],
        meta: {
            header: 'Add Product',
        }
    },
    {
        key: 'productManagement.edit',
        path: '/productManagement-edit/:productId',
        component: React.lazy(() => import('views/productManagement/ProductEdit')),
        authority: [],
        meta: {
            header: 'Edit Product',
            data : 'EDIT'
        }
    },

]

export default protectedRoute
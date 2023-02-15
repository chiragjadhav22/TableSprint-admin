import React, { useEffect, useMemo } from 'react'
import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setTableData } from '../store/dataSlice'
import { setSortedColumn, setSelectedProduct } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

const statusColor = {
    "1": { label: 'Active', dotClass: 'bg-emerald-500', textClass: 'text-emerald-500'},
    "0": { label: 'InActive', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const ActionColumn = ({row}) => {

    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/productManagement-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
			<span className={`cursor-pointer p-2 hover:${textTheme}`} onClick={onEdit}>
				<HiOutlinePencil />
			</span>
            <span className="cursor-pointer p-2 hover:text-red-500" onClick={onDelete}>
				<HiOutlineTrash />
			</span>
        </div>
    )
}



const ProductTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total } = useSelector((state) => state.productList.data.tableData)
    const filterData = useSelector((state) => state.productList.data.filterData)
    const loading = useSelector((state) => state.productList.data.loading)
    const data = useSelector((state) => state.productList.data.productList)
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    const tableData = useMemo(() =>
            ({pageIndex, pageSize, sort, query, total}),
        [pageIndex, pageSize, sort, query, total])

    const fetchData = () => {
        dispatch(getProducts({pageIndex, pageSize, sort, query, filterData}))
    }

    const columns = useMemo(() => [
        {
            Header: '#ID',
            accessor: 'id',
            sortable: true
        },
        {
            Header: 'Name',
            accessor: 'name',
            sortable: true
        },
        {
            Header: 'category',
            accessor: 'category',
            sortable: true
        },

        {
            Header: 'Usage Unit',
            accessor: 'usage_unit',
            sortable: true
        },
        {
            Header: 'HSN Code',
            accessor: 'hsn',
            sortable: true
        },
        {
            Header: 'status',
            accessor: 'status',
            sortable: true,
            Cell: props => {
                const { status } = props.row.original
                return (
                    <div className="flex items-center gap-2">
                        <Badge className={statusColor[status].dotClass} />
                        <span className={`capitalize font-semibold ${statusColor[status].textClass}`}>
							{statusColor[status].label}
						</span>
                    </div>
                )
            }
        },
        {
            Header: '',
            id: 'action',
            accessor: (row) => row,
            Cell: props => <ActionColumn row={props.row.original} />
        }
    ], [])

    const onPaginationChange = page => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex =  page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = value => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize =  Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
        dispatch(setSortedColumn(sortingColumn))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{className: 'rounded-md'}}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </>
    )
}

export default ProductTable
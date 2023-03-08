
//import { Input, Button, Checkbox, FormItem, FormContainer, Select } from 'components/ui'
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { deleteWorksheet } from 'services/workSheetService';
import { AiOutlineTable, AiFillDelete } from "react-icons/ai";
import { Card } from 'components/ui'
import { getWorksheets } from './viewTable/store/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './viewTable/store';
import { injectReducer } from 'store/index';
import { ConfirmDialog } from 'components/shared';
import { updateDeleteWorksheet, updateViewWorksheet } from './viewTable/store/dataSlice';
import { use } from 'i18next';

injectReducer('getWorksheet', reducer)

export default function ViewTemplate(props) {

    //const [worksheet, setWorkSheet] = useState([]);
    // let request = {};
    // request["organisation_id"] = localStorage.getItem('organisation_id');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const workSheet = useSelector((state) => state.getWorksheet.data.worksheet);
    console.log(workSheet);
    const deleteWorksheetName = useSelector((state) => state.getWorksheet.data.deleteWorksheet);



    useEffect(() => {
        fetchData();
        // setWorkSheet(getAllWorksheets.data.results.table);
        // getAllWorksheet({ 'organisation_id': 10 }).then((getAllWorksheets) => {
        //     setWorkSheet(getAllWorksheets.data.results.table);
        // })



    }, [])

    const fetchData = () => {
        dispatch(getWorksheets({ 'organisation_id': 99 }))
    }



    function handleWorksheetDelete(workSheetName) {
        console.log('delte')
        console.log(workSheetName);
        deleteWorksheet({ "name": workSheetName }).then((res) => {
            console.log(res);
            fetchData();
            // getAllWorksheet({ 'organisation_id': 10 }).then((getAllWorksheets) => {
            //     setWorkSheet(getAllWorksheets.data.results.table);
            // })

        })


    }

    const handleDeleteSheet = (worksheetName) => {
        setOpen(true);
        dispatch(updateDeleteWorksheet(worksheetName));

    }

    const handleClose = () => {
        console.log('Close')
        setOpen(false)
    }

    const handleConfirm = (item) => {
        console.log('Confirm')
        setOpen(false);
        console.log(item)
        handleWorksheetDelete(item);
    }

    const handleViewWorksheet = (workSheetName) => {
        console.log(workSheetName);
        dispatch(updateViewWorksheet(workSheetName));

    }


    return (
        <div>
            <div className='mx 8' >
                <h1 className=' text-3xl font-light' >My Worksheet(table)</h1>
            </div>
            {/* <div className='flex flex-wrap mt-4'> */}
            <div className='grid lg:grid-cols-5 grid-cols-2 content-center justify-center gap-5 mt-5 '>
                {workSheet.length > 0 ? workSheet.map((item, index) => {
                    return (
                        <div className='m-2 shadow-2xl cursor-pointer' key={item.name} onClick={() => { handleViewWorksheet(item.name) }}>

                            <Card>
                                <Link
                                    className="flex justify-center items-center"
                                    // /viewWorksheet-worksheet/${item.name}
                                    to={`/viewWorksheet-worksheet`}
                                >
                                    <div className='flex flex-col justify-center items-center flex-wrap m-2 w-full'>


                                        <AiOutlineTable className='' />

                                        <p className='text-center break-normal mt-4'>{item.name}</p>

                                    </div>
                                </Link>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => { handleDeleteSheet(item.name) }}
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </Card>

                        </div>
                    )
                }) : 'No worksheet'}
                <ConfirmDialog
                    isOpen={open}
                    onClose={handleClose}
                    onRequestClose={handleClose}
                    type={'danger'}
                    title={'Delete Worksheet'}
                    onCancel={handleClose}
                    onConfirm={() => { handleConfirm(deleteWorksheetName) }}
                    confirmButtonColor={'red-600'}
                >
                    <p>{`Are you sure you want to delete ${deleteWorksheetName}?`}</p>
                </ConfirmDialog>
            </div>
        </div>
    )

}
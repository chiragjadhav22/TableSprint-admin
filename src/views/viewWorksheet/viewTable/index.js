
import Popup from 'reactjs-popup';
import AddRow from '../addRow';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { useState } from 'react';
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { getWorksheetColumn } from 'services/workSheetService';
import reducer from '../viewTable/store';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from 'store/index';
import { getWorksheetsColumnInfo,getWorksheetAllData } from './store/dataSlice';
//import { updateDeleteWorksheet } from './viewTable/store/dataSlice';

injectReducer('getWorksheetsColumnInfo', reducer);
injectReducer('getWorksheet', reducer);



export default function ViewTable(props) {

    const location = useLocation()
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [textsColor, setTextColor] = useState("#000000");
    //const [tableInfo, setTableInfo] = useState([]);
    const dispatch = useDispatch();

    const worksheetsColumnInfo = useSelector((state) => state.getWorksheetsColumnInfo.data.worksheetInfo);
    const worksheetName = useSelector((state) => state.getWorksheet.data.viewWorksheet);
    const workSheetData = useSelector((state)=> state.getWorksheet.data.workSheetData) || [];
    console.log(worksheetsColumnInfo);

    const handleColorChange = (e) => {
        setBackgroundColor("#ffffff");
        setTextColor('#000000')
    };

   

    useEffect(() => {
        console.log('hi')
       // getWorksheetColumn({ name: 'Recruitment_5' }).then((data) => {
        dispatch(getWorksheetsColumnInfo({ name: worksheetName }));
        dispatch(getWorksheetAllData({ name: worksheetName }))
       
        
       // })
    },[worksheetName])
    // let dataSource = [
    //     {

    //         Name: "Shubham",
    //         Phone: 2147483647,
    //         Date: "1990-12-11T18:30:00.000Z"
    //     }
    // ];



    // const columns = [
    //     { name: 'name', header: 'Name', minWidth: 50, defaultFlex: 2 },
    //     { name: 'phone', header: 'Phone', maxWidth: 1000, defaultFlex: 1 },

    // ];



    const gridStyle = { minHeight: 500 };
    // const filterValue = [
    //     { name: 'name', operator: 'startsWith', type: 'string', value: '' },
    //     { name: 'age', operator: 'gte', type: 'number', value: 21 },

    // ];


    // const dataSource = [
    //     { id: 1, name: 'John McQueen', phone: 35},
    //     { id: 2, name: 'Jsadsa', phone: 35 },
    //     { id: 3, name: 'asdsad', phone: 35},
    //     // { id: 1, name: 'John McQueen', age: 35 },
    //     // { id: 2, name: 'Mary Stones', age: 25 },
    //     // { id: 3, name: 'Robert Fil', age: 27 },
    //     // { id: 4, name: 'Roger Robson', age: 81 },
    //     // { id: 5, name: 'Billary Konwik', age: 18 },
    //     // { id: 6, name: 'Bob Martin', age: 18 },
    //     // { id: 7, name: 'Matthew Richardson', age: 54 },
    //     // { id: 8, name: 'Ritchie Peterson', age: 54 },
    //     // { id: 9, name: 'Bryan Martin', age: 40 },
    //     // { id: 10, name: 'Mark Martin', age: 44 },
    //     // { id: 11, name: 'Michelle Sebastian', age: 24 },
    //     // { id: 12, name: 'Michelle Sullivan', age: 61 },
    //     // { id: 13, name: 'Jordan Bike', age: 16 },
    //     // { id: 14, name: 'Nelson Ford', age: 34 },
    //     // { id: 15, name: 'Tim Cheap', age: 3 },
    //     // { id: 16, name: 'Robert Carlson', age: 31 },
    //     // { id: 17, name: 'Johny Perterson', age: 40 },
    // ];

    // useEffect(() => {
    //     //const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    //     //const rquestParam = { id: path }
    //     //fetchData(rquestParam)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname])



    return (
        <>
            <div className='h-screen w-full'>
                <div className="flex items-center justify-start w-auto h-12 bg-purple-medium ">
                    <button className='bg-white rounded-t-lg rounded-b-none px-4 py-2 h-full ml-5 ' onClick={handleColorChange} style={{ backgroundColor: backgroundColor, color: textsColor, outlineOffset: '-5px' }}> {worksheetName}</button>
                    {/* <button className='flex items-center flex-shrink-0 px-5 py-3 ml-4 space-x-2 border border-b-0 rounded-t-lg ' onClick={handleColorChange} style={{ backgroundColor: backgroundColor, color: textsColor, outlineOffset:'-5px' }}> Worksheet 1</button> */}
                    {/* <button className='bg-purple-medium text-white p-2'  > Worksheet 2</button> */}

                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2  gap-1 lg:w-2/3  mt-3 ">
                    <Popup contentStyle={{ width: 'auto', height: 'auto', padding: '0px', border: '0px', maxHeight: '90%', overflow: 'auto' }} trigger={<Button icon={<HiPlusCircle />} className='border-2 border-solid  border-purple-900 rounded-2xl m-2 text-purple-900 ' >

                        Add new Row </Button>} modal nested>
                        {
                            close => (
                                <AddRow close={close} />
                            )
                        }
                    </Popup>
                    <Button icon={<HiPlusCircle />} className='border-2 border-solid   border-purple-900 rounded-2xl m-2 text-purple-900' > Upload Data</Button>
                    <Button className='border-2 border-solid  border-purple-900 rounded-2xl m-2 text-purple-900' > SMS </Button>
                    <Button className='border-2 border-solid   border-purple-900 rounded-2xl m-2 text-purple-900' > Send Email </Button>
                    <Link
                        className="flex justify-center items-center"
                        // /viewWorksheet-worksheet/${item.name}
                        to={`/viewWorksheet-form`}
                    >
                    <Button className='border-2 border-solid   border-purple-900 rounded-2xl m-2 text-purple-900' >
                        Form </Button></Link>

                </div>
                <div className='bg-slate-400 mt-4 '>
                    <ReactDataGrid
                        idProperty="id"
                        columns={worksheetsColumnInfo}
                        dataSource={workSheetData}
                        //defaultFilterValue={filterValue}
                        pagination
                        //rowReorderColumn
                        editable={true}
                        style={gridStyle}
                    />
                </div>
            </div>

        </>
    )
}
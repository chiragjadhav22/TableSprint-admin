
import { Card, FormContainer,Button } from "components/ui";
import { useState } from "react";
import { Form, Formik } from 'formik';
import DynamicForm from "./components/DynamicForm";
import FormCreator from "./components/FormCreator";
import reducer from './store';
import { injectReducer } from 'store/index';
import { useDispatch, useSelector } from "react-redux";
import { updateInputArr,updateLoadform,updateFormData } from "./store/dataSlice";
import { cloneDeep } from "lodash";

injectReducer('formHandling', reducer)
export default function LinkForm() {

    // const loadFormInit = {

    // }
    const dispatch = useDispatch();

   // const [loadForm, setLoadform] = useState(false);
    const formArray = useSelector((s) => s.formHandling.data.inputArr);
    const formData = useSelector((s) => s.formHandling.data.formData);
    const loadForm = useSelector((s) => s.formHandling.data.loadForm);
    const [currentIndex,setCurrentIndex] = useState(0);
    // console.log(formArray);


    //form init
    const formInit = [{
        name: 'name_0',
        type: 'columntype_0',
        loadForm: false

    }];

    //formik initial values
    const valInit = {
        worksheetfolder: '',
        worksheetName: '',
        name_0: '',
        columntype_0: ''
    };



    //const [formArray,setFormArray] = useState(formInit);

    const handleInputClick = (e, name) => {

        // let index = formArray.map(item => item.name).indexOf(name);
        // let newArr = formArray.slice();

        // let newArrObj = cloneDeep(newArr[index]);

        // newArrObj.loadForm = true;
        // // console.log(newArrObj.loadForm);
        // newArr[index] = newArrObj;
        // dispatch(updateInputArr(newArr));
        dispatch(updateLoadform(name));
        // setFormArray((s)=>{
        //     console.log(s);
        //     let newArr = s.slice();
        //     //console.log(newArr[index].loadForm );
        //     newArr[index].loadForm  =  true;
        //     return newArr
        // })
        //function to find index of maximum input fields created
    }

    // function findMaxIndex(values) {
    //     let max = 0;

    //     for (let keys in values) {
    //         let index = keys.split('_');
    //         console.log(index);
    //         if (max < index[1])
    //             max = index[1]
    //     }
    //     max=max+1;

    //     return max;
    // }

   

    const handleOnBlur = (e, name) => {

        let index = formArray.map(item => item.name).indexOf(name);
        let newArr = cloneDeep(formArray.slice());
        newArr[index].loadForm = false;
        dispatch(updateInputArr(newArr));
        // setFormArray((s)=>{
        //     let newArr = s.slice();
        //     newArr[index].loadForm  =  false;
        //     return newArr
        // })



    }

    //function to find index of maximum input fields created
    function findMaxIndex(values) {
        let max = 0;

        for (let keys in values) {
            let index = keys.split('_');
            console.log(index);
            if (max < index[1])
                max = index[1]
        }

        return max;
    }

    function addInputFields(values) {
        // setCurrentIndex((s) => s+1);
        // console.log(currentIndex);
        let index = formArray.length;
        let newArr = cloneDeep(formArray.slice());
     
        setCurrentIndex((s) => s+1);
        console.log(currentIndex);

        let newArrObj = {
                name: `name_${index}`,
                type: `columntype_${index}`,
                loadForm: false
            
            };
            newArr.push(newArrObj);
            dispatch(updateInputArr(newArr));

            let newData = {
                name: `name_${index}`,
                inputName: 'Name',
                type: 'text'
            }
            
            dispatch(updateFormData([...formData,newData]));
            console.log(index);
        }







    return (
        <div className="">
            <Formik
                initialValues={valInit}
                //validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                    //console.log(values);
                    alert(JSON.stringify(formData));
                }
                }
            >{({ values, touched, errors, isSubmitting, setFieldValue }) => (
                <center>
                <Form>
                    <div className="flex-col w-2/3 justify-center">

                        {formArray.map((item, index) => {
                            return (
                                // <button className = 'flex justify-center w-2/3' type='button' onClick={(e) => { handleInputClick(e, item.name) }} onBlur={(e) => { handleOnBlur(e, item.name) }} >
                                <div key={item.name} className=' flex shadow-xl mt-10 bg-white cursor-pointer ' onClick={(e) => { handleInputClick(e, item.name) }} onBlur={(e) => { handleOnBlur(e, item.name) }}>
                                   
                                        {/* <Card> */}
                                            <FormContainer>
                                                {item.name === loadForm ? <FormCreator name={item.name} type={item.type} values={values} setFieldValue = {setFieldValue}/> : <DynamicForm name={item.name} type={item.type} />}
                                            </FormContainer>

                                        {/* </Card> */}
                                    
                                </div>
                                // </button>
                            )

                        })}
                        <Button className='mt-10' type='button' onClick={ () => {addInputFields(values)} }>
                            Add fields
                        </Button>
                        <Button className='mt-10' type='submit'>
                            Submit
                        </Button>

                    </div>
                </Form>
                </center>
            )}
            </Formik>
        </div>
    )

}
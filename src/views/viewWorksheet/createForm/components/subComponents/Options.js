
import React, { useEffect, useState } from 'react'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { HiMinus } from 'react-icons/hi'
import { ImCross } from "react-icons/im";
import { updateFormData } from '../../store/dataSlice';
import { useSelector, useDispatch } from "react-redux";
import { BiCheckbox, BiRadioCircle } from "react-icons/bi";
import { cloneDeep } from 'lodash';

import * as Yup from 'yup'



export default function Options(props) {

    const init = [{ name: 'Option 1' }]

    const { type, name } = props;
    const formData = useSelector((s) => s.formHandling.data.formData);
    console.log(formData);
    const dispatch = useDispatch();
    //const [options,setOptions] = useState([]);
    const [optionsArray, setOptionsArray] = useState([init])


    const [initialValues, setInitialValue] = useState({ value: [] });

    // const validationSchema = Yup.object({
    //     groupName: Yup.string().required('Group Name is required'),
    //     users: Yup.array().of(
    //         Yup.object().shape({
    //             name: Yup.string().required('Name required'),
    //             email: Yup.string()
    //                 .required('Email required')
    //                 .email('Enter valid email'),
    //         })
    //     ),
    // })

    const optionsField = {
        radio: true,
        checkbox: true,
        select: true
    };


    const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        }
    }

    const handleChange = (values) => {
        console.log('blur')
        


        let index = formData.map(item => item.name).indexOf(name);
        console.log(index);
        let newForm = cloneDeep(formData.slice());
        console.log(values.value);
        newForm[index].store = (newForm[index].store || []).concat(values.value).filter(Boolean).filter((obj,index,arr) => 
        index=== arr.findIndex((t) => t.name === obj.name));
        // [...newForm[index].store, ...values.value]
        // .filter((obj,index,arr) => 
        // index=== arr.findIndex((t) => t.name === obj.name));
        console.log(newForm[index].store);
        dispatch(updateFormData(newForm));


    }
    useEffect(() => {
        let index = formData.map(item => item.name).indexOf(name);
        console.log(formData[index].store);
        setOptionsArray(formData[index].store || []);
        setInitialValue({ value: formData[index].store || []})


    }, [])

    const handleAddInput = () => {

        setOptionsArray((s) => {

            let newOptions = cloneDeep(s.slice());
            newOptions.push({ name: '' });
            return newOptions;
        })
     

    }

    const handleRemove = (index) => {
        console.log(index);
        console.log('remove')
        setOptionsArray((s) => {

            let newOptions = cloneDeep(s.slice());
            newOptions.splice(index, 1);
            console.log(newOptions);
            return newOptions;
        });

        let i = formData.map(item => item.name).indexOf(name);
        let newForm = cloneDeep(formData.slice());
        newForm[i].store.splice(index,1);
        dispatch(updateFormData(newForm));



    }

    console.log(optionsArray);

    return (
        <div>
            <Formik
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                //validationSchema={validationSchema}
                initialValues={initialValues}
            >
                {({ touched, errors, values }) => {
                    // let value = values.value
                    // values.value = (options && options.length > 0 && options || values.value);
                    // const value = values.value;
                    // console.log(values.value);
                    // console.log(options);

                    return (

                        <FormContainer >
                            <div>

                                <div>
                                    {optionsArray && optionsArray.length > 0
                                        ? optionsArray.map((item, index) => {

                                            return (
                                                <div className='grid grid-cols-8 ' key={index}>
                                                    <div className='col-span-1'>
                                                        {type === 'checkbox' ? <BiCheckbox size={30} /> : <BiRadioCircle size={30} />}
                                                    </div>
                                                    {/* <div className='flex items-center col-span-4 '> */}

                                                    <FormItem
                                                        label=""
                                                        // invalid={
                                                        //     nameFeedBack.invalid
                                                        // }
                                                        // errorMessage={
                                                        //     nameFeedBack.errorMessage
                                                        // }
                                                        className='col-span-6'

                                                    >
                                                        <Field
                                                            // invalid={
                                                            //     nameFeedBack.invalid
                                                            // }
                                                            //onChange = { }
                                                            placeholder={`${optionsArray.length > 0 && optionsArray[index].name || `Option ${index}`}`}
                                                            name={`value[${index}].name`}
                                                            type="text"
                                                            onBlur={() => { handleChange(values) }}
                                                            component={
                                                                Input
                                                            }
                                                        />
                                                    </FormItem>
                                                    {/* </div> */}
                                                    <div className='col-span-1 '>
                                                        <Button
                                                            className=' '
                                                            shape="circle"
                                                            type='button'
                                                            size='sm'
                                                            icon={
                                                                <ImCross size={10} />
                                                            }
                                                            onClick={() => {
                                                                // value = values.value;
                                                                // remove(
                                                                //     index
                                                                // )
                                                                handleRemove(index);
                                                            }
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                            )
                                        })
                                        : null}
                                    <div className='flex justify-start'>
                                        <Button
                                            type="button"
                                            className="ltr:mr-2 rtl:ml-2"
                                            onClick={() => {
                                                //  value = values.value;
                                                handleAddInput();
                                            }}
                                        >
                                            Add option
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>

                    )
                }}
            </Formik>
        </div>
    )
}




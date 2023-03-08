import { useState, useEffect } from "react";
import { Input, FormItem, Button, FormContainer } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import * as Yup from 'yup';
import { insertWorksheetData } from "services/workSheetService";
import reducer from './store';
import { insertInWorksheetData } from "./store/dataSlice";
import { injectReducer } from 'store/index';
import { getWorksheetAllData } from "../viewTable/store/dataSlice";

injectReducer('insertWorksheetData', reducer);
injectReducer('getWorksheetData', reducer);

export default function AddRow(props) {

    const formInfo = useSelector((state) => state.getWorksheetsColumnInfo.data.rawWorksheetInfo);
    const worksheetName = useSelector((state) => state.getWorksheet.data.viewWorksheet);
    const [validationSchema, setValidationSchema] = useState({});
    const [initialValues, setInitialValue] = useState({});
    const dispatch = useDispatch();
    console.log(formInfo);

      //Dynamically generates yup validation. It is needed when user dynamically removes or add column.
      const dynamicValidationGenerator = formField => {
        let i = 0 ;
        const validateObj = {};
        let validateMapping = {};
        validateMapping['text'] = Yup.string().required(`This field is required`);
        validateMapping['number'] = Yup.number().required(`This field is required`);
        validateMapping['date'] = Yup.date().required(`This field is required`);
        formField.map((field, i) => {
            
            console.log(field);
            Object.assign(validateObj, {
                [`column_data_${i}`]:validateMapping[`${field.type}`]
            });
            i++;
            console.log(validateObj);
            return validateObj;
        });
        return validateObj;
    };

    

    useEffect(() => {
        setValidationSchema(Yup.object().shape({
            ...dynamicValidationGenerator(formInfo)

        }))
        setInitialValue((s)=>{
            let initval = {};
            for( let i in formInfo)
            {
                initval[`column_data_${i}`]='';
            }
            console.log(initval);
            return initval;
        })
       
    }, [])

    // useEffect(() => {
    //     setValidationSchema((s) => {
    //         let obj = {};

    //         for (let val of formInfo) {

    //             obj[`${val.name}`] = '';

    //         }
    //         console.log(obj);
    //         return obj;
    //     })
    // }, [formInfo])

 



  






    return (
        <>

            <div className="flex lg:flex-col items-center justify-center p-4 mx-10 ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={
                        (values) => {
                            console.log(values);
                            let request = {};
                            request['Worksheet_name'] = worksheetName;
                            let i = 0;
                            for (let key in values) {
                                request[`${formInfo[i].name}`] = values[key];
                                i++;
                            }
                            console.log(request);

                            dispatch(insertInWorksheetData(request));
                            dispatch(getWorksheetAllData({ name: worksheetName }))
                            props.close();
                            // await new Promise((resolve) => setTimeout(resolve, 500));
                            // alert(JSON.stringify(values, null, 2));
                        }
                    }
                >
                    {({ values, touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className="flex justify-center font-medium text-black text-lg mb-7"> Add new row </div>
                                {formInfo.map((item, i) => {
                                    return (
                                        <>

                                            <div className="flex flex-col " key={`${item.name}`}>
                                                <FormItem
                                                    label={`${item.name}`}
                                                    invalid={errors[`column_data_${i}`] && touched[`column_data_${i}`]}
                                                    errorMessage={errors[`column_data_${i}`]}
                                                >
                                                    <Field className="border p-2 border-solid border-slate-400 round5xl"
                                                        type={`${item.type}`}
                                                        autoComplete="off"
                                                        name={`column_data_${i}`}
                                                        placeholder=""
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </div>

                                        </>
                                    );
                                })}
                                <div className="flex justify-between m-4">
                                    <Button
                                        className="border-2 border-solid p-2 border-purple-900 text-purple-900 rounded-3xl px-8 m-2"
                                        onClick={() => { props.close() }}
                                        type='button'
                                    > Cancel </Button>
                                    <Button
                                        type="submit"
                                        className="border-2 border-solid p-2 border-purple-900 text-purple-900 rounded-3xl px-8  m-2"
                                        variant='solid'
                                    onClick={()=>{ console.log(errors); console.log(touched); console.log(initialValues)}}

                                    >
                                        Add
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>

                    )}
                </Formik>
            </div>

        </>
    )

}
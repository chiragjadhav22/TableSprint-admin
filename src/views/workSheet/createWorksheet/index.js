import { useEffect, useState } from "react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import { FormContainer, Alert, Notification, toast } from 'components/ui'
//import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { createWorksheet } from 'services/workSheetService'
import WorksheetDetails from "./components/WorksheetDetails";
import CreateColumn from "./components/createColumn";
import reducer from './store';
import { injectReducer } from 'store/index';

injectReducer('createWorksheet', reducer)
export default function CreateTable(props) {

    //state values
    const [validationSchema, setValidationSchema] = useState({});
    const [resultSuccess, setResultSuccess] = useState(false);
    const [resultFail, setResultFail] = useState(false);

    //values from store
    const initialValues = useSelector((state) => state.createWorksheet.data.initialValues);
    const arr = useSelector((state) => state.createWorksheet.data.inputArr);


    const openNotificationSuccess = (type) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                Worksheet successfully created.
            </Notification>
        )
    }

    const openNotificationFailure = (type) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                Error in creating worksheet.
            </Notification>
        )
    }

    //Dynamically generates yup validation. It is needed when user dynamically removes or add column.
    const dynamicValidationGenerator = formField => {
        const validateObj = {};
        formField.map((field, i) => {
            Object.assign(validateObj, {
                [field.name]: Yup
                    .string()
                    .required(`Column name is required`),
                [field.type]: Yup
                    .string()
                    .required(`${'Column type is required'}`),

            });
            return validateObj;
        });
        return validateObj;
    };

    //Updating validation schema when a column is added or removed from the UI
    useEffect(() => {
        setValidationSchema(Yup.object().shape({
            ...dynamicValidationGenerator(arr),
            worksheetName: Yup.string().required('Please enter workSheet name'),
            worksheetfolder: Yup.string().required('Please choose a folder')

        }))
    }, [arr])



    return (
        <div className=' mt-10'>
            {/* {resultSuccess && <Alert className="mb-4" type="success" showIcon>{'Worksheet created'}</Alert>}
            {resultFail && <Alert className="mb-4" type="danger" showIcon>{'Error '}</Alert>} */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={
                    async (values) => {
                        let valArr = [];
                        let request = {};
                        //generating payload to hit create Table API
                        request["organisation_id"] = 99;
                        request['worksheet_name'] = values['worksheetName'];
                        //request['worksheetfolder'] = values['worksheetfolder'];
                        delete values.worksheetName;
                        delete values.worksheetfolder;

                        for (let key in values) {
                            let index = key.split('_');
                            console.log(key);
                            valArr[index[1]] = (valArr[index[1]] || {});
                            key.includes('name') ? valArr[index[1]]['name'] = values[key]
                                : valArr[index[1]]['type'] = values[key];
                        }
                        request['columns'] = valArr;
                        console.log('Submitting')
                        let success;
                        try {
                            success = await createWorksheet(request);
                            console.log(success);
                            if (success.data.success)
                            {
                                openNotificationSuccess('success');
                            }
                        } catch (err) {
                            //setResultFail(true);
                            openNotificationFailure('danger')
                            console.log(err);

                        }
                        console.log(request);
                    }
                }
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <>
                                {/* <div className='lg:flex lg:flex-row justify-around'> */}
                                <div id="main" className="grid lg:grid-cols-5 grid-rows-2  ">
                                    {/* <div className="flex flex-col w-80 ml-5"> */}
                                    <div className="col-span-2">
                                        <WorksheetDetails touched={touched} errors={errors} values={values} />
                                        {/* </div> */}
                                    </div>
                                    <div className="lg:col-span-1 lg:mx-auto my-auto  lg:h-full lg:w-0.5 w-screen h-0.5 bg-gray-300 "></div>
                                    <div className="col-span-2">
                                        <CreateColumn touched={touched} errors={errors} values={values} setFieldValue={setFieldValue} />
                                    </div>
                                </div>
                            </>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
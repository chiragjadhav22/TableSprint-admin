
import { Field, } from "formik";

import { Input, Button, FormItem, Select } from 'components/ui';
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";
import { updateInputArr, updateFormData } from "../store/dataSlice";
import InputOptions from "./InputOptions";

export default function FormCreator(props) {

    const { name, type, values, setFieldValue } = props;
    const dispatch = useDispatch();

    const typeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'date', label: 'Date' },
        { value: 'number', label: 'Numbers' },
        { value: 'radio', label: 'Radio Button' },
        { value: 'select', label: 'Drop Down' },
        { value: 'checkbox', label: 'CheckBox' }
    ]

    const formArray = useSelector((s) => s.formHandling.data.inputArr);
    const formData = useSelector((s) => s.formHandling.data.formData);

    //console.log(formData);

    // function handleBlur(name){
    //     let index = formArray.map(item => item.name).indexOf(name);
    //     let newArr = formArray.slice();

    //      let newArrObj = cloneDeep(newArr[index]);

    //      newArrObj.loadForm = false;
    //      console.log(newArrObj.loadForm);
    //      newArr[index] = newArrObj;
    //     dispatch(updateInputArr(newArr));



    // }

    function addInputFields(name) {
        let newArr = formArray.slice();
        let index = name.split('_')[1];
        let newArrObj = {
            name: `name_${index}`,
            type: `columntype_${index}`,
            loadForm: false

        };
        newArr.push(newArrObj);
        dispatch(updateInputArr(newArr));
    }

    //

    function handleCreate(values) {
        let index = formData.map(item => item.name).indexOf(name);
        let newArr = formData.slice();

        let newArrObj = cloneDeep(newArr[index]);

        newArrObj.type = values[`${type}`];
        newArrObj.inputName = values[`${name}`];
        // console.log(newArrObj.loadForm);
        newArr[index] = newArrObj;
        dispatch(updateFormData(newArr));


    }








    return (
        <div className="grid grid-cols-10 ">
            <div className="col-span-1 h-full w-1 bg-blue-400"></div>
            <div className="col-span-9 mt-5">
                <div id='formCreator' className="grid grid-cols-4 gap-3 w-full mb-10" >
                    <div className="col-span-3">
                        <FormItem
                            label='Name'

                        >
                            <Field type='text' className='w-96' placeholder='text' name={name} size='md' component={Input} >


                            </Field>

                        </FormItem>
                    </div>
                    <div className="col-span-1">
                        <FormItem
                            label='Type'
                        >
                            <Field name={type}
                                placeholder="Please Select"
                                className='w-96'
                            >
                                {({ field, form }) => (
                                    <Select
                                        size="md"
                                        field={field}
                                        form={form}
                                        className="mb-4"
                                        placeholder="Select"
                                        options={typeOptions}
                                        // name={`columntype_${i}`}
                                        // type.value === values[type]
                                        value={typeOptions.filter(types => types.value === values[type])}
                                        onChange={(option) => {
                                            console.log(values[type]);
                                            console.log(values[type]);
                                            console.log(type)
                                            form.setFieldValue(type, option.value)
                                        }}
                                    //onBlur={() => setFieldTouched(`${item.type}`, true)}
                                    ></Select>
                                )}
                            </Field>
                        </FormItem>
                    </div>
                    <div className="col-span-4">
                        <InputOptions type={values[type]} />
                    </div>
                    <div className="col-start-4 col-end-4">
                        <Button onClick={() => { handleCreate(values) }}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
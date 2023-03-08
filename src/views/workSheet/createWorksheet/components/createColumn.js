import { ImCross } from "react-icons/im";
import { Field} from 'formik';
import { Input, Button, FormItem, Select} from 'components/ui'
//import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiPlusCircle } from 'react-icons/hi'
import { updateInitialValues, updateInputArr } from "../store/dataSlice";
import cloneDeep from 'lodash/cloneDeep';

export default function CreateColumn(props) {

    const { values, touched, errors, setFieldTouched, setFieldValue } = props;
    const dispatch = useDispatch();

    const arr = useSelector((state) => state.createWorksheet.data.inputArr);

        //input fields initial values
        const inputArr = [
            {
                name: "name_0",
                type: "columntype_0"
            }
        ];
    
        //formik initial values
        const valInit = {
            worksheetfolder: '',
            worksheetName: '',
            name_0: '',
            columntype_0: ''
        };

    // Options for column type
    const typeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'date', label: 'Date' },
        { value: 'number', label: 'Numbers' }
    ]

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

    const addInput = (values, setFieldTouched) => {
        let index = arr.length;
        // setting initail values for the new added column as they are needed for validation
        for (let keys in values) {
            if (keys.includes(index)) {
                //creating new index so that we can avoid overlapping of same index/input field name in formik
                index = findMaxIndex(values);
                ++index; //setting new input field value
            }
        }

        //updating initial values when we add a new column
        let obj = cloneDeep(values);
        console.log(obj)
        console.log(index);
        Object.assign(obj, {
            [`name_${index}`]: '',
            [`columntype_${index}`]: ''
        })
        dispatch(updateInitialValues(obj));

        //update the array when we add a new column
        let newElem = {
            name: `name_${index}`,
            type: `columntype_${index}`

        }
        let updatedArray = [...arr, newElem];
        console.log('updated array')
        console.log(updatedArray);
        dispatch(updateInputArr(updatedArray));


    };

    const handleRemove = (e, name) => {
        e.preventDefault();

    
        console.log(name);
       
        let newArr = [];

        //removing values from formik
        //setFieldValue(`name_${index}`, '');
        //setFieldValue(`columntype_${index}`, '');

        //removing column from the input array
        newArr = arr.slice();
        let index = newArr.map(input => input.name).indexOf(name);
        console.log(index);
        newArr.splice(index, 1);
        console.log(newArr);
        dispatch(updateInputArr(newArr));
    }

    function handleCancel(){

        dispatch(updateInitialValues(valInit));
        dispatch(updateInputArr(inputArr));

    }

    return (
        <>
            {arr.length > 0 ? arr.map((item, i) => {
                return (
                    <div className="flex " key={`Column ${i + 1}`}  >
                        <div key={`Column ${i + 1}`} className="flex flex-col box-border m-4 w-96 bg-purple-100 p-4 ">
                            <FormItem
                                label={`Column ${i + 1}`}
                                invalid={errors[`${item.name}`] && touched[`${item.name}`]}
                                errorMessage={errors[`${item.name}`]}
                                id={i}
                                key={`Column ${i + 1}`}
                            >
                                <Field className="border my-3 p-2 border-solid border-gray round5xl"
                                    type='text'
                                    name={`${item.name}`}
                                    autoComplete="off"
                                    placeholder='Column name'
                                    component={Input}
                                    size="md"

                                //onBlur={() => setFieldTouched(`${item.name}`, true)}
                                />
                            </FormItem>
                            <FormItem
                                label="Type"
                                key={`${item.type}`}
                                invalid={errors[`${item.type}`] && touched[`${item.type}`]}
                                errorMessage={errors[`${item.type}`]}
                            >
                                <Field name={`${item.type}`}
                                    placeholder="Please Select"
                                    id={i}

                                >
                                    {({ field, form }) => (
                                        <Select

                                            size="sm"
                                            field={field}
                                            form={form}
                                            className="mb-4"
                                            placeholder="Please Select"
                                            options={typeOptions}
                                            // name={`columntype_${i}`}
                                            value={typeOptions.filter(type => type.value === values[`${item.type}`])}
                                            onChange={(option) => {
                                                form.setFieldValue(`${item.type}`, option.value)
                                            }}
                                        //onBlur={() => setFieldTouched(`${item.type}`, true)}
                                        ></Select>
                                    )}
                                </Field>

                            </FormItem>

                        </div>
                        <div key={item.type} className=" flex flex-col  items-center justify-center">
                            {i !== 0 ? <button className="rounded-xl box-border bg-purple-100 p-1" onClickCapture={(e) => { handleRemove(e, item.name) }} >
                                <ImCross id={item.name} />
                            </button> : ''}
                        </div>
                    </div>
                );
            }) : ''}
            <div className=" flex items-center justify-center">
                <Button
                    icon={<HiPlusCircle />}
                    className="border border-solid px-2 border-purple-900 text-purple-900  rounded-lg "
                    onClick={() => { addInput(values, setFieldTouched) }} type="button"> Add new column</Button>
            </div>
            <div className="flex  justify-center m-4">
                <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/worksheet"
                >
                    <Button
                        className="border border-solid p-1 px-4 border-purple-900  text-purple-900  rounded-lg m-2"
                        type="button"
                        onClick={handleCancel}
                        > Cancel
                    </Button>
                </Link>
                <Button
                    className="border border-solid p-1 px-4 border-purple-900  text-purple-900  rounded-lg m-2"
                    type="submit"
                    variant='solid'
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        console.log(errors)

                        console.log(touched)

                    }}
                >
                    Create
                </Button>
            </div>
        </>
    )
}
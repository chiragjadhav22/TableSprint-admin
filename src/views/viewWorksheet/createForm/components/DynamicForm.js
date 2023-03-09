import { Card } from "components/ui";
import { FormItem, Input } from 'components/ui';
import { Field } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiCheckbox, BiRadioCircle } from "react-icons/bi";
export default function DynamicForm(props) {
    // console.log(props);
    //    const {name} = props;
    const formData = useSelector((state) => state.formHandling.data.formData);
    console.log(formData);
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [options, setOptions] = useState([]);

    const optionaLoadObject = {
        radio : <BiRadioCircle />,
        checkbox : <BiCheckbox />
        
    }


    useEffect(() => {
        //console.log(formData);
        if (formData) {
            console.log(formData);
            let index = formData.map(item => item.name).indexOf(props.name);
            setName(() => {
                return formData[index]?.inputName;
            })
            setType(() => {
                return formData[index]?.type;
            })
            setOptions(formData[index].store)

        }

    }, [formData])

    console.log(options);
    return (
        <div className="w-full grid grid-cols-16 mt-3">
            <div className="cols-span-2"></div>
            <div className="cols-span-14 w-full">

                {/* <Card> */}
                {/* { formData.map((item,index)=>{
                    return ( */}
                <div className="m-4">
                    <FormItem label={name} className='w-96'>

                        {options && options.length > 0 ? 
                        //  <Field type={type} placeholder={`Enter ${name}`} name={props.name} size='md' component={Input}>
                        

                        // </Field> 
                     
                        options.map((item,index)=>{
                            console.log(type);
                             return (
                                <div className="flex ">
                                
                                {type !== 'select' ? optionaLoadObject[type] : `${index+1} .`}
                                 <p>{item.name}</p>
                                </div>
                             )
                        
                        })
                        : <Field type={type} placeholder={`Enter ${name}`} name={props.name} size='md' component={Input}>


                        </Field>}
                    </FormItem>
                </div>
                {/* )
                }) */}



                {/* </Card> */}
            </div>

        </div>
    )
}
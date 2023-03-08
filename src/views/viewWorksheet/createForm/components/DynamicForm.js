import { Card } from "components/ui";
import {FormItem,Input} from 'components/ui';
import { Field } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DynamicForm (props){
   // console.log(props);
//    const {name} = props;
   const formData = useSelector((state)=> state.formHandling.data.formData) ;
   console.log(formData);
   const [name,setName] = useState();
   const [type,setType] = useState();

   useEffect(()=>{
    //console.log(formData);
    if(formData){
        console.log(formData);
    let index =  formData.map(item=>item.name).indexOf(props.name);
    setName(()=>{
       return formData[index]?.inputName;
    })
    setType(()=>{
        return formData[index]?.type;
     })
    }

   },[formData])


    return (
        <div className="w-full grid grid-cols-16 mt-3">
             <div className="cols-span-2"></div>
             <div className="cols-span-14 w-full">

            {/* <Card> */}
            {/* { formData.map((item,index)=>{
                    return ( */}
                    <div className="m-4">
                <FormItem label={name} className='w-96'>
                    <Field type={type} placeholder={`Enter ${name}`} name={props.name} size='md' component={Input}>


                    </Field>
                </FormItem>
                </div>
                    {/* )
                }) */}
    
    
            
            {/* </Card> */}
            </div>

        </div>
    )
}
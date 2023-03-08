
import React from 'react'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { Input, Button, FormItem, FormContainer } from 'components/ui'
import { HiMinus } from 'react-icons/hi'
import { ImCross } from "react-icons/im";

import { BiCheckbox,BiRadioCircle } from "react-icons/bi";

import * as Yup from 'yup'

const validationSchema = Yup.object({
    groupName: Yup.string().required('Group Name is required'),
    users: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name required'),
            email: Yup.string()
                .required('Email required')
                .email('Enter valid email'),
        })
    ),
})

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch,
    }
}

const Options  = (props) => {
    const {type} = props;
    console.log(type);
    return (
        <div>
            <Formik
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                validationSchema={validationSchema}
                initialValues={{
                    users: [
                        'option 1'
                    ],
                    groupName: '',
                }}
            >
                {({ touched, errors, values }) => {
                    const users = values.users
                    return (
                        <Form>
                            <FormContainer >
                                <div>
                                   
                                    <FieldArray name="users">
                                        {({ form, remove, push }) => (
                                            <div>
                                                {users && users.length > 0
                                                    ? users.map((_, index) => {
                                                          const nameFeedBack =
                                                              fieldFeedback(
                                                                  form,
                                                                  `users[${index}].name`
                                                              )
                                                          const emailFeedBack =
                                                              fieldFeedback(
                                                                  form,
                                                                  `users[${index}].email`
                                                              )

                                                          return (
                                                              <div className='grid grid-cols-8 ' key={index}>
                                                                <div className='col-span-1'>
                                                                {type === 'checkbox' ? <BiCheckbox size={30}/> : <BiRadioCircle size={30}/>}
                                                                </div>
                                                                {/* <div className='flex items-center col-span-4 '> */}
                                                                  <FormItem
                                                                      label=""
                                                                      invalid={
                                                                          nameFeedBack.invalid
                                                                      }
                                                                      errorMessage={
                                                                          nameFeedBack.errorMessage
                                                                      }
                                                                      className='col-span-6'
                                                               
                                                                  >
                                                                      <Field
                                                                          invalid={
                                                                              nameFeedBack.invalid
                                                                          }
                                                                          placeholder={`Option ${index + 1}`}
                                                                          name={`users[${index}].name`}
                                                                          type="text"
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
                                                                      size='sm'
                                                                      icon={
                                                                          <ImCross size={10}/>
                                                                      }
                                                                      onClick={() =>
                                                                          remove(
                                                                              index
                                                                          )
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
                                                            push({
                                                                name: '',
                                                                email: '',
                                                            })
                                                        }}
                                                    >
                                                        Add option
                                                    </Button>
                                                    </div>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Options 


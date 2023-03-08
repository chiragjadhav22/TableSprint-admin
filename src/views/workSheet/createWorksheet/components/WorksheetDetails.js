

import { Field, } from 'formik';

import { Input, FormItem, Select } from 'components/ui'
//import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'



export default function WorksheetDetails(props) {

    const { values, touched, errors } = props;

    const folderOptions = [
        { value: 'HR', label: 'HR' },
        { value: 'Sales', label: 'Sales' }
    ]

    return (
        <>
            <FormItem
                label='Folder'
                invalid={errors.worksheetfolder && touched.worksheetfolder}
                errorMessage={errors.worksheetfolder}
            >
                <Field name='worksheetfolder'
                    placeholder="Please Select"
                >
                    {({ field, form }) => (
                        <Select
                            size="sm"
                            field={field}
                            form={form}
                            className="mb-4"
                            placeholder="Please Select"
                            options={folderOptions}
                            value={folderOptions.filter(type => type.value === values.worksheetfolder)}
                            onChange={(option) => {
                                form.setFieldValue(field.name, option.value)
                            }}
                        ></Select>
                    )}
                </Field>
            </FormItem>
            <FormItem
                label='Worksheet name'
                invalid={errors.worksheetName && touched.worksheetName}
                errorMessage={errors.worksheetName}
            >
                <Field className="border  p-2 border-solid border-slate-200 "
                    placeholder="Worksheet name"
                    type='text'
                    name='worksheetName'
                    component={Input}
                />
            </FormItem>
        </>
    )
}
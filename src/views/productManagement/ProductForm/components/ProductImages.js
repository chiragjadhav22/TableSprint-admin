import React from 'react'
import { AdaptableCard } from 'components/shared'
import { FormItem, Upload } from 'components/ui'
import { Field } from 'formik'

const ProductImages = props => {

	const { touched, errors } = props

	const beforeUpload = (file) => {
        let valid = true
        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 50000000
        for (let f of file) {
			if (!allowedFileType.includes(f.type)) {
				valid = 'Please upload a .jpeg or .png file!'
			}
            if(f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 500kb!'
            }
		}
        return valid
    }

	const onSetFormFile = (form, field, file) => {
		form.setFieldValue(field.name, (file))
		//form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
	}
	
	return (
		<AdaptableCard className="mb-4">
			<h5>Product Image</h5>
			<p className="mb-6">Add or change image for the product</p>
			<FormItem invalid={errors.imgList && touched.imgList}
					  errorMessage={errors.imgList}>
				<Field name="imgList">
					{({ field, form }) => {
						return (
							<Upload
								beforeUpload={beforeUpload}
								onChange={files => onSetFormFile(form, field, files)}
								onFileRemove={files => onSetFormFile(form, field, files)}
								showList={true}
								uploadLimit={1}
							>
							</Upload>
						) 
					}}
				</Field>
			</FormItem>
		</AdaptableCard>
	)
}

export default ProductImages
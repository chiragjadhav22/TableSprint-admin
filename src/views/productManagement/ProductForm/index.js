import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import ProductInformationFields from './components/productInformationFields'
import ProductImages from './components/ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import reducer from './store'
import { injectReducer } from 'store/index'
import * as Yup from 'yup'

injectReducer('createProduct', reducer)

const validationSchema = Yup.object().shape({
	 productName: Yup.string().required('Product Name Required'),
	 category: Yup.object().required('Choose Category'),
	 hsnCode: Yup.number().required('HSN Code Required'),
	 gst: Yup.number().required('GST Required'),
	 description: Yup.string().required('Description Required'),
	 usageUnit: Yup.object().required('Usage Unit is required'),
	 imgList: Yup.mixed().required('Img required')
})

const ProductForm = forwardRef((props, ref) => {
	const {  initialData, onFormSubmit, onDiscard } = props
	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={
					initialData
				}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)
					onFormSubmit?.(formData, setSubmitting)
				}}
			>
				{({values, touched, errors, isSubmitting}) => (
					<Form>
						<FormContainer>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
								<div className="lg:col-span-2">
									<ProductInformationFields touched={touched} errors={errors} values={values} />
								</div>
								<div className="lg:col-span-1">
									<ProductImages touched={touched} errors={errors} values={values} />
								</div>
							</div>
							<StickyFooter 
								className="-mx-8 px-8 flex items-center justify-between py-4"
								stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"						
							>

								<div className="md:flex items-center">
									<Button 
										size="sm" 
										className="ltr:mr-3 rtl:ml-3"
										onClick={() => onDiscard?.()}
										type="button"
									>
										Discard
									</Button>
									<Button 
										size="sm" 
										variant="solid" 
										loading={isSubmitting} 
										icon={<AiOutlineSave />}
										type="submit"
									>
										Save
									</Button>
								</div>
							</StickyFooter>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</>
	)
})

ProductForm.defaultProps = {
	type: 'edit',
	initialData: {
		id: '',
		productName: '',
		imgList: '',
		category: '',
		hsnCode: '',
		description: '',
		gst:'',
		productStatus: 0,
		usageUnit:''
	}
}

export default ProductForm
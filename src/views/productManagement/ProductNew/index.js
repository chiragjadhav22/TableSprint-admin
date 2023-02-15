import React from 'react'
import ProductForm from '../ProductForm/index'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { addProduct } from 'services/productService'

const ProductNew = () => {
	const navigate = useNavigate()
	const handleFormSubmit = async (values, setSubmitting) => {
		setSubmitting(true)
		var formData = new FormData();
		formData.append('name', values.name);
		formData.append('category', values.category.value);
		formData.append('hsn', values.hsnCode);
		formData.append('description', values.description);
		formData.append('gst', values.gst);
		formData.append('productStatus', values.status.value);
		formData.append('user_id', 1);
		formData.append('usage_unit', values.usageUnit.value);
		formData.append('image', values.imgList[0].img, values.imgList[0].name);
		const success = await addProduct(formData)
		setSubmitting(false)
		if (success) {
			toast.push(
				<Notification title={'Successfuly added'} type="success" duration={2500}>
					Product successfuly added
				</Notification>
				,{
					placement: 'top-center'
				}
			)
			navigate('/productManagement-productList')
		}
	}

	const handleDiscard = () => {
		navigate('/productManagement-productList')
	}

	return (
		<>
			<ProductForm 
				type="new"
				onFormSubmit={handleFormSubmit}
				onDiscard={handleDiscard}
			/>
		</>
	)
}

export default ProductNew
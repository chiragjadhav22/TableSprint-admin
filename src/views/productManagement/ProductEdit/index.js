import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct } from './store/dataSlice'
import ProductForm from '../ProductForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesProductEdit', reducer)

const ProductEdit = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const productData = useSelector((state) => state.salesProductEdit.data.productData)
	const loading = useSelector((state) => state.salesProductEdit.data.loading)
	const fetchData = (data) => {
		dispatch(getProduct(data))
	}

	const handleFormSubmit = async (values, setSubmitting) => {
		setSubmitting(true)
		var formData = new FormData();
		formData.append('id', values.id);
		formData.append('name', values.productName);
		formData.append('category', values.category.value);
		formData.append('hsn', values.hsnCode);
		formData.append('description', values.description);
		formData.append('gst', values.gst);
		formData.append('productStatus', values.status.value);
		formData.append('user_id', 1);
		formData.append('usage_unit', values.usageUnit.value);
		formData.append('image', values.imgList);
		const success = await updateProduct(formData)
		setSubmitting(false)
		if (success) {
			popNotification('updated')
		}
	}

	const handleDiscard = () => {
		navigate('/productManagement-productList')
	}

	const popNotification = (keyword) => {
		toast.push(
			<Notification title={`Successfuly ${keyword}`} type="success" duration={2500}>
				Product successfuly {keyword}
			</Notification>
			,{
				placement: 'top-center'
			}
		)
		navigate('/productManagement-productList')
	}

	useEffect(() => {
		const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
		const rquestParam = { id: path }
		fetchData(rquestParam)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname])

	return (
		<>
			<Loading loading={loading}>
				{!isEmpty(productData) && (
					<>
						<ProductForm 
							type="edit" 
							initialData={productData}
							onFormSubmit={handleFormSubmit}
							onDiscard={handleDiscard}
						/>
					</>
				)}
			</Loading>
			{(!loading && isEmpty(productData)) && (
				<div className="h-full flex flex-col items-center justify-center">
					<DoubleSidedImage 
						src="/img/others/img-2.png"
						darkModeSrc="/img/others/img-2-dark.png"
						alt="No product found!"
					/>
					<h3 className="mt-8">No product found!</h3>
				</div>
			)}
		</>
	)
}

export default ProductEdit
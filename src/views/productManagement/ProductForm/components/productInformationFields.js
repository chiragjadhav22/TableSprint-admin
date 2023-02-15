import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import AsyncSelect from 'react-select/async'
import {fetchCategories, fetchUsageUnits} from 'services/productService'

export const productStatus = [
	{ label: 'Active', value: 1},
	{ label: 'Inactive', value: 0}
]

const productInformationFields = props => {
	const { values, touched, errors } = props

	const loadOptions = async (inputValue) => {
		let response = await fetchCategories({});
		return response.data.result
	}

	const loadUsageUnitOptions = async (inputValue) => {
		let response = await fetchUsageUnits({});
		return response.data.result
	}


	return (
		<AdaptableCard className="mb-4" divider>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="col-span-1">
					<FormItem
						label="Product Name"
						invalid={errors.productName && touched.productName}
						errorMessage={errors.productName}
					>
						<Field
							type="text"
							autoComplete="off"
							name="productName"
							value = {values.productName || ''}
							placeholder="Name"
							component={Input}
						/>
					</FormItem>
				</div>
				<div className="col-span-1">
					<FormItem
						label="Category"
						invalid={errors.category && touched.category}
						errorMessage={errors.category}
					>
						<Field name="category">
							{({ field, form }) => (
								<Select
									isClearable
									field={field}
									form={form}
									loadOptions={loadOptions}
									cacheOptions
									value={values.category}
									defaultOptions
									isSearchable={false}
									onChange={option => option ? form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
									componentAs={AsyncSelect}
								/>
							)}
						</Field>
					</FormItem>
				</div>
			</div>

			<FormItem
				label="Description"
				labelClass="!justify-start"
				invalid={errors.description && touched.description}
				errorMessage={errors.description}
			>
				<Field name="description">
					{({ field, form }) => (
						<RichTextEditor
							value={field.value}
							onChange={val => form.setFieldValue(field.name, val)}
						/>
					)}
				</Field>
			</FormItem>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="col-span-1">
					<FormItem
						label="HSN Code"
						invalid={errors.hsnCode && touched.hsnCode}
						errorMessage={errors.hsnCode}
					>
						<Field
							type="number"
							autoComplete="off"
							name="hsnCode"
							placeholder="HSN Code"
							component={Input}
						/>
					</FormItem>
				</div>

				<div className="col-span-1">
					<FormItem
						label="GST %"
						invalid={errors.gst && touched.gst}
						errorMessage={errors.gst}
					>
						<Field
							type="number"
							autoComplete="off"
							name="gst"
							placeholder="GST"
							component={Input}
						/>
					</FormItem>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

				<div className="col-span-1">
					<FormItem
						label="Usage Unit"
						invalid={errors?.usageUnit && touched.usageUnit}
						errorMessage={errors?.usageUnit}
					>

						<Field name="usageUnit">
							{({ field, form }) => (
								<Select
									isClearable
									loadOptions={loadUsageUnitOptions}
									cacheOptions
									required
									defaultOptions
									isSearchable={false}
									value = {values.usageUnit}
									onChange={option => option ? form.setFieldValue(field.name, {label : option.label, value : option.value}) :form.setFieldValue(field.name, {}) }
									componentAs={AsyncSelect}
								/>
							)}
						</Field>
					</FormItem>
				</div>

				<div className="col-span-1">
					<FormItem
						label="Status"
						invalid={errors.productStatus && touched.productStatus}
						errorMessage={errors.productStatus}
					>
						<Field name="productStatus">
							{({ field, form }) => (
								<Select
									field={field}
									form={form}
									options={productStatus}
									value = {values.productStatus}
									onChange={option => option ? form.setFieldValue(field.name, {label : option.label, value : option.value}) :form.setFieldValue(field.name, {}) }
								/>
							)}
						</Field>
					</FormItem>
				</div>
			</div>

		</AdaptableCard>
	)
}

export default productInformationFields
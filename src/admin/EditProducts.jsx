import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../ui/Loader'
import AdminNavbar from './AdminNavbar'

const EditProducts = () => {
	const { slug } = useParams() // Accessing slug parameter from URL
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		image: '',
		category: 'phone',
		price: '',
		description: '',
	})

	useEffect(() => {
		fetchProduct()
	}, [slug])

	const fetchProduct = async () => {
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.eq('slug', slug)
				.single()

			if (error) {
				throw error
			}

			setProduct(data)
			setFormData({
				title: data.title,
				image: data.image,
				category: data.category,
				price: data.price.toString(),
				description: data.description,
			})
		} catch (error) {
			console.error('Error fetching product:', error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmit = async event => {
		event.preventDefault()

		try {
			const { error, statusText } = await supabase
				.from('products')
				.update({
					title: formData.title,
					image: formData.image,
					category: formData.category,
					price: formData.price,
					description: formData.description,
				})
				.eq('slug', slug)

			if (error) {
				console.error('Error updating product:', error.message)
				throw new Error(statusText)
			}

			alert('Successfully Edited Product')
		} catch (error) {
			console.error('Error updating product:', error)
		}
	}

	if (loading) {
		return <Loader />
	}

	if (!product) {
		return <div>Product not found</div>
	}

	return (
		<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
			<AdminNavbar />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='max-w-3xl mx-auto'>
					<h1 className='text-3xl font-extrabold text-gray-900 text-center mb-8'>
						Edit Product: {product.title}
					</h1>
					<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
						<div className='px-4 py-5 sm:px-6'>
							<form onSubmit={handleSubmit} className='space-y-4'>
								<div>
									<label
										htmlFor='title'
										className='block text-sm font-medium text-gray-700'
									>
										Title
									</label>
									<input
										id='title'
										name='title'
										type='text'
										value={formData.title}
										onChange={e =>
											setFormData({ ...formData, title: e.target.value })
										}
										required
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
								<div>
									<label
										htmlFor='image'
										className='block text-sm font-medium text-gray-700'
									>
										Image URL
									</label>
									<input
										id='image'
										name='image'
										type='text'
										value={formData.image}
										onChange={e =>
											setFormData({ ...formData, image: e.target.value })
										}
										required
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
								<div>
									<label
										htmlFor='category'
										className='block text-sm font-medium text-gray-700'
									>
										Category
									</label>
									<select
										id='category'
										name='category'
										value={formData.category}
										onChange={e =>
											setFormData({ ...formData, category: e.target.value })
										}
										required
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									>
										<option value='phone'>Phone</option>
										<option value='laptop'>Laptop</option>
									</select>
								</div>
								<div>
									<label
										htmlFor='price'
										className='block text-sm font-medium text-gray-700'
									>
										Price
									</label>
									<input
										id='price'
										name='price'
										type='number'
										value={formData.price}
										onChange={e =>
											setFormData({ ...formData, price: e.target.value })
										}
										required
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									/>
								</div>
								<div>
									<label
										htmlFor='description'
										className='block text-sm font-medium text-gray-700'
									>
										Description
									</label>
									<textarea
										id='description'
										name='description'
										rows='3'
										value={formData.description}
										onChange={e =>
											setFormData({ ...formData, description: e.target.value })
										}
										required
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									></textarea>
								</div>
								<div className='flex justify-end space-x-4'>
									<button
										type='submit'
										className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none'
									>
										Update Product
									</button>
									<button
										type='button'
										className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none'
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditProducts

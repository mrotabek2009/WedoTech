import { useState } from 'react'

import { supabase } from '../utils/supabase'
import AdminNavbar from './AdminNavbar'

const AddProducts = () => {
	// eslint-disable-next-line no-unused-vars
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const title = formData.get('title')
		const image = formData.get('image')
		const category = formData.get('category')
		const price = formData.get('price')
		const description = formData.get('description')

		try {
			const { data, error, statusText } = await supabase
				.from('products')
				.insert({
					title,
					image,
					category,
					price,
					description,
				})
				.single()

			if (error) {
				console.error('Error adding product:', error.message)
				throw new Error(statusText)
			}

			setProducts(prevProducts => [...prevProducts, data])
			event.target.reset()
			setLoading(true)
		} catch (error) {
			console.error('Error adding product:', error)
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
			<AdminNavbar />
			<h1 className='text-5xl text-center font-bold my-10'>Add Products</h1>
			<div className='max-w-md mx-auto mt-8'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label
							htmlFor='title'
							className='block text-lg font-medium text-gray-700'
						>
							Title
						</label>
						<input
							autoComplete='off'
							id='title'
							name='title'
							type='text'
							required
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					<div>
						<label
							htmlFor='image'
							className='block text-lg font-medium text-gray-700'
						>
							Image URL
						</label>
						<input
							autoComplete='off'
							id='image'
							name='image'
							type='text'
							required
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					<div>
						<label
							htmlFor='category'
							className='block text-lg font-medium text-gray-700'
						>
							Category
						</label>
						<select
							name='category'
							id='category'
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
							className='block text-lg font-medium text-gray-700'
						>
							Price
						</label>
						<input
							autoComplete='off'
							id='price'
							name='price'
							type='number'
							required
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					<div>
						<label
							htmlFor='description'
							className='block text-lg font-medium text-gray-700'
						>
							Description
						</label>
						<textarea
							id='description'
							name='description'
							rows='3'
							required
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						></textarea>
					</div>
					<div className='flex items-center justify-center'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none'
						>
							{loading ? 'Loading...' : 'Add Product'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProducts

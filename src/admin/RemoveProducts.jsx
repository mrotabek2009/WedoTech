import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import Loader from '../ui/Loader'
import AdminNavbar from './AdminNavbar'

const RemoveProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const { data, error } = await supabase.from('products').select('*')

			if (error) {
				throw error
			}

			setProducts(data)
		} catch (error) {
			console.error('Error fetching products:', error.message)
		} finally {
			setLoading(false)
		}
	}
	const handleRemove = async productId => {
		try {
			const { error } = await supabase
				.from('products')
				.delete()
				.eq('id', productId)

			if (error) {
				throw error
			}

			setProducts(prevProducts =>
				prevProducts.filter(product => product.id !== productId)
			)
		} catch (error) {
			console.error('Error removing product:', error.message)
		}
	}

	if (loading) return <Loader />

	return (
		<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
			<AdminNavbar />
			<h1 className='text-5xl text-center font-bold my-10'>Remove Products</h1>
			<div className='mx-auto mt-8'>
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center'>
					{products.map(product => (
						<li
							key={product.id}
							className='border flex flex-col items-start justify-between p-4 rounded-md mb-10 h-40'
						>
							<h2 className='text-xl font-medium'>{product.title}</h2>
							<p className='text-gray-600 truncate w-[90%]'>
								{product.description}
							</p>
							<button
								onClick={() => handleRemove(product.id)}
								className='mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none'
							>
								Remove Product
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default RemoveProducts

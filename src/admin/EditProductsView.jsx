import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import Loader from '../ui/Loader'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import AdminNavbar from './AdminNavbar'

const EditProductsView = () => {
	const [products, setproducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true

		async function getProducts() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('*')

				setproducts(data)

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					setLoading(false)
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message)
					setLoading(false)
				}
			}
		}

		getProducts()

		return () => {
			isMounted = false
		}
	}, [])

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>
	}

	return (
		<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
			<AdminNavbar />
			<h1 className='text-5xl text-center font-bold my-10'>Edit Products</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5'>
				{products.map(product => (
					<Link
						key={product.id}
						to={`/wedo-tech-admin-dashboard/edit-product/${product.slug}`}
					>
						<div className='cursor-pointer border p-2 w-max rounded-md flex flex-col items-start hover:-translate-y-3 transition-all duration-300'>
							<img
								src={product?.image}
								alt={product.title}
								className='size-72 lg:size-52 object-cover'
							/>
							<p className='font-medium text-xl text-center w-full mb-2'>
								{product?.title}
							</p>
							<Button classNames='m-auto w-full p-[0.5rem]'>
								Edit Product
							</Button>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default EditProductsView

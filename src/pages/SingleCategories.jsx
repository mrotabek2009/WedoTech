/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import Loader from '../ui/Loader'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const SingleCategories = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [products, setProducts] = useState([])

	const { category } = useParams()

	useEffect(() => {
		let isMounted = true

		async function getProducts() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('*')
					.eq('category', category)

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					setProducts(data)
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
	}, [category])

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	return (
		<div>
			<div className='container m-auto px-16 py-10'>
				<Navbar />
				<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-10'>
					{capitalizeFirstLetter(category)}s
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 place-items-center'>
					{products.map(product => (
						<Link key={product.id} to={`/products/${product.slug}`}>
							<div className='h-60 lg:h-72 w-60 lg:w-72 cursor-pointer border p-2 rounded-md flex flex-col items-center hover:-translate-y-3 transition-all duration-300'>
								<img
									src={product?.image}
									alt={product.title}
									className='h-40 !lg:h-60 object-cover m-auto'
								/>
								<p className='font-medium text-xl text-center w-52 lg:w-full mb-2 truncate'>
									{product?.title}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default SingleCategories

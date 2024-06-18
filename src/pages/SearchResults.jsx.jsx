import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const SearchResults = () => {
	const [error, setError] = useState(null)
	const [products, setProducts] = useState([])
	const location = useLocation()
	const searchQuery = new URLSearchParams(location.search).get('q')

	useEffect(() => {
		let isMounted = true

		async function getProducts() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('*')
					.textSearch('title', searchQuery)

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					setProducts(data)
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message)
				}
			}
		}

		if (searchQuery) {
			getProducts()
		}

		return () => {
			isMounted = false
		}
	}, [searchQuery])

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>
	}

	return (
		<div className='min-h-screen max-w-7xl mx-auto px-16 py-10'>
			<Navbar />
			<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-10'>
				From your search: <span className='underline'>{searchQuery}</span>
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5'>
				{products.length > 0 ? (
					products.map(product => (
						<Link key={product.id} to={`/products/${product.slug}`}>
							<div className='cursor-pointer border p-2 w-max rounded-md flex flex-col items-center hover:-translate-y-3 transition-all duration-300'>
								<img
									src={product?.image}
									alt={product.title}
									className='h-72 lg:h-52 object-cover'
								/>
								<p className='font-medium text-xl text-center w-full mb-2'>
									{product?.title}
								</p>
							</div>
						</Link>
					))
				) : (
					<div className='flex justify-center w-full'>
						<h1 className='text-xl !text-center '>Nothing found!</h1>
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchResults

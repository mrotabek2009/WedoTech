import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../ui/Loader'
import Button from '../ui/Button'
import Footer from '../components/Footer'

const Products = () => {
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
			<Navbar />
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5'>
				{products.map(product => (
					<Link key={product.id} to={`/products/${product.slug}`}>
						<div className='cursor-pointer border p-2 w-max rounded-md flex flex-col items-start hover:-translate-y-3 transition-all duration-300'>
							<img
								src={product?.image}
								alt={product.title}
								className='size-72 lg:size-52 object-cover'
							/>
							<p className='font-medium text-xl text-center w-full mb-2'>
								{product?.title}
							</p>
							<Button classNames='m-auto w-full p-[0.5rem]'>See Details</Button>
						</div>
					</Link>
				))}
			</div>
			<Footer />
		</div>
	)
}
export default Products

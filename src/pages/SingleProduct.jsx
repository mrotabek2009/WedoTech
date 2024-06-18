import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import Loader from '../ui/Loader'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../ui/Button'

const SingleProduct = () => {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { slug } = useParams()

	useEffect(() => {
		let isMounted = true

		async function getProduct() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('*')
					.eq('slug', slug)
					.single()

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					setProduct(data)
					setLoading(false)
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message)
					setLoading(false)
				}
			}
		}

		getProduct()

		return () => {
			isMounted = false
		}
	}, [slug])

	if (loading) return <Loader />
	if (error) return <div>Error: {error}</div>
	if (!product) return <div>No product found</div>

	return (
		<div className='container px-16 py-10'>
			<Navbar />
			<div className='flex flex-wrap justify-around'>
				<div className='border p-2 w-max rounded-md flex flex-col items-start'>
					<img
						src={product.image}
						alt={product.title}
						className='size-fit lg:size-96 object-cover'
					/>
				</div>
				<div className='flex items-start flex-col justify-between gap-5 md:gap-0 md:justify-around'>
					<h1 className='font-bold text-3xl w-full mb-2'>{product.title}</h1>
					<p className='text-gray-400 w-[300px] md:w-[500px]'>
						{product.description}
					</p>
					<h3 className='text-5xl font-light'>{product.price}$</h3>
					<Button>Buy now</Button>
				</div>
			</div>
		</div>
	)
}

export default SingleProduct

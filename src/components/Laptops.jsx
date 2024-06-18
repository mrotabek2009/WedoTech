import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { Link } from 'react-router-dom'

const Laptops = () => {
	const [products, setproducts] = useState([])

	useEffect(() => {
		let isMounted = true

		async function getproducts() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('*')
					.eq('category', 'laptop')

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					setproducts(data)
				}
			} catch (err) {
				console.error(err)
			}
		}

		getproducts()

		return () => {
			isMounted = false
		}
	}, [])

	return (
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
					</div>
				</Link>
			))}
		</div>
	)
}

export default Laptops

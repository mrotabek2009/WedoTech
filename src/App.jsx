import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import ProductCard from './components/Card'
import Hero from './components/Hero'
import Laptops from './components/Laptops'
import Navbar from './components/Navbar'
import Smartphones from './components/Smartphones'
import Loader from './ui/Loader'
import { supabase } from './utils/supabase'
import Footer from './components/Footer'

const App = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true

		async function getProducts() {
			try {
				const { error, statusText } = await supabase
					.from('products')
					.select('*')

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
		<>
			<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
				<Analytics />
				<Navbar />
				<Hero />
				<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-10'>
					Latest Products
				</h1>
				<ProductCard />
				<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center my-10'>
					Laptops
				</h1>
				<Laptops />
				<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center my-10'>
					Smartphones
				</h1>
				<Smartphones />
				<Footer />
			</div>
		</>
	)
}

export default App

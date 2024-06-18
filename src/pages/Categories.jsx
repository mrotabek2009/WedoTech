import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import Loader from '../ui/Loader'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Categories = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		let isMounted = true

		async function getCategories() {
			try {
				const { data, error, statusText } = await supabase
					.from('products')
					.select('category')

				if (error) {
					console.error('Error fetching data:', error.message)
					throw new Error(statusText)
				}

				if (isMounted) {
					const uniqueCategories = [...new Set(data.map(item => item.category))] // Ensure categories are unique
					setCategories(uniqueCategories)
					setLoading(false)
				}
			} catch (err) {
				if (isMounted) {
					setError(err.message)
					setLoading(false)
				}
			}
		}

		getCategories()

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
		<div>
			<div className='container px-16 py-10'>
				<Navbar />
				<h1 className='text-2xl lg:text-3xl xl:text-5xl font-bold text-center mb-10'>
					All Categories
				</h1>
				{categories.length === 0 ? (
					<div className='text-center'>No categories found</div>
				) : (
					categories.map((category, index) => (
						<div className='flex justify-center items-center' key={index}>
							<Link
								className='mb-2 w-full rounded-md p-5 bg-black/30 hover:bg-black/50 transition-all'
								to={`/categories/${category}`}
							>
								<h3 className='text-2xl'>{category}</h3>
							</Link>
						</div>
					))
				)}
			</div>
			<Footer />
		</div>
	)
}

export default Categories

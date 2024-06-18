import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<div className='border-t-2 w-full my-10 flex flex-col items-center justify-center'>
			<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center justify-center gap-20 mt-10'>
				<Link
					className='w-32 text-center md:p-2 border rounded-md hover:bg-gray-300/20 transition-all'
					to={'/'}
				>
					Home
				</Link>
				<Link
					className='w-32 text-center md:p-2 border rounded-md hover:bg-gray-300/20 transition-all'
					to={'/products'}
				>
					All Products
				</Link>
				<Link
					className='w-32 text-center md:p-2 border rounded-md hover:bg-gray-300/20 transition-all'
					to={'/laptops'}
				>
					Laptops
				</Link>
				<Link
					className='w-32 text-center md:p-2 border rounded-md hover:bg-gray-300/20 transition-all'
					to={'/phones'}
				>
					Smartphones
				</Link>
				<Link
					className='w-32 text-center md:p-2 border rounded-md hover:bg-gray-300/20 transition-all'
					to={'/categories'}
				>
					Categories
				</Link>
			</div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Footer

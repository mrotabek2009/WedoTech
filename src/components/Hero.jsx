import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const Hero = () => {
	return (
		<div className='w-full h-96 mb-10 rounded-xl flex flex-col gap-10 items-center justify-center m-auto bg-slate-800'>
			<h1 className='text-xl text-center lg:text-3xl xl:text-5xl font-medium text-white'>
				Get exclusive products in{' '}
				<span className='border-b-4 border-b-gray-400 text-gray-400'>
					WedoTech
				</span>
			</h1>
			<Link to={'/products'}>
				<Button>See All Products</Button>
			</Link>
		</div>
	)
}

export default Hero

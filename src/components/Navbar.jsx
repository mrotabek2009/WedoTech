import { NavLink } from 'react-router-dom'
import Search from './Search'

const Navbar = () => {
	return (
		<div className='mb-10 flex flex-wrap justify-between items-center'>
			<div className='m-auto lg:m-0'>
				<NavLink to={'/'}>
					<h1 className='text-3xl font-bold'>WedoTech</h1>
				</NavLink>
			</div>
			<div className='flex items-center gap-10 m-auto lg:m-0'>
				<NavLink
					to={'/products'}
					className={({ isActive }) =>
						isActive ? 'underline underline-offset-2' : ''
					}
				>
					Products
				</NavLink>
				<NavLink
					to={'/categories'}
					className={({ isActive }) =>
						isActive ? 'underline underline-offset-2' : ''
					}
				>
					Categories
				</NavLink>
			</div>
			<div className='flex items-center mt-4 m-auto lg:m-0'>
				<Search />
			</div>
		</div>
	)
}

export default Navbar

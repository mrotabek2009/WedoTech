import { NavLink } from 'react-router-dom'

const AdminNavbar = () => {
	return (
		<div className='mb-10 flex flex-wrap justify-between items-center'>
			<div className='m-auto lg:m-0'>
				<NavLink to={'/'}>
					<h1 className='text-3xl font-bold'>WedoTech Admin</h1>
				</NavLink>
			</div>
			<div className='flex items-center gap-10 m-auto lg:m-0'>
				<NavLink
					to={'/wedo-tech-admin-dashboard/add-product'}
					className={({ isActive }) =>
						isActive ? 'underline underline-offset-2' : ''
					}
				>
					Add products
				</NavLink>
				<NavLink
					to={'/wedo-tech-admin-dashboard/edit-product'}
					className={({ isActive }) =>
						isActive ? 'underline underline-offset-2' : ''
					}
				>
					Edit products
				</NavLink>
				<NavLink
					to={'/wedo-tech-admin-dashboard/remove-product'}
					className={({ isActive }) =>
						isActive ? 'underline underline-offset-2' : ''
					}
				>
					Remove Products
				</NavLink>
			</div>
		</div>
	)
}

export default AdminNavbar

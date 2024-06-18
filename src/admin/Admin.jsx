import { Navigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

const Admin = () => {
	const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

	if (!isAuthenticated) {
		return <Navigate to='/wedo-tech-admin-login' />
	}

	return (
		<div className='min-h-screen max-w-7xl m-auto px-16 py-10'>
			<AdminNavbar />
			<div className='flex items-center justify-center gap-20 h-[70vh]'>
				<Link to={'/wedo-tech-admin-dashboard/add-product'}>
					<Button>Add Products</Button>
				</Link>
				<Link to={'/wedo-tech-admin-dashboard/remove-product'}>
					<Button>Remove Products</Button>
				</Link>
				<Link to={'/wedo-tech-admin-dashboard/edit-product'}>
					<Button>Edit Products</Button>
				</Link>
			</div>
		</div>
	)
}

export default Admin

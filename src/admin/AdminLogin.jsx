import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const AdminLogin = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = e => {
		e.preventDefault()
		// Replace with actual authentication logic
		if (
			username === import.meta.env.VITE_ADMIN_USERNAME &&
			password === import.meta.env.VITE_ADMIN_PASSWORD
		) {
			localStorage.setItem('isAuthenticated', 'true')
			navigate('/wedo-tech-admin-dashboard')
		} else {
			alert('Invalid credentials')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<form
				onSubmit={handleLogin}
				className='w-1/3 bg-white p-8 shadow-md rounded'
			>
				<h2 className='text-2xl mb-4'>Admin Login</h2>
				<div className='mb-4'>
					<label className='block text-gray-700'>Username</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='w-full px-3 py-2 border rounded'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700'>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full px-3 py-2 border rounded'
					/>
				</div>
				<Button type='submit'>Login</Button>
			</form>
		</div>
	)
}

export default AdminLogin

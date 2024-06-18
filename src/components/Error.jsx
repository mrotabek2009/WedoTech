/* eslint-disable react/no-unescaped-entities */

const ErrorPage = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='max-w-md px-6 py-12 bg-white shadow-lg rounded-lg'>
				<div className='flex justify-center items-center mb-6'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-12 w-12 text-red-600'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 011 1v.17l-.58.12a2.51 2.51 0 00-1.04.51L8 7.17V8a1 1 0 11-2 0V7a1 1 0 011-1h2z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					Oops! Something went wrong.
				</h2>
				<p className='text-gray-600 mb-8'>
					We're sorry, but an unexpected error has occurred. Please try again
					later.
				</p>
				<div className='flex justify-center'>
					<button
						onClick={() => window.history.back()}
						className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 focus:outline-none'
					>
						Go Back
					</button>
					<a
						href='/'
						className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none'
					>
						Go to Homepage
					</a>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage

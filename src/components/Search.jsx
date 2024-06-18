import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../ui/Button'

const Search = () => {
	const [value, setValue] = useState('')
	const navigate = useNavigate()

	const handleChange = e => {
		setValue(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		navigate(`/search?q=${value}`)
	}

	return (
		<div>
			<form
				className='flex flex-col items-center gap-3'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					placeholder='Search products...'
					className='outline-none border p-2 rounded-md'
					value={value}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					classNames='h-11 w-full flex justify-center lg:w-auto flex items-center'
				>
					Search
				</Button>
			</form>
		</div>
	)
}

export default Search

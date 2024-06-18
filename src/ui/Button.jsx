/* eslint-disable react/prop-types */
import classNames from 'classnames'

const Button = ({ children, classNames: additionalClasses }) => {
	return (
		<button
			className={classNames(
				'bg-slate-500 rounded-md p-3 text-lg text-white hover:bg-slate-600/50 transition-all',
				additionalClasses
			)}
		>
			{children}
		</button>
	)
}

export default Button

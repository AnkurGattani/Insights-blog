import React from 'react'

function Button({ children, type = 'button', onClick, className = '', ...props }) {
	return (
		<button className={`px-4 py-2 rounded-md bg-black text-white hover:bg-slate-800 duration-300 ${className}`} onClick={onClick} {...props} >
			{children} {/* Button text/label */}
		</button>
	)
}

export default Button
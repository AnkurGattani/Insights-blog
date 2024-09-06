import React from 'react'
import { Login as LogInComponent } from '../components'

function Login() {
	return (
		<div className='w-full h-full'>

			<div className='w-full p-12 flex justify-center items-center'>
				<div className='flex '>
					<LogInComponent />
				</div>
			</div>
		</div>
	)
}

export default Login
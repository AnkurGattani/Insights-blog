import React from 'react'
import { SignUp as SignUpComponent } from '../components'

function SignUp() {
	return (
		<div className='w-full h-full'>

			<div className='w-full p-12 flex justify-center items-center'>
				<div className='flex '>
					<SignUpComponent />
				</div>
			</div>
		</div>
	)
}

export default SignUp
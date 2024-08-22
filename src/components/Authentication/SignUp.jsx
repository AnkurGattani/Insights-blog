import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth'
import { login } from '../../store/slices/authSlice'
import { Button, Input } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'


function SignUp() {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const onSignUp = async (data) => {
		setError('');
		try {
			const session = await authService.signUp(data);
			if (session) {
				const user = await authService.getCurrentUser();
				if (user) {
					dispatch(login(user));
					navigate('/');
				}
			}
		} catch (error) {
			console.log('Error in SignUp :: onSubmit : ', error);
			setError('Invalid email or password');

		}
	}

	return (
		<div className='w-full h-full p-12  flex flex-col items-center justify-center gap-y-12 overflow-hidden rounded-xl border border-gray-400 '>
			<div className='w-24 block align-middle'>
				!nsights
				{/*  Logo */}
			</div>

			<div className='w-full ml-0 flex flex-col items-center justify-center gap-y-6 overflow-visible '>

				<h2 className='block text-center text-xl font-semibold '>
					Welcome aboard!
				</h2>
				<span className='block text-center text-[#475569]'>
					Please enter your details to signup.
				</span>

				<form onSubmit={handleSubmit(onSignUp)} className='mt-8' >
					<Input
						label='Full Name'
						name='name'
						placeholder='Enter your full name...'
						{...register('name', { required: true })
						}
					/>
					<Input
						label='Email Address'
						type='email'
						name='email'
						placeholder='Enter your email...'
						{...register('email', {
							required: true
							// Can add regex for email validation using validate
						})}
					/>
					<Input
						label='Password'
						type='password'
						name='password'
						placeholder='Enter your password'
						{...register('password', { required: true })
						}
					/>

					<Button
						type='submit'
						className='w-full mt-4'
					>
						Sign Up
					</Button>

				</form>

				{
					error && <p className=' mt-2 text-red-500 text-centre'>{error}</p>
				}

				<p className='mt-4 text-center text-base text-[#475569]'>
					Already have an account?&nbsp;
					<Link
						to='/login'
						className='font-bold hover:underline text-black'
					>
						Login
					</Link>
				</p>

			</div>

		</div>
	)
}

export default SignUp
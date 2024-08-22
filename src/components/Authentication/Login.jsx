import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Login as authLogin } from '../../store/slices/authSlice'
import { Button, Input } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { useForm } from 'react-hook-form'


function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState('');

	const onLogin = async (data) => {
		setError('');
		try {
			const session = await authService.login(data);
			if (session) {
				const user = await authService.getCurrentUser();
				if (user) {
					dispatch(authLogin(user));
					navigate('/');
				}
			}
		} catch (error) {
			console.log('Error in Login :: onSubmit : ', error);
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
					Welcome back!
				</h2>
				<span className='block text-center text-[#475569]'>
					Please enter your credentials to login.
				</span>

				<form onSubmit={handleSubmit(onLogin)} className='mt-8' >
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
						Login
					</Button>

				</form>

				{
					error && <p className=' mt-2 text-red-500 text-centre'>{error}</p>
				}

				<p className='mt-4 text-center text-base text-[#475569]'>
					Don&apos;t have an account yet?&nbsp;
					<Link 
						to='/signup'
						className='font-bold hover:underline text-black'
					>
						Sign up
					</Link>
				</p>

			</div>

		</div>
	)
}

export default Login
// This is another way to create logout button. However we have used a different approach by re-using button component from src/components/Button.jsx.

import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { logout } from '../../store/slices/authSlice'

function LogoutBtn() {
	const dispatch = useDispatch();
	// TODO: Add logout from all devices functionality
	const logoutHandler = () => {
		authService.logoutCurrentDevice()
		.then(() => {
			dispatch(logout());
		})
		.catch((error) => {
			console.log('Error in LogoutBtn :: logoutHandler : ', error);
		})
	}
  return (
	<button className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
	onClick={logoutHandler} >
		Logout
	</button>
  )
}

export default LogoutBtn
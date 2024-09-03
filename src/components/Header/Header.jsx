import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth'
import { logout } from '../../store/slices/authSlice'
import { Button } from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    authService.logoutCurrentDevice()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) =>
        console.log('Error in Header :: logoutHandler : ', error));
  }

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      display: true
    },
    {
      name: 'Blogs',
      slug: '/blogs',
      display: true
    },
    {
      name: 'Write',
      slug: '/write',
      display: authStatus
    },
    {
      name: 'My Insights',
      slug: '/my-blogs',
      display: authStatus
    }
  ];

  return (
    <header className='w-full h-[8vh] px-5 py-2 duration-300 fixed z-900 border-b-2 border-black'>
      <div className='w-full h-full mx-auto relative flex justify-between items-center py-3 '>
        <div className='h-full p-2'>
          <Link to="/">
            {/* <img src={logo} alt="logo" className='h-10 w-10' /> */}
            Insights!
          </Link>
        </div>

        <nav className='w-auto h-auto relative left-auto top-auto items-center '>
          <ul className='flex '>
            {navItems.map((item) => {
              item.display ? (
                <NavLink
                  key={item.name} to={item.slug}
                  className={({ isActive }) => ` block pl-3 pr-3 py-2 duration-300 ${isActive ? "underline font-bold" : ""} 
                `} >
                  {item.name}
                </NavLink>) : null;
            })}
          </ul>

        </nav>

        {authStatus ? (
          <Button onClick={logOutHandler}>
            Log Out
          </Button>
        ) : (
          <div>
            <Button>
              <Link to="/login">
                Log In
              </Link>
            </Button>

            <Button className='ml-2'>
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>

        )}
      </div>
    </header>
  )
}

export default Header
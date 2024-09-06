import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth'
import { logout } from '../../store/slices/authSlice'
import { Button } from '../index'
import LogoLight from '../../assets/LogoLight.png'
import threeBars from '../../assets/threeBars.png'
import XIcon from '../../assets/XIcon.png'

function Header() {

  const [isOpen, setIsOpen] = React.useState(false);
  const authStatus = useSelector((state) => state.auth.status)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    authService.logoutCurrentDevice()
      .then(() => {
        dispatch(logout());
        navigate('/');
        setIsOpen(false);
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
    <header className='w-full h-[8vh] px-5 py-2 duration-300 fixed z-900 border-b-2 border-black backdrop-blur-md bg-white/30'>
      <div className='w-full h-full mx-auto relative flex justify-between items-center py-3 '>
        <div className='h-full p-0 flex items-center'>
          <Link to="/">
            <img src={LogoLight} alt="logo" className='h-9 mt-2' />
          </Link>
        </div>

        <nav className='md:block hidden w-auto h-auto relative left-auto top-auto items-center'>
          <ul className='flex '>
            {navItems.map((item) => (
              item.display ? (
                <NavLink
                  key={item.name} to={item.slug}
                  className={({ isActive }) => ` block pl-5 pr-5 py-2 duration-300 hover:bg-zinc-200 rounded-xl text-lg ${isActive ? "underline font-bold" : ""} 
                `} >
                  {item.name}
                </NavLink>) : null
            ))}
          </ul>

        </nav>

        {authStatus ? (
          <Button onClick={logOutHandler} className='hidden md:block'>
            Log Out
          </Button>
        ) : (
          <div className='hidden md:block'>
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

        {/* Mobile Navigation menu */}
        <button className='md:hidden h-10 p-3 rounded-lg text-black' onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <img src={XIcon} alt='XIcon' className='w-8' /> : <img src={threeBars} alt='threeBars' className='w-6' />}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden w-full flex flex-col items-center justify-center  bg-zinc-100`} >
        <ul className='flex flex-col p-4 w-full'>
          {navItems.map((item) => (
            item.display ? (
              <NavLink
                key={item.name} to={item.slug}
                className={({ isActive }) => `block py-2 px-4 text-center duration-300 hover:bg-zinc-200 rounded-xl text-lg ${isActive ? 'underline font-bold' : ''}`}
                onClick={() => setIsOpen(false)} // Close menu on item click
              >
                {item.name}
              </NavLink>
            ) : null
          ))}
          {authStatus ? (
            <Button className='w-full' onClick={logOutHandler}>
              Log Out
            </Button>
          ) : (
            <div>
              <Link to="/login" >
                <Button className='w-full mb-2' onClick={() => setIsOpen(false)} >
                  Log In
                </Button>
              </Link>

              <Link to="/signup">
                <Button className='w-full' onClick={() => setIsOpen(false)} >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header

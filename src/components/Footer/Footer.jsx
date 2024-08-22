import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
	<footer className='w-full h-[6vh] text-black flex items-center justify-center '>
    <p>
      &copy; 2024. All rights reserved. Made with ❤️ by {' '}
    </p>
    <Link 
      to="https://www.linkedin.com/in/ankurgattani/"
      className='font-bold'
      target='_blank'
    >
      Ankur Gattani
    </Link>
  </footer>
  );
}

export default Footer
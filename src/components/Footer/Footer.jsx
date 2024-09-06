import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='w-full h-[6vh] text-black flex items-center md:text-lg text-sm text-center justify-center '>
      <p className='flex items-center justify-around'>
        &copy; 2024. All rights reserved. Made with ❤️ by &nbsp;
        <Link
          to="https://www.linkedin.com/in/ankurgattani/"
          className='font-bold'
          target='_blank'
        >
          Ankur Gattani
        </Link>
      </p>
    </footer>
  );
}

export default Footer
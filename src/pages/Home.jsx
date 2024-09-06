import React from 'react'
import illustration from '../assets/illustration.png'
import Button from '../components/Miscellaneous/Button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full py-8 md:flex items-center justify-center'>

      <div className='md:w-1/2 w-full p-8'>
        <h1 className='md:text-5xl text-3xl md:w-6/8 w-full font-bold '>Unlock the Power of Knowledge: Discover the Latest Insights!</h1>

        <p className='text-center md:text-lg text-base mt-4'>Welcome to the world of knowledge! Here, you can find the latest insights on a wide range of topics from technology to personal growth. So why wait? Start exploring today!</p>
        <div className='flex items-center justify-center'>
          <Button className='mt-4' >
            <Link to='/blogs'>
              Explore Insights!
            </Link>
          </Button>
        </div>
      </div>

      <div className='md:w-1/2 w-full block'>
        <img className='w-full' src={illustration} alt='knowledge' />
      </div>


    </div>
  )
}

export default Home
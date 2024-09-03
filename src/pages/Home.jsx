import React from 'react'
import illustration from '../assets/illustration.png'
import Button from '../components/Miscellaneous/Button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full py-8 flex items-center justify-center'>

      <div className='w-1/2 block'>
        <h1 className='text-3xl font-bold text-center'>Unlock the Power of Knowledge: Discover the Latest Insights!</h1>

        <p className='text-center mt-4'>Welcome to the world of knowledge! Here, you can find the latest insights on a wide range of topics from technology to personal growth. So why wait? Start exploring today!</p>

        <Button className='mt-4' >
          <Link to='/blogs'>
            Explore Insights!
          </Link>
        </Button>
      </div>

      <div className='w-1/2 block'>
        <img className='w-full' src={illustration} alt='knowledge' />
      </div>


    </div>
  )
}

export default Home
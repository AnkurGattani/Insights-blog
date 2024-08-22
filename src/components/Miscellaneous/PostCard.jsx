import React from 'react'
import storageService from '../../services/storage'
import { Link } from 'react-router-dom'

function PostCard( {$id, title, featuredImage, author } ) {
  return (
	<div className='w-[300px] md:w-1/3 p-3 flex justify-center items-center text-center border border-black border-opacity-50'>
		<Link to={`/post/${$id}`}>
			<div className='w-full h-full'>
				<img 
				src={storageService.getFilePreview(featuredImage)} 
				alt={title} className='rounded-xl mb-4'/>

				<h2 className='text-xl font-bold'>
					{title}
				</h2>

				<h3 className='text-sm font-semibold text-gray-500'>
					{author}
				</h3>
			</div>
		</Link>
	</div>
  )
}

export default PostCard
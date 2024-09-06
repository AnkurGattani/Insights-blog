import React from 'react'
import storageService from '../../services/storage'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import Button from './Button';

function PostCard({ $id, title, featuredImage, content, author }) {
	return (

		<div className='w-[310px] h-[450px] bg-white border border-gray-200 rounded-lg shadow'>
			<Link to={`/blogs/${$id}`}>
				<div className='w-full h-full p-5 flex flex-col items-center'>
					<img
						src={storageService.getFilePreview(featuredImage)}
						alt={title} className='rounded-lg h-[200px] w-[300px] object-cover' />

					<div className="w-full h-[71px] mb-2 mt-1 overflow-hidden relative">
						<h2
							className="text-2xl font-bold tracking-tight text-gray-900 content overflow-hidden text-ellipsis"
							style={{
								display: '-webkit-box',
								WebkitLineClamp: '2', // Number of lines to show
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								lineHeight: '2rem', // Adjust based on font size
								maxHeight: '4em' // Adjust based on line height and number of lines
							}}
						>
							{title}
						</h2>
					</div>

					<div className="w-full h-[60px] mb-2 overflow-hidden relative">
						<p
							className="content overflow-hidden text-ellipsis"
							style={{
								display: '-webkit-box',
								WebkitLineClamp: '2', // Number of lines to show
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								lineHeight: '1.3em', // Adjust based on font size
								maxHeight: '3em' // Adjust based on line height and number of lines
							}}
						>
							{parse(content)}
						</p>
					</div>

					<h3 className='text-sm font-semibold mb-2 text-gray-800'>
						<i>By <b>{author}</b></i>
					</h3>
					<div className='w-full flex justify-center items-center'>
						<Button>
							Read Insight
						</Button>
					</div>

				</div>
			</Link>
		</div>
	)
}

export default PostCard
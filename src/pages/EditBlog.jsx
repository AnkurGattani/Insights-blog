import React, { useState, useEffect } from 'react'
import { PostForm } from '../components'
import storageService from '../services/storage'
import { useParams, useNavigate } from 'react-router-dom'

function EditBlog() {
	const [post, setPost] = useState(null);
	const slug = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPost() {
			setPost(await storageService.getPost(slug));
		}
		fetchPost();
	}, []);

	return post ? (
		<div className='w-full max-w-7xl mx-auto p-4'>
			<PostForm post={post} />
		</div>
	) : null;
}

export default EditBlog
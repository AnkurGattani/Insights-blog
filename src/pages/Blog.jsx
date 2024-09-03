import React, { useEffect, useState } from 'react'
import storageService from '../services/storage'
import { parse } from 'html-react-parser'
import authService from '../services/auth'
import { Button } from '../components'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog } from '../store/slices/blogSlice'


function Blog() {
	const [post, setPost] = useState(null);
	// const [user, setUser] = useState(null);
	const slug = useParams();
	console.log("slug from Blog Page: ", slug);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// fetch post using slug
	useEffect(() => {
		async function fetchPost() {
			try {
				const response = await storageService.getPost(slug);
				if (response) {
					setPost(response);
				}
			} catch (error) {
				console.log("Error in Blog Page :: fetchPost : ", error);
			}
		}
		fetchPost();
	}, []);

	// fetch current user from database(brute force)
	// useEffect(() => {
	// 	async function fetchUser() {
	// 		try {
	// 			const response = await authService.getCurrentUser();
	// 			if(response) {
	// 				setUser(response);
	// 			}
	// 		} catch (error) {
	// 			console.log("Error in Blog Page :: fetchUser : ", error);
	// 		}
	// 	}
	// 	fetchUser();
	// }, []);

	// fetch current user from redux store(optimized)
	const user = useSelector((state) => state.auth.userData);

	if (post) {
		console.log("Post from Blog Page: ", post);
		return (
			<div className='w-full flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-bold mt-4'>
					{post.title}
				</h1>
				<h3 className='text-xl mt-2'>Author: <strong> {post.userID} </strong></h3>
				<img src={post.featuredImage} alt={post.title} className='w-[80%] h-[400px] object-cover mt-4'
				/>
				<p className='text-xl mt-2'>
					{parse(post.content)}
				</p>

				{
					user && user === post.userID && (
						<div className='my-4 flex'>
							<Button>
								<Link to={`/edit/${slug}`}>Edit Post</Link>
							</Button>
							<Button className='bg-red-500' onClick={async () => {
								const response = await storageService.deletePost(slug);
								if (response) {
									storageService.deleteFile(post.featuredImage);
									dispatch(deleteBlog(slug));
									navigate('/');
								}
							}}>
								Delete Post
							</Button>
						</div>
					)
				}

			</div>
		)
	} else {
		return (
			<div className='w-[80%] flex flex-col items-center justify-center'>
				<div className='text-2xl font-bold'>It looks like the URL you entered might be incorrect. Could you please double-check it and try again?</div>
				<Button>
					<Link to="/">Go to Home</Link>
				</Button>
			</div>
		)
	}
}

export default Blog
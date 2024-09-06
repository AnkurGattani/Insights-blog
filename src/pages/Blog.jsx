import React, { useEffect, useState } from 'react'
import storageService from '../services/storage'
import parse from 'html-react-parser'
import { Button } from '../components'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog } from '../store/slices/blogSlice'
// import authService from '../services/auth'	// for fetching current user from database(brute force)


function Blog() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const { slug } = useParams();
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
					setLoading(false);
				} else {
					setLoading(false);
				}
			} catch (error) {
				console.log("Error in Blog Page :: fetchPost : ", error);
				setLoading(false);
			}
		}
		fetchPost();
	}, []);

	// fetch current user from database(brute force)
	// const [user, setUser] = useState(null);
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


	return (
		<div className='w-full min-h-[85vh] flex items-center justify-center'>
			<div className=' min-h-[85vh] md:w-[90%] w-full flex flex-row items-center justify-center text-xl font-medium '>
				{
					loading ? (
						<>
							<h1 className='text-2xl items-center justify-center'> Loading... </h1>
						</>
					) : (
						post ? (
							<div className='min-h-[85vh] md:w-[90%] w-full md:p-10 p-5 justify-center items-center flex flex-col gap-6' >
								<h1 className=' font-bold md:text-3xl text-xl'>{post && post.title}</h1>
								<p className='text-lg'>Author: {post && post.author}</p>

								<img src={storageService.getFilePreview(post.featuredImage)} alt={post && post.title} className='md:w-[50%] w-[90%]' />
								<p className='text-pretty font-normal'>{post && parse(post.content)}</p>

								{
									user && user.$id === post.userID && (
										<div className='my-4 flex gap-6'>
											<Button>
												<Link to={`/blogs/${slug}/edit`}>Edit Post</Link>
											</Button>
											<Button className='bg-red-500' onClick={async () => {
												const response = await storageService.deletePost(slug);
												if (response) {
													storageService.deleteFile(post.featuredImage);
													dispatch(deleteBlog(post.$id));
													navigate('/');
												}
											}}>
												Delete Post
											</Button>
										</div>
									)
								}
							</div>
						) : (
							<div className='w-[80%] flex flex-col items-center justify-center'>
								<div className='text-2xl font-bold mb-6'>
									<div className='w-full text-center'>
										<strong>Oops! Error 404 - Insight not found! </strong>
									</div>
									<br />

									Seems like the URL you entered is incorrect. Could you please re-check it and try again?
								</div>
								<Button>
									<Link to="/">Go to Home</Link>
								</Button>
							</div>
						)
					)
				}


			</div>

		</div>
	)
}

export default Blog
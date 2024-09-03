import React, { useEffect, useState } from 'react'
import storageService from '../services/storage'
import { PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { populateBlogs } from '../store/slices/blogSlice';


function AllBlogs() {
	const [posts, setPosts] = useState([]);	// state to store all posts
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const blogsData = useSelector(state => state.blog);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await storageService.getAllPosts();
				console.log("All posts response :: ", response);

				if (response.documents) {
					setPosts(response.documents);
					dispatch(populateBlogs(response.documents));
				}


			} catch (error) {
				console.log("Error fetching posts :: AllBlogs.jsx", error);
			}
			setLoading(false);
		}

		if (blogsData.blogs.length === 0) {
			fetchPosts();
		} else {
			setPosts(blogsData.blogs);
			setLoading(false);
		}
	}, []);	// fetch all posts from the server

	return (
		<div className='w-full min-h-[85vh] flex items-center justify-center'>
			<div className='w-full flex flex-wrap items-center justify-center gap-6 p-6'>
				{
					loading ? (
						<>
							<h1 className='text-2xl items-center justify-center'> Loading... </h1>
						</>
					) : (
						posts.length === 0 ? (
							<h1 className='text-2xl items-center justify-center'> No Insights to display! </h1>
						) : (
							posts.map((post) => (
								<PostCard
									key={post.$id}
									$id={post.$id}
									title={post.title}
									featuredImage={post.featuredImage}
									author={post.author}
								/>
							))
						)

					)
				}

			</div>

		</div>
	)
}

export default AllBlogs
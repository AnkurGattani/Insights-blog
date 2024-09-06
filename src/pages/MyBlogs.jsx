import React, { useState, useEffect } from 'react'
import storageService from '../services/storage'
import { PostCard, Button } from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';

function MyBlogs() {
	const [posts, setPosts] = useState([]);	// state to store all posts
	const [loading, setLoading] = useState(true);

	const user = useSelector(state => state.auth.userData);
	console.log("User from MyBlogs: ", user);

	useEffect(() => {
		async function fetchMyPosts() {
			try {
				const response = await storageService.getAllPosts([Query.equal("userID", user.$id)]);
				if (response) {
					setPosts(response.documents);
				}
			} catch (error) {
				console.log("Error fetching posts :: MyBlogs.jsx ", error);
			}
			setLoading(false);
		}
		fetchMyPosts();
	}, []);

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
							<div className='w-full'>
								<h1 className='text-2xl items-center justify-center'> You've not shared any insights. Share one today! </h1>
								<Button >
									<Link to={'/write'}>
										Add Insights!
									</Link>
								</Button>
							</div>

						) : (
							posts.map((post) => (
								<PostCard
									key={post.$id}
									$id={post.$id}
									title={post.title}
									featuredImage={post.featuredImage}
									content={post.content}
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

export default MyBlogs
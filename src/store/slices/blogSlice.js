import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	blogs: []
};

const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		populateBlogs: (state, action) => {
			state.blogs = action.payload;
		},
		addBlog: (state, action) => {
			state.blogs.push(action.payload);
		},
		updateBlog: (state, action) => {
			const index = state.blogs.findIndex(blog => blog.slug === action.payload.slug);
			if (index !== -1) {
				state.blogs[index] = action.payload;
			}
		},
		deleteBlog: (state, action) => {
			state.blogs = state.blogs.filter(blog => blog.slug !== action.payload);
		}
	}
});

export const { populateBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
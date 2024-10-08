import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE } from '../index'
import storageService from '../../services/storage'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, addBlog } from '../../store/slices/blogSlice'

function PostForm({ post }) {
  // console.log("Post from PostForm: ",post);
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
    {
      defaultValues: {
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'draft',
      }
    }
  );
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const author = userData.name;

  const submit = async (data) => { // data contains the new/updated form data
    console.log("Data from PostForm: ", data);
    if (post) {
      const imageFile = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;  // upload the new image

      if (imageFile) {
        storageService.deleteFile(post.featuredImage);  // delete the old image
      }

      const updatedPost = await storageService.updatePost(post.$id, {
        ...data,  // spread the new form data
        featuredImage: imageFile ? imageFile.$id : undefined  // this needs to be overwritten with the new image ID because we changed the image above
      });

      console.log("Updated Post from PostForm: ", updatedPost);

      if (updatedPost) {
        dispatch(updateBlog(updatedPost));  // update the post in the redux store
        navigate(`/blogs/${updatedPost.$id}`);  // redirect to the updated post
      }

    } else { // if post is not available, then it's a new post

      const imageFile = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;  // upload the new image

      if (imageFile) {
        const imageID = imageFile.$id;
        data.featuredImage = imageID;  // add the image ID to the form data

        const newPost = await storageService.createPost({ ...data, userID: userData.$id, author: author });  // create a new post with the data

        if (newPost) {
          dispatch(addBlog(newPost));  // add the new post to the redux store
          navigate(`/blogs/${newPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((title) => {  // function to transform the title to a slug
    if (title && typeof title === 'string') {
      return title.trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
    }
    else
      return '';
  }, []);

  useEffect(() => { // watch the title field and update the slug field
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>

      <div className='w-2/3 px-2'>
        <Input
          label='Title: '
          name='title'
          placeholder='Enter the title of the post...'
          className='mb-4'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug: '
          name='slug'
          placeholder='Slug will be generated automatically...'
          className='mb-4'
          disabled
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label='Content: '
          name='content'
          control={control}
          defaultValue={getValues('content')}
        />
      </div>

      <div className='w-1/3 px-2'>

        <Input
          label='Featured Image: '
          type='file'
          name='image'
          className='mb-4'
          {...register('image', { required: !post })} // if it's a new post, the image is required
        />

        {post && (
          <div className='w-full mb-4'>

            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='w-full rounded-lg'
            />

          </div>
        )}

        <label className='block mb-1 pl-1 text-sm font-medium' htmlFor='status'> Status: </label>
        <select name='status' label='status' className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full' {...register('status', { required: true })} >
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
        </select>

        <Button type='submit' className='w-full mt-4'>
          {post ? 'Update' : 'Create'} Blog
        </Button>

      </div>

    </form>
  )
}

export default PostForm
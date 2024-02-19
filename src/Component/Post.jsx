import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  
const {postId}=useParams()
const [post,setPost]=useState([])
const [loading,setLoading]=useState(true)
// console.log(postId)
const fetchPost = async () => {
  try {
    const response = await axios.get(`https://masai-forum-sy4l.onrender.com/api/posts/${postId}`);
    setPost(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching post:', error);
    setLoading(false);
  }
};
useEffect(()=>{
  fetchPost()
},[postId])
  if (loading) {
    return (<div className='flex justify-center items-center h-96'>
      <Loader/>
    </div>)
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div className="mb-6">
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Content:</strong> {post.content}</p>
        <div className="mt-4">
          <p><strong>Media:</strong></p>
          {post.media.map((mediaUrl, index) => (
            <img key={index} src={mediaUrl} alt={`Media ${index}`} className="w-full max-w-lg my-2" />
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p><strong>Likes:</strong> {post.likes.length}</p>
        <p><strong>Comments:</strong></p>
        <ul>
          {post.comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.text}</p>
              <p><strong>User:</strong> {comment.user_id}</p>
              <p><strong>Created at:</strong> {comment.created_at}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;

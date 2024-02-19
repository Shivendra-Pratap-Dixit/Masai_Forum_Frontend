import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Loader from './Loader';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    media: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://masai-forum-sy4l.onrender.com/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredPosts);
  }, [searchQuery, posts]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://masai-forum-sy4l.onrender.com/api/posts', formData);
      closeModal();
     
      const fetchPosts = async () => {
        try {
          const response = await axios.get('https://masai-forum-sy4l.onrender.com/api/posts');
          setPosts(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setLoading(false);
        }
      };
      fetchPosts()
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (<div className='flex justify-center items-center h-96'>
      <Loader/>
    </div>)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-400 rounded px-4 py-2"
        />
      </div>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-4 rounded">
        Add Post
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(searchQuery!=="" && searchResults.length===0 && <h1>No Posts Found for your search</h1>)}
        {(searchQuery ? searchResults :posts).map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300">
              <img
                src={post.media[0]}
                alt={post.title}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea id="content" name="content" value={formData.content} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" required>
              <option value="">Select Category</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Innovation">Innovation</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="media" className="block text-gray-700 text-sm font-bold mb-2">Media (Image URL)</label>
            <input type="text" id="media" name="media" value={formData.media} onChange={handleChange} className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" placeholder="Enter the image URL" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Post</button>
          <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Feed;

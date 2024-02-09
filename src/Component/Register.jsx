import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideImg from "./Images/Rectangle 2756.svg";
import axios from 'axios';

const Register = () => {
  const nav=useNavigate()
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { username, email, password, avatar } = input;
      const data = {
        username, email, password, avatar
      };
  
      try {
        
        const response = await axios.post("https://masai-forum-sy4l.onrender.com/api/register", data);
  
       
        if (response.status === 201) {
          
          alert('User registered successfully', response.data);
          nav("/auth")
        } else {
          
          alert('Unexpected response status:', response.status);
          setErrorMessage(`${response.data.message}`);
        }
      } catch (error) {
        
        console.error('Error during registration:', error.response.data.message);
        setErrorMessage(`${error.response.data.message}`);
      }
    };

    return (
        <div className='flex'>
            <div className='w-7/10'>
                <img src={SideImg} alt="masai-forum" style={{height:"100vh"}} />
            </div>
            <div className="flex items-center justify-center m-auto">
                <div className="bg-white p-8 rounded w-96">
                    <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Masai Forum</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={input.username}
                                onChange={handleChange}
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
                                Avatar (Profile Picture)
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    name='avatar'
                                    className="flex-1 ml-2 border p-2 rounded focus:outline-none focus:border-blue-500"
                                    value={input.avatar}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {errorMessage && <p style={{ color: 'red' }} className='m-2'>{errorMessage}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-pink-500 focus:outline-none"
                        >
                            Signup
                        </button>
                        <div className='py-2 text-center'>
                            Already have an account ? <Link className='underline text-black' to="/auth">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;

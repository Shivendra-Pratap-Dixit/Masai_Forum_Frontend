import React from 'react'
import Login from './Login'
import Register from './Register'
import {Routes,Route} from "react-router-dom"
import Feed from './Feed'
import Post from './Post'
import HomePage from './Home'
const AllRoute = () => {
  return (
   
        <Routes>
            <Route path="/auth" element={<Login/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/post" element={<Post/>}/>
        </Routes>
  
  )
}

export default AllRoute
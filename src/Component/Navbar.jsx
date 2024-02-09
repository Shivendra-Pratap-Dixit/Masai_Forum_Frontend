import React from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.png'; // Import your logo image

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* <img src={logo} alt="Masai Forum" className="h-8 mr-4" /> Adjust the height as needed */}
        <h1 className="text-white text-lg font-semibold">Masai Forum</h1>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/auth" className="text-white hover:text-gray-300">Auth</Link>
        </li>
        <li>
          <Link to="/feed" className="text-white hover:text-gray-300">Feed</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

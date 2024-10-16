// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="bg-indigo-600 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Vacation Homes</h1>
            <div>
                {isAuthenticated ? (
                    <button
                        onClick={onLogout}
                        className="text-white hover:text-gray-200">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-gray-200 mx-4">Login</Link>
                        <Link to="/register" className="text-white hover:text-gray-200">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">
                    <Link to={user?.role === "user" ? "/user" : "/admin"}>Learning Platform</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    {user?.role === "user" ? (
                        <>
                            <Link to="/user" className="text-gray-300 hover:text-white">
                                User Dashboard
                            </Link>
                            <Link to="/enrolled-courses" className="text-gray-300 hover:text-white">
                                Enrolled Courses
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin" className="text-gray-300 hover:text-white">
                                Admin Dashboard
                            </Link>
                            <Link to="/add-courses" className="text-gray-300 hover:text-white">
                                Add Courses
                            </Link>
                        </>
                    )}
                    <button onClick={() => logout()} className="text-gray-300 hover:text-white">
                        Logout
                    </button>
                </div>
                <div className="md:hidden">
                    <button id="menu-button" className="text-gray-300 hover:text-white focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="md:hidden" id="mobile-menu" style={{ display: 'none' }}>
                <div className="flex flex-col space-y-2">
                {user?.role === "user" ? (
                        <>
                            <Link to="/user" className="text-gray-300 hover:text-white">
                                User Dashboard
                            </Link>
                            <Link to="/enrolled-courses" className="text-gray-300 hover:text-white">
                                Enrolled Courses
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin" className="text-gray-300 hover:text-white">
                                Admin Dashboard
                            </Link>
                            <Link to="/add-courses" className="text-gray-300 hover:text-white">
                                Add Courses
                            </Link>
                        </>
                    )}
                    <button onClick={() => logout()} className="text-gray-300 hover:text-white">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

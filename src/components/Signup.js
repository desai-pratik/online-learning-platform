import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validate = () => {
        let errors = {};
        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            errors.email = 'Invalid email address';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        return errors;
    };

    const handleSignup = () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Invalid signup credentials!');
        } else {
            signup(username, email, password, role);
            navigate('/login');
            toast.success('Signup in successfully!');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Create Your Account</h2>
                <div className="mb-4">
                    <input
                        className={`w-full p-3 rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username}</p>}
                </div>

                <div className="mb-4">
                    <input
                        className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <input
                        className={`w-full p-3 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                </div>

                <div className="mb-6">
                    <select
                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
                    onClick={handleSignup}
                >
                    Signup
                </button>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <span className="text-purple-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                        Login
                    </span>
                </p>
            </div>
        </div>

    );
};

export default Signup;

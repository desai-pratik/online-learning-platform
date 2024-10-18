import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();


  const validateInput = () => {
    let validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateInput()) {
      return;
    }

    const success = login(email, password);

    if (success) {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
      toast.success('Logged in successfully!');
    } else {
      setGeneralError('Invalid email or password');
      toast.error('Invalid login credentials!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
    <div className="bg-white shadow rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Login</h2>
        {generalError && <p className="text-red-600 mb-4 text-center">{generalError}</p>}

        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
                id="email"
                className={`w-full p-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
        </div>

        <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
                id="password"
                className={`w-full p-3 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
        </div>

        <button
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
            onClick={handleLogin}
        >
            Login
        </button>

        <div className="mt-4 text-center">
            <p className="text-gray-600">
                Don't have an account? <Link to="/signup" className="text-purple-600 hover:underline">Sign up</Link>
            </p>
        </div>
    </div>
</div>
  );
};

export default Login;

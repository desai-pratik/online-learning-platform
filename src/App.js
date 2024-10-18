import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Admin from './components/Admin/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import { CourseProvider } from './context/CourseContext';
import User from './components/user/User';
import EnrolledCourses from './components/user/EnrolledCourses';
import CourseDetail from './components/user/CourseDetail';
import CourseForm from './components/Admin/CourseForm';
import ProtectedRoute from './context/ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            <Route path="/user" element={<ProtectedRoute element={<User />} />} />
            <Route path="/enrolled-courses" element={<ProtectedRoute element={<EnrolledCourses />} />} />
            <Route path="/courses/:id" element={<ProtectedRoute element={<CourseDetail />} />} />
            <Route path="/add-courses" element={<ProtectedRoute element={<CourseForm />} />} />
            <Route path="/edit/:id" element={<ProtectedRoute element={<CourseForm />} />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
};

export default App;

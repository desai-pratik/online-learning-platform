import React, { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { courses, deleteCourse } = useContext(CourseContext);
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold mb-8 text-gray-800">Admin Dashboard</h1>

                    <h2 className="text-2xl font-semibold mb-6 text-gray-700">Courses</h2>
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="bg-white shadow rounded p-4 flex justify-between items-center hover:bg-gray-50 transition-all duration-200"
                            >
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                                    <p className="text-gray-600 mt-2">{course.description}</p>
                                    <span className="font-medium"> Video:</span> <a href={course.videoLink} className="text-blue-500 hover:underline">Watch Now</a>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Instructor:</span> {course.instructor} |
                                        <span className="font-medium"> Category:</span> {course.category} |
                                        <span className="font-medium"> Fees:</span> ${course.fees} |
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => navigate(`/edit/${course.id}`)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all duration-200 mx-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCourse(course.id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-200 mx-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Admin;

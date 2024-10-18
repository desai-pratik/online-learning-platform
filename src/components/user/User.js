import React, { useContext, useState } from 'react';
import { CourseContext } from '../../context/CourseContext';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const User = () => {
    const { courses, enrollCourse } = useContext(CourseContext);
    const [filter, setFilter] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(filter.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filter.toLowerCase()) ||
        course.category.toLowerCase().includes(filter.toLowerCase())
    );


    const handleEnroll = (e, courseId) => {
        e.stopPropagation();
        enrollCourse(courseId);
    };
    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-900 min-h-screen text-white">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold">User Dashboard</h1>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-600  bg-gray-700 rounded p-2 mb-2 w-1/4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {filteredCourses.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <li
                                        key={course.id}
                                        className="bg-gray-800 rounded-lg p-6 transition-transform transform hover:bg-gray-700 shadow-md"
                                    >
                                        <Link to={`/courses/${course.id}`} className="block">
                                            <h3 className="text-xl font-bold mb-2 transition-colors hover:text-blue-400">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 mb-4">{course.description}</p>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Instructor: {course.instructor}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Fees: ${course.fees}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                {course.enrolled ? (
                                                    <span className="text-green-400 font-semibold">
                                                        Enrolled
                                                    </span>
                                                ) : (
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition-colors"
                                                        onClick={(e) => handleEnroll(e, course.id)}
                                                    >
                                                        Enroll
                                                    </button>
                                                )}
                                                <span className="text-sm text-gray-400">
                                                    Progress: {course.progress || 0}%
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-400">You are not enrolled in any courses yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default User;

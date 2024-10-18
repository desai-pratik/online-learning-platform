import React, { useContext } from 'react';
import { CourseContext } from '../../context/CourseContext';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
    const { courses } = useContext(CourseContext);
    const enrolledCourses = courses.filter(course => course.enrolled);

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-900 min-h-screen text-white">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold mb-6">Enrolled Courses</h1>

                    {enrolledCourses.length > 0 ? (
                        <div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrolledCourses.map((course) => (
                                    <li
                                        key={course.id}
                                        className="bg-gray-800 rounded-lg p-6 transition-transform transform hover:bg-gray-700 shadow-md"
                                    >
                                        <Link to={`/courses/${course.id}`} className="block">
                                            <h3 className="text-xl font-bold mb-2 transition-colors hover:text-blue-400">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 mb-4">{course.description}</p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Instructor: {course.instructor}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Fees: ${course.fees}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-400">
                                                    Progress: {course.progress || 0}%
                                                </span>
                                                <span className="text-green-400 font-semibold">
                                                    Enrolled
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-400">You are not enrolled in any courses.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default EnrolledCourses;

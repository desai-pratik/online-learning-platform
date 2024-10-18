import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../context/CourseContext';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const CourseDetail = () => {
    const { courses, enrollCourse, completeCourse } = useContext(CourseContext);
    const { id } = useParams();

    const [course, setCourse] = useState(null);


    useEffect(() => {
        const foundCourse = courses.find(course => course.id === parseInt(id));
        setCourse(foundCourse);
    }, [courses, id]);

    const getVideoEmbedLink = (link) => {
        const videoId = link.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };
    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-900 min-h-screen text-white">
                <div className="container mx-auto">
                    {course ? (
                        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-semibold">{course.title}</h1>
                                {!course.completed ? (
                                    <button
                                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition-colors"
                                        onClick={() => { completeCourse(course.id) }}
                                    >
                                        Mark as Complete
                                    </button>
                                ) : <span className="text-green-400 font-semibold"> Completed </span>}
                            </div>
                            <p className="text-gray-400 mb-4">{course.description}</p>
                            <h2 className="text-xl font-semibold mb-4">Instructor: {course.instructor}</h2>

                            {course.videoLink && (
                                <div className="mb-4">
                                    <iframe
                                        width="100%"
                                        height="715"
                                        src={getVideoEmbedLink(course.videoLink)}
                                        title={course.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                {course.enrolled ? (
                                    <span className="text-green-400 font-semibold">
                                        You are enrolled in this course
                                    </span>
                                ) : (
                                    <button
                                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition-colors"
                                        onClick={() => enrollCourse(course.id)}
                                    >
                                        Enroll Course
                                    </button>
                                )}
                                <span className="text-lg text-gray-400">Category: {course.category}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">Course not found.</p>
                    )}
                    <div className="mt-6">
                        <Link to="/user" className="text-blue-400 hover:text-blue-300">
                            ← Back to Course List
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetail;

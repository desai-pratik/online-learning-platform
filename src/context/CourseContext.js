import React, { createContext, useState, useEffect } from 'react';
import { dummyCourses } from '../dummyCourses';
import { toast } from 'react-toastify';
export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            setCourses(JSON.parse(storedCourses));
        } else {
            setCourses(dummyCourses);
            localStorage.setItem('courses', JSON.stringify(dummyCourses));
        }
    }, []);

    const addCourse = (newCourse) => {
        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        toast.success('Add courses successfully!');
    };

    const updateCourse = (updatedCourse) => {
        const updatedCourses = courses.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
        );
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        toast.success('Update courses successfully!');
    };

    const deleteCourse = (courseId) => {
        const updatedCourses = courses.filter((course) => course.id !== courseId);
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        toast.error('Delete courses successfully!');
    };

    const enrollCourse = (courseId) => {
        const updatedCourses = courses.map((course) => {
            if (course.id === courseId) {
                return { ...course, enrolled: true, progress: 0 };
            }
            return course;
        });
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        toast.success('Enroll courses successfully!');
    };
    const completeCourse = (courseId) => {
        const updatedCourses = courses.map((course) =>
            course.id === courseId ? { ...course, completed: true } : course
        );
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        toast.success('Complete courses successfully!');
    };

    return (
        <CourseContext.Provider
            value={{
                courses,
                addCourse,
                updateCourse,
                deleteCourse,
                enrollCourse,
                completeCourse
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

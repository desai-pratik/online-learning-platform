import React, { useContext, useState, useEffect } from "react";
import { CourseContext } from "../../context/CourseContext";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

const CourseForm = () => {
    const { addCourse, updateCourse, courses } = useContext(CourseContext);
    const [course, setCourse] = useState({ id: '', title: '', description: '', instructor: '', category: '', fees: '', videoLink: '' });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const courseToEdit = courses.find((c) => c.id === Number(id));
            if (courseToEdit) {
                setCourse(courseToEdit);
            }
        }
    }, [id, courses]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!course.title) newErrors.title = "Course title is required.";
        if (!course.description) newErrors.description = "Course description is required.";
        if (!course.instructor) newErrors.instructor = "Instructor name is required.";
        if (!course.category) newErrors.category = "Category is required.";
        if (!course.fees) newErrors.fees = "Fees are required.";
        if (!course.videoLink) newErrors.videoLink = "Video link is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (id) {
            updateCourse(course);
        } else {
            const newCourse = { ...course, id: Date.now() };
            addCourse(newCourse);
        }
        resetForm();
        navigate("/admin");
    };

    const resetForm = () => {
        setCourse({ id: '', title: '', description: '', instructor: '', category: '', fees: '', videoLink: '' });
        setErrors({});
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-2xl mx-auto mt-8 bg-white shadow border p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Course' : 'Add Course'}</h2>

                        <input
                            type="text"
                            name="title"
                            value={course.title}
                            onChange={handleChange}
                            placeholder="Course Title"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}

                        <input
                            type="text"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            placeholder="Course Description"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

                        <input
                            type="text"
                            name="instructor"
                            value={course.instructor}
                            onChange={handleChange}
                            placeholder="Instructor Name"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.instructor ? 'border-red-500' : ''}`}
                        />
                        {errors.instructor && <p className="text-red-500 text-sm mb-2">{errors.instructor}</p>}

                        <input
                            type="text"
                            name="category"
                            value={course.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                        />
                        {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category}</p>}

                        <input
                            type="number"
                            name="fees"
                            value={course.fees}
                            onChange={handleChange}
                            placeholder="Fees ($)"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fees ? 'border-red-500' : ''}`}
                        />
                        {errors.fees && <p className="text-red-500 text-sm mb-2">{errors.fees}</p>}

                        <input
                            type="text"
                            name="videoLink"
                            value={course.videoLink}
                            onChange={handleChange}
                            placeholder="Video Link ( https://youtube.com/watch?v=cGvM )"
                            className={`border p-2 mb-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.videoLink ? 'border-red-500' : ''}`}
                        />
                        {errors.videoLink && <p className="text-red-500 text-sm mb-2">{errors.videoLink}</p>}

                        <div className="flex justify-between mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded transition duration-300 ease-in-out"
                            >
                                {id ? 'Update Course' : 'Add Course'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CourseForm;

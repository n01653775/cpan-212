import React, { useState, useEffect } from 'react';
import { getCourses, deleteCourse, addCourse } from '../api';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', department: '' });

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await getCourses();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        await deleteCourse(id);
        setCourses(courses.filter(course => course.id !== id));
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        const data = await addCourse(newCourse);  // API call to backend
        setCourses([...courses, data]);  // Update state with new course
        setNewCourse({ name: '', department: '' });  // Reset form
    };

    return (
        <div>
            <h2>Courses</h2>
            <form onSubmit={handleAddCourse}>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={newCourse.department}
                    onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                    required
                />
                <button type="submit">Add Course</button>
            </form>
            {courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <strong>{course.name}</strong>
                            <br />
                            Department: {course.department}
                            <button onClick={() => handleDelete(course.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CourseList;

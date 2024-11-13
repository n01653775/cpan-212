import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent, addStudent } from '../api';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        department: '',
        semester: '',
        enrolledCourses: '',
    });

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await getStudents();
            setStudents(data);
        };
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        await deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const data = await addStudent(newStudent);  // API call to backend
        setStudents([...students, data]);  // Update state with new student
        setNewStudent({ name: '', department: '', semester: '', enrolledCourses: '' });  // Reset form
    };

    return (
        <div>
            <h2>Students</h2>
            <form onSubmit={handleAddStudent}>
                <input
                    type="text"
                    placeholder="Student Name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Semester"
                    value={newStudent.semester}
                    onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Enrolled Courses (comma separated)"
                    value={newStudent.enrolledCourses}
                    onChange={(e) => setNewStudent({ ...newStudent, enrolledCourses: e.target.value })}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
            {students.length === 0 ? (
                <p>No students available.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            <strong>{student.name}</strong>
                            <br />
                            Department: {student.department}
                            <br />
                            Semester: {student.semester}
                            <br />
                            Enrolled Courses: {student.enrolledCourses}
                            <button onClick={() => handleDelete(student.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StudentList;

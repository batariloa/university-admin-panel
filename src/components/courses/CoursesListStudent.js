import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchCourses from "../../hooks/useFetchCourses";

export const CoursesListStudent = ({ courses: studentCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const { courses, error, loading } = useFetchCourses();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleAddCourse = () => {
    // Implement logic to add the selected course
    console.log("Selected Course:", selectedCourse);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student's courses</h2>
        <div className="d-flex">
          <select
            className="form-select me-2"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddCourse}>
            Add course
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>ESPB</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.description}</td>
              <td>{course.espb}</td>

              <td>
                <Link to={`/delete/${course.id}`} className="btn btn-danger">
                  Unsubscribe
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

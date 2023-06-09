import React, { useState } from "react";
import { useFetchCourse } from "../../hooks/useFetchCourses";

export const CoursesListStudent = ({ student, setStudent }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const { courses: availableCourses, error, loading } = useFetchCourse();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleAddCourse = () => {
    const selectedCourseObj = availableCourses.find(
      (course) => course.id === selectedCourse
    );
    if (selectedCourseObj) {
      setStudent((prevStudent) => ({
        ...prevStudent,
        courses: [...prevStudent.courses, selectedCourseObj],
      }));
    }
  };

  const handleUnsubscribe = (courseId) => {
    const updatedCourses = student.courses.filter(
      (course) => course.id !== courseId
    );

    setStudent((prevStudent) => ({
      ...prevStudent,
      courses: updatedCourses,
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Student's courses</h3>
        <div className="d-flex justify-content-center align-items-center">
          <select
            className="form-select me-2 h-50"
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            <option value="">Select a course</option>
            {availableCourses &&
              availableCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
          </select>
          <div className="h-50 w-100">
            <button className="btn btn-success" onClick={handleAddCourse}>
              Add course
            </button>
          </div>
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
          {student &&
            student.courses &&
            student.courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.description}</td>
                <td>{course.espb}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUnsubscribe(course.id)}
                  >
                    Unsubscribe
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

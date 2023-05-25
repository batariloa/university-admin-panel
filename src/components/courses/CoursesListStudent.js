import React, { useState } from "react";
import { useFetchCourse } from "../../hooks/useFetchCourses";
import { useUnsubscribeStudentFromCourse } from "../../hooks/useUnsubscribeStudentFromCourse";

export const CoursesListStudent = ({ courses }) => {
  const [studentCourses, setStudentCourses] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState("");
  const { courses: availableCourses, error, loading } = useFetchCourse();
  const { unsubscribe } = useUnsubscribeStudentFromCourse();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleAddCourse = () => {
    // Implement logic to add the selected course
    console.log("Selected Course:", selectedCourse);
  };

  const handleUnsubscribe = (courseId) => {
    unsubscribe(courseId)
      .then(() => {
        // Remove the unsubscribed course from the list
        const updatedCourses = studentCourses.filter(
          (course) => course.id !== courseId
        );

        setStudentCourses(updatedCourses);
      })
      .catch(() => console.log("Failed to unsubscribe"));
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
            {availableCourses.map((course) => (
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
          {studentCourses.map((course) => (
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

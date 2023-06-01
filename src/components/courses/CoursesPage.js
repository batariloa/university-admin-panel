import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useFetchCourse } from "../../hooks/useFetchCourses";

const CoursesPage = () => {
  const { courses, loading, error } = useFetchCourse();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Courses</h2>
        <Link to="/addCourse" className="btn btn-success">
          Add course +
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>ESPB</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.description}</td>
              <td>{course.espb}</td>
              <td>
                <Link
                  to={`/editCourse/${course.id}`}
                  className="btn btn-primary"
                  course={course}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;

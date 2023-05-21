import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useFetchCourses from "../../hooks/useFetchCourses";

const DashboardPage = () => {
  const { courses, loading, error } = useFetchCourses();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Select a Course</h1>
        <Link to="/addStudent" className="btn btn-success">
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
            <th>Delete</th>
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
                <Link to={`/edit/${course.id}`} className="btn btn-primary">
                  Edit
                </Link>
              </td>
              <td>
                <Link to={`/edit/${course.id}`} className="btn btn-danger">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;

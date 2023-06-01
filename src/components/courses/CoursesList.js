import React from "react";
import { Link } from "react-router-dom";

export const CoursesListDashboard = ({ courses }) => {
  return (
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
              <Link to={`/edit/${course.id}`} className="btn btn-primary">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

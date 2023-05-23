import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useFetchStudents from "../../hooks/useFetchStudents";
import "./css/studentsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const StudentsPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { students, loading, error } = useFetchStudents();
  const [suggestedStudents, setSuggestedStudents] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedStudent(null);
  };

  useEffect(() => {
    // Update the suggested students based on the search query
    const filteredStudents = students.filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const top5Students = filteredStudents.slice(0, 5); // Get the top 5 results
    setSuggestedStudents(top5Students);
  }, [searchQuery, students]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students</h2>
        <Link to="/addStudent" className="btn btn-success">
          Add student +
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {suggestedStudents.length > 0 && (
          <div className="list-container">
            {suggestedStudents.map((student) => (
              <div
                key={student.id}
                className={`list-group-item ${
                  selectedStudent === student ? "selected" : ""
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                {`${student.firstName} ${student.lastName}`}
                {selectedStudent === student && (
                  <FontAwesomeIcon
                    icon={icon({ name: "circle-check" })}
                    className="checkmark"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedStudent && (
        <div>
          <h2 className="mb-3">Student Details</h2>

          <div className="student-data">
            <p>
              <strong>First Name:</strong> {selectedStudent.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedStudent.lastName}
            </p>
            <p>
              <strong>ID Number:</strong> {selectedStudent.idNumber}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
          </div>
          <div className="centered-button">
            <Link
              to={`/editStudent/${selectedStudent.id}`}
              className="btn btn-primary full-width-button"
            >
              Edit Student
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;

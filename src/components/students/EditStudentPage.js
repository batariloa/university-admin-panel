import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchStudent from "../../hooks/useFetchStudent";
import { CoursesListStudent } from "../courses/CoursesListStudent";

const EditStudentPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const {
    student: fetchedStudent,
    loading,
    error,
  } = useFetchStudent(studentId);

  useEffect(() => {
    if (fetchedStudent) {
      setStudent(fetchedStudent);
    }
  }, [fetchedStudent]);

  const handleAddCourse = () => {
    // Implement logic to add a new course for the student
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!student) {
    return null;
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title">Edit Student</h1>

          <div className="row mt-4">
            <div className="col-md-6">
              <h2>Student Details</h2>
              <p>
                <strong>First Name:</strong> {student.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {student.lastName}
              </p>
              <p>
                <strong>ID Number:</strong> {student.idNumber}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Gender:</strong> {student.gender}
              </p>
            </div>

            <CoursesListStudent courses={student.courses}></CoursesListStudent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;

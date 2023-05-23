import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchStudentDetails from "../../hooks/useFetchStudent";
import useUpdateStudent from "../../hooks/useUpdateStudent";
import { CoursesListStudent } from "../courses/CoursesListStudent";

const EditStudentPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const {
    professor: fetchedStudent,
    loading,
    error,
  } = useFetchStudentDetails(studentId);
  const {
    updateStudent,
    loading: updating,
    error: updateError,
  } = useUpdateStudent();

  useEffect(() => {
    if (fetchedStudent) {
      setStudent(fetchedStudent);
    }
  }, [fetchedStudent]);

  const handleUpdate = () => {
    updateStudent(studentId, student)
      .then((updatedStudent) => {
        setStudent(updatedStudent);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  if (loading || updating) {
    return <p>Loading...</p>;
  }

  if (error || updateError) {
    return <p className="text-danger">Error: {error || updateError}</p>;
  }

  if (!student) {
    return null;
  }

  return (
    <div className="container d-flex">
      <div className="card mt-4">
        <div className="card-body">
          <h2>Student Details</h2>
          <div className="row mt-4 d-flex justify-content-center">
            <div className="col-lg">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label mb-0">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={student.firstName}
                  onChange={(e) =>
                    setStudent((prevStudent) => ({
                      ...prevStudent,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label mb-0">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={student.lastName}
                  onChange={(e) =>
                    setStudent((prevStudent) => ({
                      ...prevStudent,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idNumber" className="form-label mb-0">
                  ID Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="idNumber"
                  value={student.idNumber}
                  onChange={(e) =>
                    setStudent((prevStudent) => ({
                      ...prevStudent,
                      idNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label mb-0">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={student.email}
                  onChange={(e) =>
                    setStudent((prevStudent) => ({
                      ...prevStudent,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label mb-0">
                  Gender
                </label>
                <select
                  className="form-control"
                  id="gender"
                  value={student.gender}
                  onChange={(e) =>
                    setStudent((prevStudent) => ({
                      ...prevStudent,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
            <div className="col-md-6 w-100 mt-3">
              <CoursesListStudent courses={student.courses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;

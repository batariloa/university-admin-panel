import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";
import { useFetchGenders } from "../../hooks/useFetchGenders";
import { useEffect } from "react";
const AddStudentPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const {
    genders,
    loading: gendersLoading,
    error: gendersError,
  } = useFetchGenders();

  const { updateStudent, loading, error } = useUpdateStudent();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudentData = {
      firstName,
      lastName,
      idNumber,
      email,
      genderId: gender,
      courseIds: [],
    };

    updateStudent(newStudentData);
  };

  useEffect(() => {
    if (!loading && error === null) {
      navigate("/students");
    }
  }, [loading, error, navigate]);

  if (gendersLoading) {
    return <div>Loading genders...</div>;
  }

  if (gendersError) {
    return <div>Error loading genders. Please try again later.</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Add Student</h2>
        <Link to="/students" className="btn btn-secondary">
          Back to Students
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            className="form-control"
            value={idNumber}
            onChange={handleIdNumberChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="form-control"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="text-danger mb-3">
            Please fill all the required fields.
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;

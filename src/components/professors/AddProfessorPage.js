import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUpdateProfessor } from "../../hooks/useUpdateProfessor";
import { useFetchGenders } from "../../hooks/useFetchGenders";
import "./css/professorsPage.css";

export const AddProfessorPage = ({ professorId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const { updateProfessor, loading, error } = useUpdateProfessor();
  const {
    genders,
    loading: gendersLoading,
    error: gendersError,
  } = useFetchGenders();

  useEffect(() => {
    // Fetch professor details and populate the form fields
    const fetchProfessorDetails = async () => {
      // Fetch professor details using professorId and set the form field values
    };

    fetchProfessorDetails();
  }, [professorId]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfessorData = {
      id: professorId,
      firstName,
      lastName,
      email,
      genderId: gender,
      courseIds: [],
    };

    // Call the updateProfessor function from the hook
    updateProfessor(professorId, updatedProfessorData);
  };

  if (gendersLoading) {
    return <div>Loading genders...</div>;
  }

  if (gendersError) {
    return <div>Error loading genders. Please try again later.</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Edit Professor</h2>
        <Link to={`/professors/${professorId}`} className="btn btn-secondary">
          Back to Professor
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
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Professor"}
        </button>
      </form>
    </div>
  );
};

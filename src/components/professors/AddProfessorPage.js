import React, { useState, useEffect } from "react";
import { useUpdateProfessor } from "../../hooks/useUpdateProfessor";
import { useFetchGenders } from "../../hooks/useFetchGenders";
import "./css/professorsPage.css";
import { useNavigate } from "react-router";
export const AddProfessorPage = ({}) => {
  const navigate = useNavigate();
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
      firstName,
      lastName,
      email,
      genderId: gender,
      courseIds: [],
    };

    updateProfessor(updatedProfessorData);
  };

  useEffect(() => {
    if (!loading && error === null) {
      navigate("/professors");
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
        <h2>Add Professor</h2>
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
          {loading ? "Updating..." : "Save Professor"}
        </button>
      </form>
    </div>
  );
};

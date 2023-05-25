import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchProfessors } from "../../hooks/useFetchProfessors";
import "./css/professorsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
export const ProfessorsPage = () => {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { professors, loading, error } = useFetchProfessors();
  const [suggestedProfessors, setSuggestedProfessors] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedProfessor(null);
  };

  useEffect(() => {
    // Update the suggested professors based on the search query
    const filteredProfessors = professors.filter((professor) =>
      `${professor.firstName} ${professor.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    const top5Professors = filteredProfessors.slice(0, 5); // Get the top 5 results
    setSuggestedProfessors(top5Professors);
  }, [searchQuery, professors]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Professors</h2>
        <Link to="/addProfessor" className="btn btn-success">
          Add Professor +
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
        {suggestedProfessors.length > 0 && (
          <div className="list-container">
            {suggestedProfessors.map((professor) => (
              <div
                key={professor.id}
                className={`list-group-item ${
                  selectedProfessor === professor ? "selected" : ""
                }`}
                onClick={() => setSelectedProfessor(professor)}
              >
                {`${professor.firstName} ${professor.lastName}`}
                {selectedProfessor === professor && (
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
      {selectedProfessor && (
        <div>
          <h2 className="mb-3">Professor Details</h2>

          <div className="professor-data">
            <p>
              <strong>First Name:</strong> {selectedProfessor.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedProfessor.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedProfessor.email}
            </p>
            <p>
              <strong>Gender:</strong> {selectedProfessor.gender}
            </p>
          </div>
          <div className="centered-button">
            <Link
              to={`/editProfessor/${selectedProfessor.id}`}
              className="btn btn-primary full-width-button"
            >
              Edit Professor
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorsPage;

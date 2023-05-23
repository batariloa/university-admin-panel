import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProfessorDetails } from "../../hooks/useFetchProfessorDetails";
import { useUpdateProfessor } from "../../hooks/useUpdateProfessor";

const EditProfessorPage = () => {
  const { ProfessorId: professorId } = useParams();
  const [professor, setProfessor] = useState(null);
  const {
    professor: fetchedProfessor,
    loading,
    error,
  } = useFetchProfessorDetails(professorId);
  const {
    updateProfessor,
    loading: updating,
    error: updateError,
  } = useUpdateProfessor();

  useEffect(() => {
    if (fetchedProfessor) {
      setProfessor(fetchedProfessor);
    }
  }, [fetchedProfessor]);

  const handleUpdate = () => {
    updateProfessor(professorId, professor)
      .then((updatedProfessor) => {
        setProfessor(updatedProfessor);
      })
      .catch((error) => {
        console.error("Error updating Professor:", error);
      });
  };

  if (loading || updating) {
    return <p>Loading...</p>;
  }

  if (error || updateError) {
    return <p className="text-danger">Error: {error || updateError}</p>;
  }

  if (!professor) {
    return null;
  }

  return (
    <div className="container d-flex">
      <div className="card mt-4 w-100">
        <div className="card-body">
          <h2>Professor Details</h2>
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
                  value={professor.firstName}
                  onChange={(e) =>
                    setProfessor((prevProfessor) => ({
                      ...prevProfessor,
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
                  value={professor.lastName}
                  onChange={(e) =>
                    setProfessor((prevProfessor) => ({
                      ...prevProfessor,
                      lastName: e.target.value,
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
                  value={professor.email}
                  onChange={(e) =>
                    setProfessor((prevProfessor) => ({
                      ...prevProfessor,
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
                  value={professor.gender}
                  onChange={(e) =>
                    setProfessor((prevProfessor) => ({
                      ...prevProfessor,
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfessorPage;

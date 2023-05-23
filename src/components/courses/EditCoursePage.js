import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchCourseDetails } from "../../hooks/useFetchCourseDetails";
import { useFetchProfessors } from "../../hooks/useFetchProfessors";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const {
    course,
    loading: courseLoading,
    error: courseError,
  } = useFetchCourseDetails(courseId);
  const {
    professors,
    loading: professorLoading,
    error: professorError,
  } = useFetchProfessors();

  const [selectedProfessor, setSelectedProfessor] = useState("");

  useEffect(() => {
    // Set the initially selected professor based on the course data
    if (course && course.professor) {
      setSelectedProfessor(course.professor.id);
    }
  }, [course]);

  const handleProfessorChange = (e) => {
    setSelectedProfessor(e.target.value);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes with the selected professor
    console.log("Selected Professor:", selectedProfessor);
  };

  if (courseLoading || professorLoading) {
    return <p>Loading...</p>;
  }

  if (courseError || professorError) {
    return <p>Error: {courseError || professorError}</p>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Edit Course</h2>
        <Link to="/courses" className="btn btn-secondary">
          Back to Courses
        </Link>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            name="name"
            value={course.name || ""}
            onChange={() => {}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseCode" className="form-label">
            Course Code
          </label>
          <input
            type="text"
            className="form-control"
            id="courseCode"
            name="code"
            value={course.code || ""}
            onChange={() => {}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">
            Course Description
          </label>
          <textarea
            className="form-control"
            id="courseDescription"
            name="description"
            value={course.description || ""}
            onChange={() => {}}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="courseESPB" className="form-label">
            Course ESPB
          </label>
          <input
            type="number"
            className="form-control"
            id="courseESPB"
            name="espb"
            value={course.espb || ""}
            onChange={() => {}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="professorSelect" className="form-label">
            Professor
          </label>
          <select
            className="form-select"
            id="professorSelect"
            value={selectedProfessor}
            onChange={handleProfessorChange}
          >
            <option value="">Select a professor</option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.firstName} {professor.lastName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCoursePage;
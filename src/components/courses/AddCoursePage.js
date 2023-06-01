import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateCourse } from "../../hooks/useUpdateCourse";

const AddCoursePage = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [espb, setEspb] = useState(0);

  const { updateCourse, loading, error } = useUpdateCourse();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEspbChange = (e) => {
    setEspb(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourseData = {
      name,
      code,
      description,
      espb,
    };

    updateCourse(newCourseData);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Add Course</h2>
        <Link to="/courses" className="btn btn-secondary">
          Back to Courses
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            className="form-control"
            value={code}
            onChange={handleCodeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="espb">ESPB:</label>
          <input
            type="number"
            id="espb"
            className="form-control"
            value={espb}
            onChange={handleEspbChange}
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCoursePage;

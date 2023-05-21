import React, { useState } from "react";

const CourseForm = () => {
  const [course, setCourse] = useState({
    id: "",
    name: "",
    code: "",
    description: "",
    espb: 0,
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can save the course data using an API call or any other method
    console.log(course);
  };

  return (
    <div className="container">
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={course.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="espb">ESPB:</label>
          <input
            type="number"
            className="form-control"
            id="espb"
            name="espb"
            value={course.espb}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CourseForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchCourseDetails } from "../../hooks/useFetchCourseDetails";
import { useUpdateCourse } from "../../hooks/useUpdateCourse";
import { useDeleteCourse } from "../../hooks/useDeleteCourse";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const {
    deleteCourse,
    loading: deleting,
    error: deleteError,
  } = useDeleteCourse();

  const {
    courses: fetchedCourse,
    loading,
    error,
  } = useFetchCourseDetails(courseId);

  const {
    updateCourse,
    loading: updating,
    error: updateError,
  } = useUpdateCourse();

  useEffect(() => {
    if (fetchedCourse) {
      setCourse(fetchedCourse);
    }
  }, [fetchedCourse]);

  const handleUpdate = () => {
    const updatedCourse = {
      ...course,
    };
    updateCourse(updatedCourse)
      .then((updatedCourse) => {
        setCourse(updatedCourse);
        navigate("/courses");
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  const handleDelete = () => {
    deleteCourse(courseId)
      .then(() => {
        navigate("/courses");
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  if (loading || updating) {
    return <p>Loading...</p>;
  }

  if (error || updateError) {
    return <p className="text-danger">Error: {error || updateError}</p>;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="text-center">Course Details</h2>
          <div className="row mt-4">
            <div className="col-lg-6">
              {/* Course details form */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={course.name}
                  onChange={(e) =>
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  value={course.code}
                  onChange={(e) =>
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      code: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={4}
                  value={course.description}
                  onChange={(e) =>
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="espb" className="form-label">
                  ESPB
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="espb"
                  value={course.espb}
                  onChange={(e) =>
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      espb: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="btn btn-danger "
                style={{ marginLeft: "10px" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="col-lg-6">
              {/* Students list */}
              <h4 className="mt-3">Students</h4>
              {course.students && course.students.length > 0 ? (
                <div className="list-group scrollable-list">
                  {course.students.map((student) => (
                    <Link
                      className="list-group-item list-group-item-action"
                      to={`/editStudent/${student.id}`}
                    >
                      {`${student.firstName} ${student.lastName}`}
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No students enrolled</p>
              )}
              {/* Professors list */}
              <h4 className="mt-3">Professors</h4>
              {course.professors && course.professors.length > 0 ? (
                <div className="list-group scrollable-list">
                  {course.professors.map((professor) => (
                    <Link
                      className="list-group-item list-group-item-action"
                      to={`/editProfessor/${professor.id}`}
                    >
                      {`${professor.firstName} ${professor.lastName}`}
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No professors assigned</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;

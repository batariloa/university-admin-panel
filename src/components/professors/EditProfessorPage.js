import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProfessorDetails } from "../../hooks/useFetchProfessorDetails";
import { useUpdateProfessor } from "../../hooks/useUpdateProfessor";
import { useFetchCourse } from "../../hooks/useFetchCourses";
import { useFetchGenders } from "../../hooks/useFetchGenders";

const EditProfessorPage = () => {
  const { professorId } = useParams();
  const [professor, setProfessor] = useState(null);
  const { genders } = useFetchGenders();

  const {
    professor: fetchedProfessor,
    CourseIds: professorCourses,
    loading,
    error,
  } = useFetchProfessorDetails(professorId);

  const {
    updateProfessor,
    loading: updateLoading,
    error: updateError,
  } = useUpdateProfessor();

  const { courses: allCourses } = useFetchCourse();

  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (fetchedProfessor) {
      setProfessor(fetchedProfessor);
      const professorCourseIds = fetchedProfessor.courses.map(
        (course) => course.id
      );
      setSelectedCourses(professorCourseIds);
    }
  }, [fetchedProfessor]);

  const handleUpdate = async () => {
    try {
      console.log(fetchedProfessor);
      console.log(genders);
      const genderId = genders.find(
        (gender) => gender.name === fetchedProfessor.gender
      ).id;

      await updateProfessor(professorId, {
        ...professor,
        CourseIds: selectedCourses,
        genderId,
      });
      // Update success, do something if needed
    } catch (error) {
      console.error("Error updating Professor:", error);
    }
  };

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((id) => id !== courseId)
      );
    } else {
      setSelectedCourses((prevSelectedCourses) => [
        ...prevSelectedCourses,
        courseId,
      ]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
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
                  value={professor?.firstName || ""}
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
                  value={professor?.lastName || ""}
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
                  value={professor?.email || ""}
                  onChange={(e) =>
                    setProfessor((prevProfessor) => ({
                      ...prevProfessor,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={professor?.gender || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="courses" className="form-label mb-0">
                  Courses
                </label>
                {allCourses.map((course) => (
                  <div key={course.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={course.id}
                      value={course.id}
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleCourseSelection(course.id)}
                    />
                    <label className="form-check-label" htmlFor={course.id}>
                      {course.name}
                    </label>
                  </div>
                ))}
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

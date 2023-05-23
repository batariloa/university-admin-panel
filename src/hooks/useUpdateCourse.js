import { useState } from "react";

const useUpdateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCourse = async (courseId, updatedCourse) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      // Handle the successful update
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateCourse };
};

export default useUpdateCourse;

import { useState } from "react";

const useUpdateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStudent = async (studentId, updatedData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update student.");
      }

      // Handle the success case, if needed
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { updateStudent, loading, error };
};

export default useUpdateStudent;

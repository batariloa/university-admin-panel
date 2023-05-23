import { useState } from "react";
import axios from "axios";

export const useUpdateProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfessor = async (professorId, updatedProfessorData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `/api/professors/${professorId}`,
        updatedProfessorData
      ); // Replace "/api/professors" with your API endpoint
      setLoading(false);
      return response.data;
    } catch (error) {
      setError("Failed to update professor.");
      setLoading(false);
      return null;
    }
  };

  return { updateProfessor, loading, error };
};

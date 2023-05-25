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
        `https://pavlevlajic.com/api/professor/save-professor`,
        updatedProfessorData
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setError("Failed to update professor.");
      setLoading(false);
      return null;
    }
  };

  return { updateProfessor, loading, error };
};

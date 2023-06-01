import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useDeleteProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProfessor = async (professorId) => {
    setLoading(true);
    setError(null);

    try {
      await axiosClient.delete(
        url + `/api/professor/delete-professor/${professorId}`
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { deleteProfessor, loading, error };
};

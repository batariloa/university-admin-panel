import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useUpdateProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const updateProfessor = async (updatedProfessorData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.put(
        url + `/api/professor/save-professor`,
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

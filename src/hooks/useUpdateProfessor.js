import { useState } from "react";
import axios from "axios";
import { url } from "../global/variables";

export const useUpdateProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfessor = async (professorId, updatedProfessorData) => {
    setLoading(true);
    setError(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.data?.accessToken;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        url + `/api/professor/save-professor`,
        updatedProfessorData,
        config
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

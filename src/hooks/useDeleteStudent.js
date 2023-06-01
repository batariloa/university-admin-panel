import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useDeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStudent = async (studentId) => {
    setLoading(true);
    setError(null);

    try {
      await axiosClient.delete(
        url + `/api/student/delete-student/${studentId}`
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { deleteStudent, loading, error };
};

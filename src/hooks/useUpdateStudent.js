import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useUpdateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const updateStudent = async (updatedStudentData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.put(
        url + `/api/student/save-student`,
        updatedStudentData
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setError("Failed to update student.");
      setLoading(false);
    }
  };

  return { updateStudent, loading, error };
};

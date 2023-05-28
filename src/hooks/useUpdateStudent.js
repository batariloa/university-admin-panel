import { useState } from "react";
import axios from "axios";
import { url } from "../global/variables";

export const useUpdateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStudent = async (studentId, updatedStudentData) => {
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
        url + `/api/student/save-student`,
        updatedStudentData,
        config
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setError("Failed to update student.");
      setLoading(false);
      return null;
    }
  };

  return { updateStudent, loading, error };
};

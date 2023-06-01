import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useDeleteCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCourse = async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      await axiosClient.delete(url + `/api/course/delete-course/${courseId}`);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { deleteCourse, loading, error };
};

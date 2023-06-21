import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useUpdateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const updateCourse = async (updatedCourseData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.put(
        url + `/api/course/save-course`,
        updatedCourseData
      );

      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setError("Failed to update course.");
      setLoading(false);
      return null;
    }
  };

  return { updateCourse, loading, error };
};

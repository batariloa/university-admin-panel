import { useState } from "react";
import axios from "axios";
import { url } from "../global/variables";

export const useUpdateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCourse = async (updatedCourseData) => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.data?.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        url + `/api/course/save-course`,
        updatedCourseData,
        config
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

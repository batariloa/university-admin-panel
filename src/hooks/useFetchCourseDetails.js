import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../global/variables";

export const useFetchCourseDetails = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          url + `/api/course/get-course-details/${courseId}`,
          config
        );

        if (response.data.succeeded) {
          setCourse(response.data.data);
        } else {
          setError("Failed to fetch course details. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch course details. Please try again.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { course, loading, error };
};

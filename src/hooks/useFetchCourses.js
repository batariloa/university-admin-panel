import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://pavlevlajic.com/api/course/get-all-courses"
        );
        const { data } = response.data;

        if (response.data.succeeded) {
          setCourses(data);
        } else {
          setError("Failed to fetch courses. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch courses. Please try again.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

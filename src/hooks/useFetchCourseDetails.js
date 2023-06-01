import { useEffect, useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchCourseDetails = (courseId) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("trying");

        const response = await axiosClient.get(
          url + "/api/course/get-course-details/" + courseId
        );

        const { data } = response.data;

        console.log("trying");
        if (response.data.succeeded) {
          setCourses(data);
          console.log("course data ", data);
        } else {
          setError("Failed to fetch courses. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        console.log("err", error);
        setError("Failed to fetch courses. Please try again.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseId]);

  return { courses, loading, error };
};

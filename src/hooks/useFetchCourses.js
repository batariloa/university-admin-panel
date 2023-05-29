import { useEffect, useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken;

        const response = await axiosClient.get(
          url + "/api/course/get-all-courses"
        );

        const { data } = response.data;

        if (response.data.succeeded) {
          setCourses(data);
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
  }, []);

  return { courses, loading, error };
};

import { useEffect, useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosClient.get(
          url + "/api/student/get-all-students"
        );

        const { data } = response.data;

        if (response.data.succeeded) {
          setStudents(data);
        } else {
          setError("Failed to fetch students. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading, error };
};

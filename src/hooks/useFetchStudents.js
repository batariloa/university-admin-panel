import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../global/variables";

export const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken;

        const response = await axios.get(
          url + "/api/student/get-all-students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

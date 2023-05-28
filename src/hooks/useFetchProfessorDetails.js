import { useEffect, useState } from "react";
import axiosClient from "../http/axios";

export const useFetchProfessorDetails = (professorId) => {
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessorDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosClient.get(
          `https://pavlevlajic.com/api/professor/get-professor-details/${professorId}`,
          config
        );
        const data = response.data;

        if (response.status === 200 && data.succeeded) {
          setProfessor(data.data);
        } else {
          setError("Failed to fetch professor details. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch professor details. Please try again.");
        setLoading(false);
      }
    };

    fetchProfessorDetails();
  }, [professorId]);

  return { professor, loading, error };
};

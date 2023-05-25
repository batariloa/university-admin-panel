import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchProfessorDetails = (professorId) => {
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessorDetails = async () => {
      try {
        const response = await axios.get(
          `https://pavlevlajic.com/api/professor/get-professor-details/${professorId}`
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

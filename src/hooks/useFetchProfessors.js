import { useEffect, useState } from "react";

export const useFetchProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(
          "https://pavlevlajic.com/api/professor/get-all-professors"
        );
        const data = await response.json();

        if (response.ok) {
          console.log(professors);
          setProfessors(data.data);
          setLoading(false);
        } else {
          setError("Failed to fetch professors. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        setError("Failed to fetch professors. Please try again.");
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return { professors, loading, error };
};

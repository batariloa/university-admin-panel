import { useEffect, useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken;

        const response = await axiosClient.get(
          url + "/api/professor/get-all-professors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        if (response.status === 200) {
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

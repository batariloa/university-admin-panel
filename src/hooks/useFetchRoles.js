import { useState, useEffect } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(url + "/api/role/get-all-roles");
        setRoles(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch genders.");
        setLoading(false);
      }
    };

    fetchGenders();
  }, []);

  return { roles, loading, error };
};

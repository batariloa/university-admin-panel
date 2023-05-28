import { useState, useEffect } from "react";
import axiosClient from "../http/axios";

export const useFetchGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.data?.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(
          "https://pavlevlajic.com/api/gender/get-all-genders",
          config
        );
        console.log("gender hook " + response);
        setGenders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("error");

        setError("Failed to fetch genders.");
        setLoading(false);
      }
    };

    fetchGenders();
  }, []);

  return { genders, loading, error };
};
